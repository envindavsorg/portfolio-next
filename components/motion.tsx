'use client';

import { Slot } from '@radix-ui/react-slot';
import {
	motion,
	stagger,
	type Variants,
} from 'motion/react';
import { defaultVariants } from '@/components/motion.variants';
import { cn } from '@/lib/utils';

type BaseMotionProps = {
	children: React.ReactNode;
	className?: string;
	asChild?: boolean;
	initial?: string;
	animate?: string;
	exit?: string;
	variants?: Variants;
};

export function Motion({
	children,
	className,
	asChild,
	initial,
	animate,
	exit,
	variants,
	...props
}: BaseMotionProps) {
	const Comp = asChild ? motion.create(Slot) : motion.div;

	const defaultProps: Partial<BaseMotionProps> = {
		initial: initial || 'hidden',
		animate: animate || 'visible',
		exit: exit || 'hidden',
		variants: variants || defaultVariants,
	};
	return (
		<Comp
			{...defaultProps}
			className={cn('font-medium text-2xl leading-relaxed dark:text-white', className)}
			variants={{
				visible: {
					transition: {
						delayChildren: stagger(0.1, { startDelay: 0.25 }),
					},
				},
			}}
			{...props}
		>
			{children}
		</Comp>
	);
}
