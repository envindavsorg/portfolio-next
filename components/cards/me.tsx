'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import avatar from '@/images/avatar.webp';
import { name } from '@/resources/config';

export function MeCard() {
	return (
		<motion.div
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			className="card-border relative col-span-4 row-span-3 overflow-hidden rounded-xl md:col-span-2 md:row-span-3"
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
	);
}
