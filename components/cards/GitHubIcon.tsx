'use client';

import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { GitHubText } from '@/components/icons/GitHubText';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { cn } from '@/lib/utils';

export const GitHubIconCard = memo((): React.JSX.Element => {
	const MotionLink = motion.create(Link);

	return (
		<MotionLink
			href="https://github.com/envindavsorg"
			target="_blank"
			title="Mon profil GitHub - Cuzeac Florin"
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			className={cn(
				'col-span-2 col-start-1 row-span-1 row-start-6 sm:col-span-1 sm:col-start-3 sm:row-span-1 sm:row-start-3',
				'relative flex items-center justify-center overflow-hidden p-4 font-mono tabular-nums',
				'isolate rounded-xl bg-white/20 ring-1 ring-black/5 dark:bg-white/10',
				'border border-neutral-200/50 sm:aspect-square dark:border-neutral-700/50',
			)}
		>
			<GithubLogoIcon weight="duotone" className="hidden text-3xl sm:block" />
			<div className="flex items-center gap-x-2 sm:hidden">
				<GithubLogoIcon weight="duotone" className="text-2xl" />
				<GitHubText className="h-5 w-16" />
			</div>
		</MotionLink>
	);
});
