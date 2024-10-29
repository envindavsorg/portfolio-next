'use client';

import { Meteors } from '@/components/background/Meteors';
import { DistanceFromUser } from '@/components/widgets/location/DistanceFromUser';
import {
	dark,
	light,
	myLatitude,
	myLongitude,
	onMouseMove,
	onPointerDown,
	onPointerOut,
	onPointerUp,
	onTouchMove,
	orange,
	physics,
	yellow,
} from '@/lib/globe';
import createGlobe, { type COBEOptions } from 'cobe';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';

export const LocationWidget = memo((): React.JSX.Element => {
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
			markerColor: resolvedTheme === 'dark' ? yellow : orange,
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
		<div className="relative flex h-52 w-full shrink-0 flex-col items-center justify-between overflow-hidden rounded-md border border-neutral-200 bg-background p-2 min-[530px]:aspect-square min-[530px]:h-56 min-[530px]:w-56 dark:border-neutral-700">
			<DistanceFromUser />

			<div className="min-[530px]:-translate-x-5 absolute inset-x-0 z-20 aspect-square h-96 translate-x-32 min-[530px]:top-[35%]">
				<div className="flex size-full place-content-center place-items-center overflow-visible">
					<div className="aspect-square w-full">
						<canvas
							ref={canvas}
							onPointerDown={(event) =>
								onPointerDown(
									canvas,
									pointerInteracting,
									pointerInteractionMovement,
									event,
								)
							}
							onMouseMove={(event) =>
								onMouseMove(
									event,
									pointerInteracting,
									pointerInteractionMovement,
									api,
								)
							}
							onTouchMove={(event) =>
								onTouchMove(
									event,
									pointerInteracting,
									pointerInteractionMovement,
									api,
								)
							}
							onPointerUp={() => onPointerUp(canvas, pointerInteracting)}
							onPointerOut={() => onPointerOut(canvas, pointerInteracting)}
							className="size-full cursor-auto select-none"
							style={{ contain: 'layout paint size' }}
						/>
					</div>
				</div>
			</div>

			<Meteors number={40} />
		</div>
	);
});
