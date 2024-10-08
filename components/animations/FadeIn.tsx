'use client';

import { Slot } from '@radix-ui/react-slot';
import {
	type ForwardRefComponent,
	type HTMLMotionProps,
	motion,
	useReducedMotion,
} from 'framer-motion';
import type React from 'react';
import { createContext, useContext } from 'react';

const FadeInStaggerContext = createContext(false);

const viewport = {
	once: true,
	margin: '0px 0px -200px',
};

export const FadeIn = (
	props: React.ComponentPropsWithoutRef<typeof motion.div> & {
		asChild?: boolean;
	},
): React.JSX.Element => {
	const shouldReduceMotion = useReducedMotion();
	const isInStaggerGroup = useContext(FadeInStaggerContext);
	const { asChild, ...restProps } = props;

	const Comp = asChild
		? (motion.create(Slot) as ForwardRefComponent<
				HTMLDivElement,
				HTMLMotionProps<'div'>
			>)
		: motion.div;

	return (
		<Comp
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

export const FadeInStagger = ({
	faster = false,
	...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & {
	faster?: boolean;
}) => (
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
