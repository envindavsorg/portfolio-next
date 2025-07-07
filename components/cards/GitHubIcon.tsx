'use client';

import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { cn } from '@/lib/utils';

const GitHubIconCardComponent = (): React.JSX.Element => {
	const MotionLink = motion(Link);

	return (
		<MotionLink
			href="https://github.com/envindavsorg"
			target="_blank"
			title="Mon profil GitHub - Cuzeac Florin"
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			className={cn(
				'col-span-2 row-span-1 md:col-span-1 md:col-start-4 md:row-span-1 md:row-start-3',
				'relative flex items-center justify-center overflow-hidden p-4 font-mono tabular-nums',
				'isolate rounded-xl bg-white/20 ring-1 ring-black/5 dark:bg-white/10',
				'border border-neutral-200/50 dark:border-neutral-700/50',
			)}
		>
			<GithubLogoIcon weight="duotone" className="text-3xl" />
		</MotionLink>
	);
};

export const GitHubIconCard: React.MemoExoticComponent<() => React.JSX.Element> = memo(
	GitHubIconCardComponent,
);
