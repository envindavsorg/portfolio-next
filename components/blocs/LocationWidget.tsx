'use client';

import { Meteors } from '@/components/background/Meteors';
import createGlobe, { type COBEOptions } from 'cobe';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo } from 'react';
import { useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';

interface LocationWidgetProps {
	latitude: number;
	longitude: number;
}

export const LocationWidget = memo(
	({ latitude, longitude }: LocationWidgetProps): React.JSX.Element => {
		// theme
		const { resolvedTheme } = useTheme();
		const isDark: boolean = resolvedTheme === 'dark';

		// canvas
		const canvas = useRef<HTMLCanvasElement>(null);
		const pointerInteracting = useRef<number | null>(null);
		const pointerInteractionMovement = useRef(0);

		// styles
		type Color = [number, number, number];
		const light: Color = [1, 1, 1];
		const dark: Color = [0, 0, 0];
		const yellow: Color = [252 / 255, 211 / 255, 77 / 255];
		const orange: Color = [234 / 255, 88 / 255, 12 / 255];

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
				markerColor: isDark ? yellow : orange,
				glowColor: isDark ? light : dark,
				scale: 1,
				width: width * 2,
				height: width * 2,
				dark: 0,
				markers: [
					{
						location: [latitude, longitude],
						size: 0.1,
					},
				],
				onRender: (state: Record<string, any>) => {
					state.phi = phi + r.get();

					if (state.phi > 5.5) {
						direction = -1;
					} else if (state.phi < 3.25) {
						direction = 1;
					}

					if (direction === 1) {
						phi += 0.001;
					} else {
						phi -= 0.001;
					}

					state.width = width * 2;
					state.height = width * 2;
				},
			};

			const globe = createGlobe(canvas.current, globeConfig);

			return () => {
				window.removeEventListener('resize', onResize);
				globe.destroy();
			};
		}, [r, resolvedTheme]);

		// functions
		const onPointerDown = (
			event: React.PointerEvent<HTMLCanvasElement>,
		): void => {
			pointerInteracting.current =
				event.clientX - pointerInteractionMovement.current;
			canvas.current && (canvas.current.style.cursor = 'grabbing');
		};

		const onPointerUp = (): void => {
			pointerInteracting.current = null;
			canvas.current && (canvas.current.style.cursor = 'grab');
		};

		const onPointerOut = (): void => {
			pointerInteracting.current = null;
			canvas.current && (canvas.current.style.cursor = 'grab');
		};

		const onMouseMove = (event: React.MouseEvent<HTMLCanvasElement>): void => {
			if (pointerInteracting.current !== null) {
				const delta: number = event.clientX - pointerInteracting.current;

				pointerInteractionMovement.current = delta;
				api.start({
					r: delta / 200,
				});
			}
		};

		const onTouchMove = (event: React.TouchEvent<HTMLCanvasElement>): void => {
			if (pointerInteracting.current !== null && event.touches[0]) {
				const delta: number =
					event.touches[0].clientX - pointerInteracting.current;

				pointerInteractionMovement.current = delta;
				api.start({
					r: delta / 100,
				});
			}
		};

		return (
			<div className="relative flex h-56 w-full shrink-0 flex-col items-center justify-between rounded-md border border-border bg-background p-2 min-[530px]:aspect-square min-[530px]:h-full min-[530px]:w-56">
				<h2 className="absolute top-20 left-4 z-30 font-bold font-geist-sans text-4xl min-[530px]:top-4 min-[530px]:left-4 min-[530px]:text-5xl">
					Paris
				</h2>
				<p className="absolute top-8 left-4 z-30 text-sm min-[530px]:hidden">
					Ma <span className="font-bold text-theme">localisation</span>
					<br />
					actuelle :
				</p>

				<div className="min-[530px]:-translate-x-5 absolute inset-x-0 bottom-[-90%] z-20 aspect-square h-96 translate-x-32">
					<div className="flex size-full place-content-center place-items-center overflow-visible">
						<div className="aspect-square w-full">
							<canvas
								ref={canvas}
								onPointerDown={(event) => onPointerDown(event)}
								onMouseMove={(event) => onMouseMove(event)}
								onTouchMove={(event) => onTouchMove(event)}
								onPointerUp={() => onPointerUp()}
								onPointerOut={() => onPointerOut()}
								className="size-full cursor-auto select-none"
								style={{ contain: 'layout paint size' }}
							/>
						</div>
					</div>
				</div>

				<Meteors number={40} />
			</div>
		);
	},
);
