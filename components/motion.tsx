'use client';

import { Slot } from '@radix-ui/react-slot';
import {
	type ForwardRefComponent,
	type HTMLMotionProps,
	type MotionProps,
	motion,
} from 'framer-motion';
import { stagger } from 'motion';
import { defaultVariants } from '@/components/motion.variants';
import { cn } from '@/lib/utils';

type BaseMotionProps = {
	children: React.ReactNode;
	className?: string;
	asChild?: boolean;
} & MotionProps;

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
	const Comp = asChild
		? (motion.create(Slot) as ForwardRefComponent<HTMLDivElement, HTMLMotionProps<'div'>>)
		: motion.div;

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
