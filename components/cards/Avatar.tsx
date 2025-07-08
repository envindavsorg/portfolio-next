'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import type React from 'react';
import { memo } from 'react';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import avatar from '@/images/avatar.webp';
import { cn } from '@/lib/utils';
import { name } from '@/resources/config';

export const AvatarCard = memo(
	(): React.JSX.Element => (
		<motion.div
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			className={cn(
				'col-span-2 col-start-1 row-span-3 row-start-1 sm:col-span-2 sm:col-start-1 sm:row-span-3 sm:row-start-1',
				'overflow-hidden rounded-xl sm:h-66.5',
				'border border-neutral-200/50 ring-1 ring-black/5 dark:border-neutral-700/50',
			)}
		>
			<Image
				alt={name}
				src={avatar}
				height={300}
				width={300}
				className="h-full object-cover grayscale-[0.35] filter"
				priority
			/>
		</motion.div>
	),
);
