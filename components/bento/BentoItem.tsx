'use client';

import { cn } from '@/lib/utils';
import {
	AnimatePresence,
	type UseInViewOptions,
	type Variants,
	motion,
	useInView,
} from 'framer-motion';
import type React from 'react';
import type { MutableRefObject } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

type MarginType = UseInViewOptions['margin'];

interface BentoItemProps {
	children: React.ReactNode;
	position: number;
	variant?: {
		hidden: {
			y: number;
		};
		visible: {
			y: number;
		};
	};
	duration?: number;
	delay?: number;
	yOffset?: number;
	inView?: boolean;
	inViewMargin?: MarginType;
	blur?: string;
	className?: string;
}

export const BentoItem = ({
	children,
	position,
	variant,
	duration = 0.4,
	delay = 0,
	yOffset = 6,
	inView = false,
	inViewMargin = '-50px',
	blur = '6px',
	className,
}: BentoItemProps): React.JSX.Element => {
	const [isVisible, setIsVisible] = useState(false);

	const ref: MutableRefObject<null> = useRef(null);
	const inViewResult: boolean = useInView(ref, {
		once: true,
		margin: inViewMargin,
	});
	const isInView: boolean = !inView || inViewResult;
	const defaultVariants: Variants = {
		hidden: {
			y: yOffset,
			opacity: 0,
			filter: `blur(${blur})`,
		},
		visible: {
			y: -yOffset,
			opacity: 1,
			filter: `blur(0px)`,
		},
	};
	const combinedVariants = variant || defaultVariants;

	return (
		<AnimatePresence>
			<motion.div
				ref={ref}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
				exit="hidden"
				variants={combinedVariants}
				transition={{
					delay: 0.04 + delay,
					duration,
					ease: 'easeOut',
				}}
				whileHover={{
					scale: 1.025,
					rotate: 0,
					transition: { duration: 0.4 },
				}}
				whileInView={{
					opacity: 1,
					transition: { delay: position / 100 },
				}}
				viewport={{
					once: true,
				}}
				onHoverStart={() => setIsVisible(true)}
				onHoverEnd={() => setIsVisible(false)}
				className={cn(
					'relative z-10 flex-none overflow-hidden rounded-xl border bg-background p-2 sm:rounded-2xl sm:p-4',
					isVisible ? 'border-theme' : 'border-border',
					className,
				)}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};
