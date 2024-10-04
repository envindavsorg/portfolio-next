'use client';

import { cn } from '@/lib/utils';
import {
	type MotionValue,
	useInView,
	useMotionValue,
	useSpring,
} from 'framer-motion';
import type React from 'react';
import { useEffect, useRef } from 'react';

interface CounterProps extends React.HTMLAttributes<HTMLSpanElement> {
	value: number;
	direction?: 'up' | 'down';
	delay?: number;
	className?: string;
}

export const Counter = ({
	value,
	direction = 'up',
	delay = 0,
	className,
}: CounterProps) => {
	const ref = useRef<HTMLSpanElement>(null);
	const motionValue: MotionValue<number> = useMotionValue(
		direction === 'down' ? value : 0,
	);

	const springValue: MotionValue = useSpring(motionValue, {
		damping: 60,
		stiffness: 100,
	});

	const isInView: boolean = useInView(ref, {
		once: true,
		margin: '0px',
	});

	useEffect(() => {
		isInView &&
			setTimeout(() => {
				motionValue.set(direction === 'down' ? 0 : value);
			}, delay * 1000);
	}, [motionValue, isInView, delay, value, direction]);

	useEffect(
		() =>
			springValue.on('change', (latest: number) => {
				if (ref.current) {
					ref.current.textContent = Intl.NumberFormat('fr-FR').format(
						Number(latest.toFixed(0)),
					);
				}
			}),
		[springValue],
	);

	return (
		<span className={cn(className, 'inline-block tabular-nums')} ref={ref} />
	);
};
