'use client';

import { defaultVariantsNoDelay } from '@/components/motion/variants';
import portrait from '@/images/portrait.webp';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';

export const MeCard = (): React.JSX.Element => (
	<motion.div
		variants={defaultVariantsNoDelay}
		whileHover={{
			scale: 1.05,
		}}
		className="relative col-span-4 row-span-3 overflow-hidden rounded-md border border-border md:col-span-2 md:row-span-3"
	>
		<Image
			alt="Cuzeac Florin"
			src={portrait}
			className="h-full object-cover grayscale-[0.35] filter"
			priority
		/>
	</motion.div>
);
