'use client';

import NumberFlow from '@number-flow/react';
import { motion } from 'motion/react';
import type React from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { cn } from '@/lib/utils';

interface TimeCardProps {
	position: string;
}

interface TimeParts {
	hours: number;
	minutes: number;
	seconds: number;
}

export const TimeCard = memo(({ position }: TimeCardProps): React.JSX.Element => {
	const [timeParts, setTimeParts] = useState<TimeParts>(() => {
		const now = new Date();
		return {
			hours: now.getHours(),
			minutes: now.getMinutes(),
			seconds: now.getSeconds(),
		};
	});

	const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
	const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

	const updateTime = useCallback(() => {
		const now = new Date();
		const newHours = now.getHours();
		const newMinutes = now.getMinutes();
		const newSeconds = now.getSeconds();

		setTimeParts((prev) => {
			if (
				prev.hours !== newHours ||
				prev.minutes !== newMinutes ||
				prev.seconds !== newSeconds
			) {
				return {
					hours: newHours,
					minutes: newMinutes,
					seconds: newSeconds,
				};
			}
			return prev;
		});
	}, []);

	useEffect(() => {
		const now = Date.now();
		const delay = 1000 - (now % 1000);

		const start = () => {
			updateTime();
			intervalRef.current = setInterval(updateTime, 1000);
		};

		timeoutRef.current = setTimeout(start, delay);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [updateTime]);

	const formatOptions = useMemo(() => ({ minimumIntegerDigits: 2 }), []);

	return (
		<motion.div
			variants={defaultVariantsNoDelay}
			className={cn(
				position,
				'relative flex items-center justify-center overflow-hidden p-4 font-mono tabular-nums',
				'isolate rounded-xl bg-white/20 ring-1 ring-black/5 dark:bg-white/10',
				'border border-neutral-200/50 dark:border-neutral-700/50',
			)}
		>
			<NumberFlow
				className="font-bold text-2xl"
				value={timeParts.hours}
				format={formatOptions}
			/>
			<span className="select-none px-1 font-normal text-sm">:</span>
			<NumberFlow
				className="font-bold text-2xl"
				value={timeParts.minutes}
				format={formatOptions}
			/>
			<span className="select-none px-1 font-normal text-sm">:</span>
			<NumberFlow
				className="font-bold text-2xl"
				value={timeParts.seconds}
				format={formatOptions}
			/>
		</motion.div>
	);
});
