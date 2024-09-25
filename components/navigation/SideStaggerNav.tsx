'use client';

import { type NavItems, navItems } from '@/components/navigation/NavItems';
import {
	AnimatePresence,
	type MotionValue,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from 'framer-motion';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

const NUM_LINES: number = 30;

export const SideStaggerNavigation = (): React.JSX.Element => {
	const [isHovered, setIsHovered] = useState(false);
	const mouseY: MotionValue<number> = useMotionValue(Number.POSITIVE_INFINITY);

	return (
		<motion.nav
			onMouseMove={(e) => {
				mouseY.set(e.clientY);
				setIsHovered(true);
			}}
			onMouseLeave={() => {
				mouseY.set(Number.POSITIVE_INFINITY);
				setIsHovered(false);
			}}
			className="fixed top-0 right-0 hidden h-screen flex-col items-end justify-between py-4 pl-8 lg:flex"
		>
			{Array.from(Array(NUM_LINES).keys()).map((i) => {
				const linkContent: NavItems | undefined = navItems.find(
					(item) => item.position === i + 1,
				);

				return (
					<LinkLine
						title={linkContent?.name}
						link={linkContent?.link}
						description={linkContent?.description}
						isHovered={isHovered}
						mouseY={mouseY}
						key={i}
					/>
				);
			})}
		</motion.nav>
	);
};

const SPRING_OPTIONS = {
	mass: 1,
	stiffness: 200,
	damping: 15,
};

interface LinkLineProps {
	mouseY: MotionValue;
	title: string | undefined;
	link: string | undefined;
	description: string | undefined;
	isHovered: boolean;
}

const LinkLine = ({
	mouseY,
	isHovered,
	title,
	link,
	description,
}: LinkLineProps): React.JSX.Element => {
	const ref = useRef<HTMLDivElement>(null);
	const distance = useTransform(mouseY, (val) => {
		const bounds = ref.current?.getBoundingClientRect();

		return val - (bounds?.y || 0) - (bounds?.height || 0) / 2;
	});

	// Styles for non-link lines
	const lineWidthRaw = useTransform(distance, [-80, 0, 80], [15, 100, 15]);
	const lineWidth = useSpring(lineWidthRaw, SPRING_OPTIONS);

	// Styles for link lines
	const linkWidth = useSpring(25, SPRING_OPTIONS);

	useEffect(() => {
		if (isHovered) {
			linkWidth.set(150);
		} else {
			linkWidth.set(25);
		}
	}, [isHovered]);

	if (title) {
		return (
			<Link href={link || '#'} aria-label={description}>
				<motion.div
					ref={ref}
					className="group relative bg-neutral-500 transition-colors hover:bg-theme"
					style={{ width: linkWidth, height: 2 }}
				>
					<AnimatePresence>
						{isHovered && (
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute top-0 left-0 z-10 w-full pt-2 font-bold font-geist-sans text-switch transition-colors group-hover:text-theme"
							>
								{title}
							</motion.span>
						)}
					</AnimatePresence>
				</motion.div>
			</Link>
		);
	}

	return (
		<motion.div
			ref={ref}
			className="relative bg-neutral-500"
			style={{ width: lineWidth, height: 2 }}
		/>
	);
};
