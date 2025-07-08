'use client';

import { LinkedinLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { cn } from '@/lib/utils';

export const LinkedInCard = memo((): React.JSX.Element => {
	const MotionLink = motion.create(Link);

	return (
		<MotionLink
			href="https://www.linkedin.com/in/cuzeacflorin"
			target="_blank"
			title="Mon profil LinkedIn - Cuzeac Florin"
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			className={cn(
				'col-span-1 col-start-3 row-span-1 row-start-6 sm:col-span-1 sm:col-start-4 sm:row-span-1 sm:row-start-3',
				'relative flex items-center justify-center overflow-hidden p-4 font-mono tabular-nums',
				'isolate rounded-xl bg-white/20 ring-1 ring-black/5 dark:bg-white/10',
				'aspect-square border border-neutral-200/50 dark:border-neutral-700/50',
			)}
		>
			<LinkedinLogoIcon weight="duotone" className="text-3xl" />
		</MotionLink>
	);
});
