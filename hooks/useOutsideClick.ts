import type { RefObject } from 'react';
import { useEffect } from 'react';

const useOutsideClick = (
	ref: RefObject<HTMLDivElement>,
	callback: (event: Event) => void,
) =>
	useEffect(() => {
		const listener = (event: Event) => {
			const target = event.target as Node;
			if (!ref.current || ref.current.contains(target)) {
				return;
			}
			callback(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, callback]);

export default useOutsideClick;
