'use client';

import NumberFlow from '@number-flow/react';
import { motion } from 'motion/react';
import type React from 'react';
import { memo, useEffect, useState } from 'react';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { cn } from '@/lib/utils';

const TimeCardComponent = (): React.JSX.Element => {
	const [time, setTime] = useState<Date>(() => new Date());

	useEffect(() => {
		const now: number = Date.now();
		const delay: number = 1000 - (now % 1000);
		let interval: NodeJS.Timeout;

		const start = () => {
			setTime(new Date());
			interval = setInterval(() => setTime(new Date()), 1000);
		};

		const timeout: NodeJS.Timeout = setTimeout(start, delay);

		return () => {
			clearTimeout(timeout);
			clearInterval(interval);
		};
	}, []);

	return (
		<motion.div
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			className={cn(
				'col-span-4 col-start-5 row-start-1 md:col-span-2 md:col-start-6 md:row-span-0',
				'relative flex items-center justify-center overflow-hidden p-4 font-mono tabular-nums',
				'isolate rounded-xl bg-white/20 ring-1 ring-black/5 dark:bg-white/10',
				'border border-neutral-200/50 dark:border-neutral-700/50',
			)}
		>
			<NumberFlow
				className="font-bold text-xl md:text-2xl"
				value={time.getHours()}
				format={{ minimumIntegerDigits: 2 }}
			/>
			<span className="select-none px-1 font-normal text-sm">:</span>
			<NumberFlow
				className="font-bold text-xl md:text-2xl"
				value={time.getMinutes()}
				format={{ minimumIntegerDigits: 2 }}
			/>
			<span className="select-none px-1 font-normal text-sm">:</span>
			<NumberFlow
				className="font-bold text-xl md:text-2xl"
				value={time.getSeconds()}
				format={{ minimumIntegerDigits: 2 }}
			/>
		</motion.div>
	);
};

export const TimeCard: React.MemoExoticComponent<() => React.JSX.Element> =
	memo(TimeCardComponent);
