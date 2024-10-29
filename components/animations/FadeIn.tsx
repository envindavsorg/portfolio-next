'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { createContext, useContext } from 'react';

const FadeInStaggerContext = createContext(false);

const viewport = {
	once: true,
	margin: '0px 0px -200px',
};

interface FadeInProps
	extends React.ComponentPropsWithoutRef<typeof motion.div> {
	asChild?: boolean;
	className?: string;
}

export const FadeIn = (props: FadeInProps): React.JSX.Element => {
	const shouldReduceMotion = useReducedMotion();
	const isInStaggerGroup = useContext(FadeInStaggerContext);
	const { asChild, ...restProps } = props;

	return (
		<motion.div
			variants={{
				hidden: {
					opacity: 0,
					y: shouldReduceMotion ? 0 : 24,
				},
				visible: {
					opacity: 1,
					y: 0,
				},
			}}
			transition={{
				duration: 0.3,
			}}
			{...(isInStaggerGroup
				? {}
				: {
						initial: 'hidden',
						whileInView: 'visible',
						viewport,
					})}
			{...restProps}
		/>
	);
};

interface FadeInStaggerProps
	extends ComponentPropsWithoutRef<typeof motion.div> {
	faster?: boolean;
	className?: string;
}

export const FadeInStagger = ({
	faster = false,
	...props
}: FadeInStaggerProps) => (
	<FadeInStaggerContext.Provider value={true}>
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={viewport}
			transition={{
				staggerChildren: faster ? 0.1 : 0.2,
			}}
			{...props}
		/>
	</FadeInStaggerContext.Provider>
);
