// Copyright Cuzeac Florin 2024. All Rights Reserved.
// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

'use client';

import {
	type MotionValue,
	type Variants,
	motion,
	useReducedMotion,
	useScroll,
	useSpring,
} from 'framer-motion';
import type React from 'react';

export const ProgressBar = (): React.JSX.Element => {
	const { scrollYProgress } = useScroll();
	const shouldReduceMotion: boolean | null = useReducedMotion();

	const scaleX: MotionValue = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	const variants: Variants = {
		hide: {
			opacity: shouldReduceMotion ? 1 : 0,
		},
		show: (visibility: boolean) => ({
			opacity: shouldReduceMotion ? 1 : visibility ? 0.7 : 0,
		}),
	};

	return (
		<motion.div
			variants={variants}
			style={{ scaleX }}
			className="fixed top-0 right-0 left-0 mx-auto h-1 w-full max-w-[60ch] origin-left bg-theme"
		/>
	);
};
