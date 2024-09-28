'use client';

import { Meteors } from '@/components/background/Meteors';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import createGlobe from 'cobe';
import { useTheme } from 'next-themes';
import React, { memo } from 'react';
import { useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';

interface LocationWidgetProps {
	className?: string;
}

export const LocationWidget = memo(({ className }: LocationWidgetProps) => {
	const { resolvedTheme } = useTheme();

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pointerInteracting = useRef<number | null>(null);
	const pointerInteractionMovement = useRef(0);

	const [{ r }, api] = useSpring(() => ({
		r: 0,
		config: {
			mass: 1,
			tension: 280,
			friction: 40,
			precision: 0.001,
		},
	}));

	useEffect(() => {
		let width = 0;
		let phi = 3;
		let direction = 1;

		const onResize = (): void => {
			if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
				window.addEventListener('resize', onResize);
			}
		};

		window.removeEventListener('resize', onResize);
		onResize();

		if (!canvasRef.current) {
			return;
		}

		const globe = createGlobe(canvasRef.current, {
			devicePixelRatio: 2,
			phi: 0,
			theta: 0.2,
			diffuse: 3,
			mapSamples: 36000,
			mapBrightness: 6,
			baseColor: [0.3, 0.3, 0.3],
			markerColor:
				resolvedTheme === 'dark'
					? [252 / 255, 211 / 255, 77 / 255]
					: [0.9176, 0.3451, 0.0471],
			glowColor: resolvedTheme === 'dark' ? [1, 1, 1] : [0, 0, 0],
			scale: 1,
			width: width * 2,
			height: width * 2,
			dark: 0,
			markers: [
				{
					location: [48.866667, 2.333333],
					size: 0.1,
				},
			],
			onRender: (state) => {
				state.phi = phi + r.get();

				if (state.phi > 5.5) {
					direction = -1;
				} else {
					if (state.phi < 3.25) {
						direction = 1;
					}
				}

				if (direction === 1) {
					phi += 0.001;
				} else {
					phi -= 0.001;
				}

				state.width = width * 2;
				state.height = width * 2;
			},
		});

		return () => globe.destroy();
	}, [r, resolvedTheme]);

	return (
		<WidgetCard className={className} column>
			<h3 className="absolute top-8 left-10 z-30 font-bold font-geist-sans text-4xl min-[530px]:top-4 min-[530px]:left-6 min-[530px]:text-5xl">
				Paris
			</h3>

			<div className="min-[530px]:-translate-x-5 absolute inset-x-0 bottom-[-90%] z-20 aspect-square h-96 translate-x-32">
				<div className="flex size-full place-content-center place-items-center overflow-visible">
					<div
						style={{
							width: '100%',
							aspectRatio: '1/1',
							WebkitMaskImage:
								'radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)',
							maskImage:
								'radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)',
						}}
					>
						<canvas
							ref={canvasRef}
							onPointerDown={(e) => {
								pointerInteracting.current =
									e.clientX - pointerInteractionMovement.current;
								canvasRef.current &&
									(canvasRef.current.style.cursor = 'grabbing');
							}}
							onPointerUp={() => {
								pointerInteracting.current = null;
								canvasRef.current && (canvasRef.current.style.cursor = 'grab');
							}}
							onPointerOut={() => {
								pointerInteracting.current = null;
								canvasRef.current && (canvasRef.current.style.cursor = 'grab');
							}}
							onMouseMove={(e) => {
								if (pointerInteracting.current !== null) {
									const delta = e.clientX - pointerInteracting.current;
									pointerInteractionMovement.current = delta;
									api.start({
										r: delta / 200,
									});
								}
							}}
							onTouchMove={(e) => {
								if (pointerInteracting.current !== null && e.touches[0]) {
									const delta =
										e.touches[0].clientX - pointerInteracting.current;
									pointerInteractionMovement.current = delta;
									api.start({
										r: delta / 100,
									});
								}
							}}
							style={{
								width: '100%',
								height: '100%',
								contain: 'layout paint size',
								cursor: 'auto',
								userSelect: 'none',
							}}
						/>
					</div>
				</div>
			</div>

			<Meteors number={40} />
		</WidgetCard>
	);
});
