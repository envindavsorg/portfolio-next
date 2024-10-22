'use client';

import { DotPattern } from '@/components/background/DotPattern';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type React from 'react';

interface PatternCardProps {
	icon: React.ReactNode;
	title?: string | number;
	comment?: string;
	className?: string;
	patternColor?: string;
}

export const PatternCard = ({
	icon,
	title,
	comment,
	className,
	patternColor = 'fill-theme',
}: PatternCardProps): React.JSX.Element => (
	<motion.div
		className={cn(
			className,
			'relative overflow-hidden rounded-md border border-neutral-200 bg-background p-4 dark:border-neutral-700',
		)}
	>
		<div className="flex-shrink-0 text-3xl md:text-4xl">{icon}</div>

		{title && (
			<div className="z-20 flex flex-col">
				<div className="font-extrabold font-geist-sans text-lg tracking-tighter md:text-xl">
					{title}
				</div>
				{comment && (
					<span className="text-neutral-600 text-xs dark:text-neutral-400">
						{comment}
					</span>
				)}
			</div>
		)}

		<DotPattern
			width={10}
			height={10}
			className={cn(patternColor, 'z-10 p-2')}
		/>
	</motion.div>
);
