'use client';

import { GlobeHemisphereWestIcon } from '@phosphor-icons/react';
import createGlobe, { type COBEOptions } from 'cobe';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import {
	dark,
	light,
	myLatitude,
	myLongitude,
	orange,
	physics,
	yellow,
} from '@/lib/globe';
import { cn } from '@/lib/utils';

const LocationCardComponent = (): React.JSX.Element => {
	const { resolvedTheme } = useTheme();

	const canvas = useRef<HTMLCanvasElement | null>(null);
	const pointerInteracting = useRef<number | null>(null);
	const pointerInteractionMovement = useRef(0);
	const [{ r }, api] = useSpring(() => physics);

	useEffect(() => {
		let width = 0;
		let phi = 3;
		const direction = 1;

		const onResize = (): void => {
			if (canvas.current) {
				width = canvas.current.offsetWidth;
			}
		};

		window.addEventListener('resize', onResize);
		onResize();

		if (!canvas.current) {
			return;
		}

		const globeConfig: COBEOptions = {
			devicePixelRatio: 2,
			phi: 0,
			theta: 0.2,
			diffuse: 3,
			mapSamples: 36000,
			mapBrightness: 6,
			baseColor: [0.3, 0.3, 0.3],
			markerColor: yellow,
			glowColor: resolvedTheme === 'dark' ? light : dark,
			scale: 1,
			width: width * 2,
			height: width * 2,
			dark: 0,
			markers: [{ location: [myLatitude, myLongitude], size: 0.1 }],
			onRender: (state: Record<string, any>) => {
				const adjustment: number =
					0.001 * (state.phi > 5.5 ? -1 : state.phi < 3.25 ? 1 : direction);
				phi += adjustment;
				state.phi = phi + r.get();
				state.width = state.height = width * 2;
			},
		};

		const globe = createGlobe(canvas.current, globeConfig);

		return () => {
			window.removeEventListener('resize', onResize);
			globe.destroy();
		};
	}, [r, resolvedTheme]);

	return (
		<motion.div
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			className={cn(
				'col-span-4 col-start-5 row-span-3 row-start-2 md:col-span-2 md:col-start-6 md:row-span-2 md:row-start-2',
				'relative flex flex-col gap-6 overflow-hidden p-4 md:h-40',
				'isolate rounded-xl bg-white/20 font-bold ring-1 ring-black/5 dark:bg-white/10',
				'border border-neutral-200/50 dark:border-neutral-700/50',
			)}
		>
			<div className="z-10 flex items-center gap-2">
				<GlobeHemisphereWestIcon weight="duotone" className="size-4" />
				<h2 className="font-medium text-sm">Paris, France</h2>
			</div>

			<div className="absolute inset-x-0 bottom-[-75%] mx-auto aspect-square h-[150%] translate-x-[-12.5%] [@media(max-width:420px)]:h-[320px]">
				<div className="flex size-full place-content-center place-items-center overflow-visible">
					<div className="aspect-square w-full [-webkit-mask-image:radial-gradient(circle_at_50%_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_70%)] [mask-image:radial-gradient(circle_at_50%_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_70%)]">
						<canvas
							ref={canvas}
							onPointerDown={(event: React.PointerEvent<HTMLCanvasElement>) => {
								pointerInteracting.current =
									event.clientX - pointerInteractionMovement.current;
								canvas.current && (canvas.current.style.cursor = 'grabbing');
							}}
							onPointerUp={() => {
								pointerInteracting.current = null;
								canvas.current && (canvas.current.style.cursor = 'grab');
							}}
							onPointerOut={() => {
								pointerInteracting.current = null;
								canvas.current && (canvas.current.style.cursor = 'grab');
							}}
							onMouseMove={(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
								if (pointerInteracting.current !== null) {
									const delta = event.clientX - pointerInteracting.current;
									pointerInteractionMovement.current = delta;
									api.start({
										r: delta / 200,
									});
								}
							}}
							onTouchMove={(event: React.TouchEvent<HTMLCanvasElement>) => {
								if (pointerInteracting.current !== null && event.touches[0]) {
									const delta = event.touches[0].clientX - pointerInteracting.current;
									pointerInteractionMovement.current = delta;
									api.start({
										r: delta / 100,
									});
								}
							}}
							className="size-full cursor-auto select-none"
							style={{ contain: 'layout paint size' }}
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export const LocationCard: React.MemoExoticComponent<() => React.JSX.Element> =
	memo(LocationCardComponent);
