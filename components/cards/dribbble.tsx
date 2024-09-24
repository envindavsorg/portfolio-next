'use client';

import { defaultVariantsNoDelay } from '@/components/motion/variants';
import { GithubLogo } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type React from 'react';

export const DribbbleCard = () => {
	const MotionLink = motion.create(Link);

	return (
		<MotionLink
			href={'https://dribbble.com/oliver'}
			target="_blank"
			title="Dribbble profile"
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			className="relative col-span-2 row-span-1 flex items-center justify-center gap-x-2 overflow-hidden rounded-md border border-border bg-switch text-white md:col-span-2 md:col-start-4 md:row-span-1"
		>
			<GithubLogo className="size-9" weight="bold" />
		</MotionLink>
	);
};
