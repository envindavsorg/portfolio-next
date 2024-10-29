import type React from 'react';
import type { SpringRef } from 'react-spring';

type Color = [number, number, number];
export const light: Color = [1, 1, 1];
export const dark: Color = [0, 0, 0];
export const yellow: Color = [252 / 255, 211 / 255, 77 / 255];
export const orange: Color = [234 / 255, 88 / 255, 12 / 255];

export const physics = {
	r: 0,
	config: {
		mass: 1,
		tension: 280,
		friction: 40,
		precision: 0.001,
	},
};

// my fixed location : coordinates (of Paris)
export const myLatitude: number = 48.858093;
export const myLongitude: number = 2.294694;

export const onPointerDown = (
	canvas: React.RefObject<HTMLCanvasElement | null>,
	pointerInteracting: React.RefObject<number | null>,
	pointerInteractionMovement: React.RefObject<number>,
	event: React.PointerEvent<HTMLCanvasElement>,
): void => {
	pointerInteracting.current =
		event.clientX - pointerInteractionMovement.current;
	canvas.current && (canvas.current.style.cursor = 'grabbing');
};

export const onPointerUp = (
	canvas: React.RefObject<HTMLCanvasElement | null>,
	pointerInteracting: React.RefObject<number | null>,
): void => {
	pointerInteracting.current = null;
	canvas.current && (canvas.current.style.cursor = 'grab');
};

export const onPointerOut = (
	canvas: React.RefObject<HTMLCanvasElement | null>,
	pointerInteracting: React.RefObject<number | null>,
): void => {
	pointerInteracting.current = null;
	canvas.current && (canvas.current.style.cursor = 'grab');
};

export const onMouseMove = (
	event: React.MouseEvent<HTMLCanvasElement | null>,
	pointerInteracting: React.RefObject<number | null>,
	pointerInteractionMovement: React.RefObject<number>,
	api: SpringRef<{ r: number }>,
): void => {
	if (pointerInteracting.current !== null) {
		const delta: number = event.clientX - pointerInteracting.current;

		pointerInteractionMovement.current = delta;
		api.start({
			r: delta / 200,
		});
	}
};

export const onTouchMove = (
	event: React.TouchEvent<HTMLCanvasElement | null>,
	pointerInteracting: React.RefObject<number | null>,
	pointerInteractionMovement: React.RefObject<number>,
	api: SpringRef<{ r: number }>,
): void => {
	if (pointerInteracting.current !== null && event.touches[0]) {
		const delta: number = event.touches[0].clientX - pointerInteracting.current;

		pointerInteractionMovement.current = delta;
		api.start({
			r: delta / 100,
		});
	}
};
