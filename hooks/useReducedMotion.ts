import { useEffect, useState } from 'react';

const useReducedMotion = (): boolean => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		const isMobile =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent,
			) || window.innerWidth < 768;

		setPrefersReducedMotion(mediaQuery.matches || isMobile);

		const handleChange = (e: MediaQueryListEvent) => {
			setPrefersReducedMotion(e.matches || isMobile);
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	return prefersReducedMotion;
};

export default useReducedMotion;
