'use client';

import { LinkedinLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { cn } from '@/lib/utils';

interface LinkedInCardProps {
	position: string;
}

export const LinkedInCard = memo(({ position }: LinkedInCardProps): React.JSX.Element => {
	const MotionLink = motion.create(Link);

	return (
		<MotionLink
			href="https://www.linkedin.com/in/cuzeacflorin"
			target="_blank"
			title="Mon profil LinkedIn - Cuzeac Florin"
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			className={cn(
				position,
				'relative hidden items-center justify-center overflow-hidden p-4 font-mono tabular-nums sm:flex',
				'isolate rounded-xl bg-white/20 ring-1 ring-black/5 dark:bg-white/10',
				'border border-neutral-200/50 dark:border-neutral-700/50',
			)}
		>
			<LinkedinLogoIcon weight="duotone" className="text-3xl" />
		</MotionLink>
	);
});
