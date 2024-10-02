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

	useEffect(() => {
		const updateMousePosition = (ev: MouseEvent) => {
			if (ref.current) {
				setMousePosition({
					x: ev.clientX - ref.current.getBoundingClientRect().left,
					y: ev.clientY - ref.current.getBoundingClientRect().top,
				});
			}
		};
		window.addEventListener('mousemove', updateMousePosition);

		return () => {
			window.removeEventListener('mousemove', updateMousePosition);
		};
	}, [ref]);

	return mousePosition;
};

export default useMousePosition;
