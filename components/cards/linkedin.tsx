'use client';

import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { LinkedinLogo } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type React from 'react';

export const LinkedInCard = (): React.JSX.Element => {
	const MotionLink = motion.create(Link);
	return (
		<MotionLink
			href={'https://linkedin.com/in/olivercederborg'}
			target="_blank"
			title="Linkedin profile"
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			className="relative col-span-2 row-span-1 flex items-center justify-center gap-x-2 overflow-hidden rounded-md border border-linkedin bg-linkedin text-white md:col-span-1 md:col-start-3 md:row-span-1 md:row-start-3 dark:bg-[#0077B5]"
		>
			<LinkedinLogo className="size-9" weight="bold" />
		</MotionLink>
	);
};
