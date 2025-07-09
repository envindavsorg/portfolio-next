'use client';

import { motion, useReducedMotion } from 'motion/react';
import type React from 'react';
import { createContext, forwardRef, useContext } from 'react';

const FadeInStaggerContext = createContext(false);

const viewport = {
	once: true,
	margin: '0px 0px -200px',
};

const fadeInTransition = {
	duration: 0.3,
};

type MotionDivElement = React.ComponentRef<typeof motion.div>;

interface FadeInProps {
	asChild?: boolean;
	className?: string;
	children: React.ReactNode;
}

export const FadeIn = forwardRef<MotionDivElement, FadeInProps>(
	({ asChild, className, children, ..._props }, ref) => {
		const reduceMotion = useReducedMotion();
		const isStaggered = useContext(FadeInStaggerContext);

		const variants = {
			hidden: {
				opacity: 0,
				y: reduceMotion ? 0 : 24,
			},
			visible: {
				opacity: 1,
				y: 0,
			},
		};

		const viewProps = isStaggered
			? {}
			: {
					initial: 'hidden',
					whileInView: 'visible',
					viewport,
				};

		return (
			<motion.div
				ref={ref}
				className={className}
				variants={variants}
				transition={fadeInTransition}
				{...viewProps}
				{..._props}
			>
				{children}
			</motion.div>
		);
	},
);

FadeIn.displayName = 'FadeIn';

interface FadeInStaggerProps {
	children: React.ReactNode;
	faster?: boolean;
	className?: string;
}

export const FadeInStagger = forwardRef<MotionDivElement, FadeInStaggerProps>(
	({ faster = false, children, className, ...props }, ref) => (
		<FadeInStaggerContext.Provider value={true}>
			<motion.div
				ref={ref}
				className={className}
				initial="hidden"
				whileInView="visible"
				viewport={viewport}
				transition={{ staggerChildren: faster ? 0.1 : 0.2 }}
				{...props}
			>
				{children}
			</motion.div>
		</FadeInStaggerContext.Provider>
	),
);

FadeInStagger.displayName = 'FadeInStagger';
