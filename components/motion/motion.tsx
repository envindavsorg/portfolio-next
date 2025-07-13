'use client';

import { Slot } from '@radix-ui/react-slot';
import { motion, stagger, type Variants } from 'motion/react';
import type React from 'react';
import { memo, useMemo } from 'react';
import { defaultVariants } from '@/components/motion/motion.variants';
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

const STAGGER_VARIANTS = {
	visible: {
		transition: {
			delayChildren: stagger(0.1, { startDelay: 0.25 }),
		},
	},
} as const;

const MotionSlot = memo(motion.create(Slot));

export const Motion = memo(
	({
		children,
		className,
		asChild,
		initial,
		animate,
		exit,
		variants,
		...props
	}: BaseMotionProps): React.JSX.Element => {
		const Comp = asChild ? MotionSlot : motion.div;

		const defaultProps = useMemo(
			() => ({
				initial: initial || 'hidden',
				animate: animate || 'visible',
				exit: exit || 'hidden',
				variants: variants || defaultVariants,
			}),
			[initial, animate, exit, variants],
		);
		return (
			<Comp
				{...defaultProps}
				className={cn('font-medium text-2xl leading-relaxed dark:text-white', className)}
				variants={STAGGER_VARIANTS}
				{...props}
			>
				{children}
			</Comp>
		);
	},
);
