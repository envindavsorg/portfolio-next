import { useEffect, useState } from 'react';

export const useReducedMotion = (): boolean => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		
		// Check for mobile devices (simplified detection)
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		) || window.innerWidth < 768;
		
		// Set initial value - enable reduced motion on mobile or if user prefers it
		setPrefersReducedMotion(mediaQuery.matches || isMobile);

		// Listen for changes in user preference
		const handleChange = (e: MediaQueryListEvent) => {
			setPrefersReducedMotion(e.matches || isMobile);
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	return prefersReducedMotion;
};