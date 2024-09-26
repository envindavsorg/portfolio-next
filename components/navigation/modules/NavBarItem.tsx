import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type React from 'react';

interface NavBarItemProps {
	name: string;
	desc: string;
	link: string;
	active: boolean;
	disabled?: boolean;
}

export const NavBarItem = ({
	name,
	desc,
	link,
	active,
	disabled,
}: NavBarItemProps) => (
	<Link
		href={link}
		aria-label={desc}
		className={cn(
			'relative flex h-7 items-center px-1.5',
			disabled && 'pointer-events-none cursor-not-allowed opacity-50',
		)}
		passHref
	>
		<p
			className={cn(
				'hidden text-sm sm:block',
				active ? 'font-semibold text-theme' : 'font-normal text-foreground',
			)}
		>
			/{name.toLowerCase()}
		</p>

		{active && (
			<motion.span
				transition={{
					ease: 'backInOut',
					duration: 0.35,
				}}
				layoutId="active"
				className={cn(
					'absolute inset-0',
					'hidden sm:flex',
					'rounded-md border border-theme',
				)}
			/>
		)}
	</Link>
);
