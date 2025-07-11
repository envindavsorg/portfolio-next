'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import type React from 'react';
import { memo, useState } from 'react';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { Lens } from '@/components/ui/Lens';
import avatar from '@/images/avatar.webp';
import { cn } from '@/lib/utils';
import { name } from '@/resources/config';

export const AvatarCard = memo((): React.JSX.Element => {
	const [hovering, setHovering] = useState(false);

	return (
		<motion.div
			variants={defaultVariantsNoDelay}
			className={cn(
				'col-span-2 col-start-1 row-span-3 row-start-1 sm:col-span-2 sm:col-start-1 sm:row-span-3 sm:row-start-1',
				'overflow-hidden rounded-xl sm:h-66.5',
				'border border-neutral-200/50 ring-1 ring-black/5 dark:border-neutral-700/50',
			)}
		>
			<Lens hovering={hovering} setHovering={setHovering}>
				<Image
					alt={name}
					src={avatar}
					height={300}
					width={300}
					className="h-full object-cover grayscale-[0.35] filter"
					priority
				/>
			</Lens>
		</motion.div>
	);
});
