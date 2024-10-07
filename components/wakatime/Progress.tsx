import { cn } from '@/lib/utils';
import { type Variants, motion } from 'framer-motion';
import type React from 'react';

interface ProgressProps {
	data: {
		name: string;
		percent?: number;
	};
	className?: string;
}

export const Progress = ({
	data,
	className,
}: ProgressProps): React.JSX.Element => {
	const { name, percent = 0 } = data;

	const progressVariants: Variants = {
		initial: { width: 0 },
		animate: {
			width: `${percent}%`,
			transition: { delay: 0.8 },
		},
	};

	return (
		<div className="flex items-center justify-between gap-3">
			<div className="w-24 text-sm leading-snug">
				{name === 'Coding' ? 'Code' : name === 'Jade' ? 'Pug' : name}
			</div>
			<div className="relative flex h-2.5 flex-1 justify-center rounded-full bg-neutral-300 dark:bg-black">
				<motion.span
					initial="initial"
					animate="animate"
					variants={progressVariants}
					className={cn(
						className,
						'absolute top-0 left-0 h-2.5 rounded-full px-3',
					)}
				>
					&ensp;
				</motion.span>
			</div>
			<div className="w-8 text-right font-extrabold text-foreground">
				{percent.toFixed(0)}%
			</div>
		</div>
	);
};
