'use client';

import { Alert, AlertDescription } from '@/components/ui/Alert';
import { dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { GitDiff, GithubLogo } from '@phosphor-icons/react/dist/ssr';
import { type Variants, motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';
import { Fragment, memo, useEffect, useRef, useState } from 'react';

type Contribution = {
	contributionCount: number | null;
	date: string | null;
};

interface ContributionsProps {
	weeks: {
		contributionDays: {
			color: string;
			contributionCount: number;
			date: string;
		}[];
		firstDay: string;
	}[];
	colors: string[];
	login: string;
	name: string;
	avatar: string;
	className?: string;
}

export const FADE_UP_ANIMATION_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
		y: 10,
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
		},
	},
};

export const FADE_DOWN_ANIMATION_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
		y: -10,
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
		},
	},
};

export const Contributions = memo(
	({
		weeks,
		colors,
		login,
		name,
		avatar,
		className,
	}: ContributionsProps): React.JSX.Element => {
		const [selectContribution, setSelectContribution] = useState<Contribution>({
			contributionCount: null,
			date: null,
		});
		const [isVisible, setIsVisible] = useState(false);

		const handleContributionClick = (
			contributionCount: number,
			date: string,
		) => {
			if (
				selectContribution.contributionCount === contributionCount &&
				selectContribution.date === date
			) {
				setIsVisible(false);
				setTimeout(() => {
					setSelectContribution({ contributionCount: null, date: null });
				}, 300);
			} else {
				setSelectContribution({ contributionCount, date });
				setIsVisible(true);
			}
		};

		const numberOfContributions: number = (
			weeks[weeks.length - 1].contributionDays || []
		).reduce((prev, curr) => prev + curr.contributionCount, 0);

		const containerRef = useRef<HTMLDivElement>(null);

		useEffect(() => {
			if (containerRef.current) {
				containerRef.current.scrollLeft = containerRef.current.scrollWidth;
			}
		}, [weeks]);

		return (
			<Fragment>
				<div
					className={cn('flex w-full items-center justify-between', className)}
				>
					<div className="flex items-center gap-x-3">
						<Image
							src={avatar}
							alt={name}
							width={60}
							height={60}
							priority={false}
							quality={100}
							fetchPriority="low"
							loading="lazy"
							className="size-10 rounded-full border-2 border-theme object-cover object-center sm:size-12"
						/>
						<div className="flex flex-col">
							<h3 className="font-bold font-geist-sans text-lg sm:text-xl">
								@{login}
							</h3>
							<p className="text-xs sm:text-sm">
								<span className="font-bold text-theme">
									{numberOfContributions} commits
								</span>{' '}
								/ sem.
							</p>
						</div>
					</div>
					<GithubLogo className="size-8" weight="duotone" />
				</div>

				<div
					ref={containerRef}
					className="scrollbar-hide mt-6 w-full overflow-x-auto"
				>
					<div className="flex w-full min-w-max justify-end gap-0.5">
						{weeks.map(({ firstDay, contributionDays }, idx: number) => (
							<div key={`${firstDay}-${idx}`} className="flex flex-col gap-0.5">
								{contributionDays.map(
									({ contributionCount, color, date }, idx: number) => {
										const background: string =
											contributionCount > 0 ? color : '#4B5563';

										return (
											<motion.span
												key={`${date}-${idx}`}
												className="size-4 cursor-pointer rounded-xs"
												style={background ? { background } : undefined}
												whileHover={{
													scale: 1.1,
												}}
												onClick={() =>
													handleContributionClick(contributionCount, date)
												}
											/>
										);
									},
								)}
							</div>
						))}
					</div>
				</div>

				<div className="mt-3 flex w-full items-center justify-end">
					<div className="flex items-center gap-x-2 sm:gap-x-4">
						<span className="font-medium text-sm">Moins</span>
						<div className="flex gap-0.5">
							<span className="size-2 rounded-xs bg-[#4B5563]" />
							{colors.map((item, idx: number) => (
								<span
									key={`${item}-${idx}`}
									className="size-2 rounded-xs"
									style={{ backgroundColor: item }}
								/>
							))}
						</div>
						<span className="font-medium text-sm">Plus</span>
					</div>
				</div>

				<HowToScroll className="mt-3">
					<p>
						Vous pouvez scroller de{' '}
						<span className="font-medium text-theme">gauche</span> à{' '}
						<span className="font-medium text-theme">droite</span> pour voir
						toutes les contributions que j'ai faites sur GitHub au cours de
						l'année. Vous pouvez cliquer sur un commit pour voir le nombre de
						commits effectués en un jour.
					</p>
				</HowToScroll>

				{selectContribution.contributionCount != null && (
					<motion.div
						initial="hidden"
						animate="show"
						viewport={{ once: true }}
						variants={{
							hidden: {},
							show: {
								transition: {
									staggerChildren: 0.15,
								},
							},
						}}
					>
						<motion.div
							className="mt-6"
							variants={
								isVisible
									? FADE_UP_ANIMATION_VARIANTS
									: FADE_DOWN_ANIMATION_VARIANTS
							}
						>
							<Alert>
								<AlertDescription className="flex items-center gap-3">
									<GitDiff className="size-6 shrink-0 text-theme" />{' '}
									<span className="text-sm">
										Le{' '}
										<span className="font-bold">
											{dayjs(selectContribution.date).format(
												'dddd DD MMM YYYY',
											)}
										</span>
										, j'ai effectué en tout{' '}
										<span className="font-bold text-theme">
											{selectContribution.contributionCount} commit
											{selectContribution.contributionCount > 1 ? 's' : ''}
										</span>
										.
									</span>
								</AlertDescription>
							</Alert>
						</motion.div>
					</motion.div>
				)}
			</Fragment>
		);
	},
);

interface HowToScrollProps {
	className?: string;
	children: React.ReactNode;
}

const HowToScroll = ({
	className,
	children,
}: HowToScrollProps): React.JSX.Element => (
	<div className={cn('flex items-center space-x-3 text-xs', className)}>
		<svg
			className="size-6 flex-none"
			viewBox="0 0 20 20"
			fill="none"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path
				d="m9.813 9.25.346-5.138a1.276 1.276 0 0 0-2.54-.235L6.75 11.25 5.147 9.327a1.605 1.605 0 0 0-2.388-.085.018.018 0 0 0-.004.019l1.98 4.87a5 5 0 0 0 4.631 3.119h3.885a4 4 0 0 0 4-4v-1a3 3 0 0 0-3-3H9.813Z"
				className="stroke-foreground"
			/>
			<path
				d="M3 5s.35-.47 1.25-.828m9.516-.422c2.078.593 3.484 1.5 3.484 1.5"
				className="stroke-theme"
			/>
		</svg>
		{children}
	</div>
);
