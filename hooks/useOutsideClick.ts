import type { RefObject } from 'react';
import { useEffect } from 'react';

const useOutsideClick = (
	ref: RefObject<HTMLDivElement | null>,
	callback: (event: Event) => void,
): void =>
	useEffect((): (() => void) => {
		const listener = (event: Event): void => {
			const target = event.target as Node;
			if (!ref.current || ref.current.contains(target)) {
				return;
			}

			callback(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return (): void => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, callback]);

export default useOutsideClick;
