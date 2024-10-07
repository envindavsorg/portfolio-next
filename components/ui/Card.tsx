'use client';

import { DotPattern } from '@/components/background/DotPattern';
import { variantsOne } from '@/components/motion/variants';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type React from 'react';

interface BaseCardProps {
	tag: 'link' | 'static';
	icon: React.ReactNode;
	title?: string | number;
	comment?: string;
	className?: string;
	patternColor?: string;
}

interface StaticCardProps extends BaseCardProps {
	tag: 'static';
}

interface LinkCardProps extends BaseCardProps {
	tag: 'link';
	link: string;
}

type CardProps = StaticCardProps | LinkCardProps;

export const Card = ({
	tag,
	icon,
	title,
	comment,
	className,
	patternColor = 'fill-theme',
	...props
}: CardProps): React.JSX.Element => {
	const MotionComponent = tag === 'link' ? motion.a : motion.div;
	const motionProps =
		tag === 'link'
			? {
					href: (props as LinkCardProps).link,
					whileHover: {
						scale: 1.025,
					},
				}
			: {};

	return (
		<MotionComponent
			{...motionProps}
			variants={variantsOne}
			className={cn(
				className,
				'relative overflow-hidden rounded-md border border-neutral-200 bg-background p-4 dark:border-neutral-700',
			)}
		>
			<div className="flex-shrink-0 text-3xl md:text-4xl">{icon}</div>

			{title && (
				<div className="z-20 flex flex-col">
					<h3 className="font-extrabold font-geist-sans text-lg tracking-tighter md:text-xl">
						{title}
					</h3>
					{comment && (
						<span className="text-neutral-600 text-xs dark:text-neutral-400">
							{comment}
						</span>
					)}
				</div>
			)}

			<DotPattern
				width={10}
				height={10}
				className={cn(patternColor, 'z-10 p-2')}
			/>
		</MotionComponent>
	);
};
