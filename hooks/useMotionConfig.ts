'use client';

import type { Transition } from 'motion/react';
import { useEffect, useState } from 'react';

const useMotionConfig = (): Transition => {
	const [config, setConfig] = useState<Transition>({
		type: 'spring',
		bounce: 0.05,
		duration: 0.25,
	});

	useEffect(() => {
		const updateConfig = () => {
			const prefersReducedMotion = window.matchMedia(
				'(prefers-reduced-motion: reduce)',
			).matches;
			const isMobile = window.innerWidth < 768;

			if (prefersReducedMotion) {
				setConfig({
					type: 'tween',
					duration: 0.1,
				});
			} else if (isMobile) {
				setConfig({
					type: 'tween',
					duration: 0.2,
				});
			} else {
				setConfig({
					type: 'spring',
					bounce: 0.05,
					duration: 0.25,
				});
			}
		};

		updateConfig();

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const handleChange = () => updateConfig();

		mediaQuery.addEventListener('change', handleChange);
		window.addEventListener('resize', updateConfig);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
			window.removeEventListener('resize', updateConfig);
		};
	}, []);

	return config;
};

export default useMotionConfig;
