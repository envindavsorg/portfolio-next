'use client';

import { defaultVariantsNoDelay } from '@/components/motion/variants';
import { env } from '@/env/client';
import { Globe } from '@phosphor-icons/react';
import createGlobe from 'cobe';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useSpring } from 'react-spring';

export const LocationCard = () => {
	const { systemTheme, theme } = useTheme();
	const currentTheme = theme === 'system' ? systemTheme : theme;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pointerInteracting = React.useRef<number | null>(null);
	const pointerInteractionMovement = React.useRef(0);
	const fadeMask =
		'radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)';
	const {
		NEXT_PUBLIC_CITY_LOCATION: city,
		NEXT_PUBLIC_CITY_LATITUDE: latitude,
		NEXT_PUBLIC_CITY_LONGITUDE: longitude,
	} = env;

	const [{ r }, api] = useSpring(() => ({
		r: 0,
		config: {
			mass: 0.5,
			tension: 200,
			friction: 20,
			precision: 0.001,
		},
	}));

	useEffect(() => {
		let width = 0;
		let phi = 3;
		let direction = 1;

		const onResize = () => {
			if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
				window.addEventListener('resize', onResize);
			}
		};
		onResize();

		if (!canvasRef.current) {
			return;
		}

		const globe = createGlobe(canvasRef.current, {
			devicePixelRatio: 2,
			width: width * 2,
			height: width * 2,
			phi: 0,
			theta: 0.2,
			dark: currentTheme === 'dark' ? 1 : 0,
			diffuse: 3,
			mapSamples: 36_000,
			mapBrightness: 2.5,
			baseColor: currentTheme === 'dark' ? [0.5, 0.5, 0.5] : [1, 1, 1],
			markerColor: [252 / 255, 211 / 255, 77 / 255],
			glowColor: currentTheme === 'dark' ? [0.5, 0.5, 0.5] : [0.9, 0.9, 0.9],
			markers: [
				{
					location: [latitude, longitude],
					size: 0.4,
				},
			],
			scale: 1,
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

		return () => {
			globe.destroy();
			window.removeEventListener('resize', onResize);
		};
	}, [r, currentTheme]);

	return (
		<motion.div
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			className="relative col-span-4 col-start-5 row-span-3 row-start-2 flex flex-col gap-6 overflow-hidden rounded-md border border-border bg-white p-4 md:col-span-2 md:col-start-6 md:row-span-2 md:row-start-2 md:h-40 dark:bg-neutral-900"
		>
			<div className="z-10 flex items-center gap-2">
				<Globe className="size-6" weight="regular" />
				<h2 className="font-semibold text-lg">{city}</h2>
			</div>
			<div className="absolute inset-x-0 bottom-[-75%] mx-auto aspect-square h-[150%] translate-x-[-12.5%] [@media(max-width:420px)]:h-[320px]">
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						placeItems: 'center',
						placeContent: 'center',
						overflow: 'visible',
					}}
				>
					<div
						style={{
							width: '100%',
							aspectRatio: '1/1',
							WebkitMaskImage: fadeMask,
							maskImage: fadeMask,
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
		</motion.div>
	);
};
