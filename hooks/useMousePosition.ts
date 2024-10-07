import { type RefObject, useEffect, useState } from 'react';

interface MousePosition {
	x: number | null;
	y: number | null;
}

const useMousePosition = (ref: RefObject<HTMLElement>): MousePosition => {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: null,
		y: null,
	});

	useEffect((): (() => void) => {
		const updateMousePosition = (event: MouseEvent): void => {
			if (ref.current) {
				setMousePosition({
					x: event.clientX - ref.current.getBoundingClientRect().left,
					y: event.clientY - ref.current.getBoundingClientRect().top,
				});
			}
		};

		window.addEventListener('mousemove', updateMousePosition);

		return (): void => {
			window.removeEventListener('mousemove', updateMousePosition);
		};
	}, [ref]);

	return mousePosition;
};

export default useMousePosition;
