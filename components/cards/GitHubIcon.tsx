'use client';

import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { cn } from '@/lib/utils';

interface GitHubIconCardProps {
	position: string;
}

export const GitHubIconCard = memo(
	({ position }: GitHubIconCardProps): React.JSX.Element => {
		const MotionLink = motion.create(Link);

		return (
			<MotionLink
				href="https://github.com/envindavsorg"
				target="_blank"
				title="Mon profil GitHub - Cuzeac Florin"
				variants={defaultVariantsNoDelay}
				whileHover={{ scale: 1.05 }}
				className={cn(
					position,
					'relative flex items-center justify-center overflow-hidden p-4 font-mono tabular-nums',
					'isolate rounded-xl bg-white/20 ring-1 ring-black/5 dark:bg-white/10',
					'border border-neutral-200/50 dark:border-neutral-700/50',
				)}
			>
				<GithubLogoIcon weight="duotone" className="text-3xl" />
			</MotionLink>
		);
	},
);
