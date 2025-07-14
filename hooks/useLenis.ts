import { useCallback, useEffect, useState } from 'react';
import type Lenis from 'lenis';

export const useLenis = () => {
	const [lenis, setLenis] = useState<Lenis | null>(null);

	useEffect(() => {
		const lenisInstance = (window as any).__lenis;
		if (lenisInstance) {
			setLenis(lenisInstance);
		}
	}, []);

	const scrollTo = useCallback(
		(target: string | number | HTMLElement, options?: any) => {
			if (lenis) {
				lenis.scrollTo(target, options);
			}
		},
		[lenis],
	);

	const scrollToTop = useCallback(
		(options?: any) => {
			if (lenis) {
				lenis.scrollTo(0, options);
			}
		},
		[lenis],
	);

	return {
		lenis,
		scrollTo,
		scrollToTop,
		isScrolling: lenis?.isScrolling ?? false,
	};
};