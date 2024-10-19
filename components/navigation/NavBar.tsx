'use client';

import { Button } from '@/components/ui/Button';
import { env } from '@/env/client';
import avatar from '@/images/avatar.webp';
import { cn, getRouterLastPathSegment } from '@/lib/utils';
import {
	type Navigation,
	SIDEBAR_NUM_LINES,
	navigation,
} from '@/resources/navigation';
import { ArrowLeft } from '@phosphor-icons/react';
import {
	AnimatePresence,
	type MotionValue,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from 'framer-motion';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

export const NavBar = (): React.JSX.Element => {
	const pathname: string | null = usePathname();
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
			{Array.from(Array(SIDEBAR_NUM_LINES).keys()).map((idx: number) => {
				const content: Navigation | undefined = navigation.find(
					({ position }: Navigation) => position === idx + 1,
				);
				const active: boolean =
					content?.link === '/blog'
						? pathname!.startsWith(content?.link)
						: getRouterLastPathSegment(pathname!) ===
								content?.link.split('/').pop() ||
							getRouterLastPathSegment(pathname!) === content?.link;

				return (
					<LinkLine
						key={`${idx}-${content?.name}`}
						title={content?.name}
						link={content?.link}
						description={content?.description}
						isHovered={isHovered}
						mouseY={mouseY}
						active={active}
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
	active: boolean;
}

const LinkLine = ({
	mouseY,
	isHovered,
	title,
	link,
	description,
	active,
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
					className={cn(
						'group relative bg-foreground transition-colors hover:bg-theme',
						active && 'bg-theme',
					)}
					style={{
						width: linkWidth,
						height: 2,
					}}
				>
					<AnimatePresence>
						{isHovered && (
							<motion.span
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: 1,
								}}
								exit={{
									opacity: 0,
								}}
								className={cn(
									'absolute top-0 left-0 z-10 w-full pt-2',
									'font-geist-sans font-medium text-foreground',
									'transition-colors group-hover:text-theme',
									active && 'font-extrabold text-theme',
								)}
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
			style={{
				width: lineWidth,
				height: 1.5,
				position: 'relative',
				backgroundColor: 'var(--foreground)',
			}}
		/>
	);
};

export const NavBarSlim = () => {
	const router = useRouter();
	const pathname: string | null = usePathname();
	const isHome: boolean = pathname === '/';

	return (
		<div
			className={cn(
				'flex items-center',
				isHome && 'justify-start',
				!isHome && 'justify-between',
			)}
		>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.4, ease: 'backOut' }}
			>
				<Button
					variant="ghost"
					size="icon"
					className={cn('flex shrink-0 rounded-none', isHome && 'hidden')}
					onClick={() => router.back()}
					aria-labelledby="Retourner à la page précédente"
					aria-label="Retourner à la page précédente"
				>
					<ArrowLeft className="size-10" weight="duotone" />
				</Button>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.4, ease: 'backOut' }}
			>
				<Image
					src={avatar}
					alt={`${env.NEXT_PUBLIC_NAME} ${env.NEXT_PUBLIC_SURNAME}`}
					className="size-10 rounded-full border border-neutral-200 object-cover object-center dark:border-neutral-700"
					priority
				/>
			</motion.div>
		</div>
	);
};
