'use client';

import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { motion } from 'framer-motion';
import type React from 'react';
import { useEffect, useState } from 'react';

export const TimeCard = (): React.JSX.Element => {
	const [time, setTime] = useState<Date | null>(null);

	useEffect(() => {
		setTime(new Date());
		const interval = setInterval(() => setTime(new Date()), 10000);

		return () => clearInterval(interval);
	}, []);

	return (
		<motion.div
			variants={defaultVariantsNoDelay}
			whileHover={{
				scale: 1.05,
			}}
			className="relative col-span-4 col-start-5 row-start-1 flex items-center justify-center gap-2 overflow-hidden rounded-md border border-border bg-white p-4 md:col-span-2 md:col-start-6 md:row-span-0 dark:bg-neutral-900"
		>
			<h2 className="font-bold text-3xl text-switch md:text-4xl">
				{time?.toLocaleTimeString('fr-FR', {
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
				})}
			</h2>
		</motion.div>
	);
};
