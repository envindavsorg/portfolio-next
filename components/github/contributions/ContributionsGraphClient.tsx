'use client';

import { dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { memo, useState } from 'react';

interface ContributionsGraphProps {
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

type Contributions = {
	contributionCount: number | null;
	date: string | null;
};

export const ContributionsGraphClient = memo(
	({
		weeks,
		colors,
		login,
		name,
		avatar,
	}: ContributionsGraphProps): React.JSX.Element => {
		const [selectContribution, setSelectContribution] = useState<Contributions>(
			{
				contributionCount: null,
				date: null,
			},
		);

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
			<>
				<div className="flex flex-col gap-y-4">
					<div className="flex w-full items-center justify-between">
						<div className="flex flex-col">
							<h3 className="font-bold font-geist-sans text-base sm:text-lg">
								@{login}
							</h3>
							<p className="text-xs sm:text-sm">
								<span className="font-bold text-theme">
									{numberOfContributions} commits
								</span>{' '}
								/ sem.
							</p>
						</div>
						<Image
							src={avatar}
							alt={name}
							width={60}
							height={60}
							priority={false}
							quality={100}
							fetchPriority="low"
							loading="lazy"
							className={cn(
								'size-9 object-cover object-center sm:size-11',
								'rounded-full border-2 border-theme',
							)}
						/>
					</div>

					<div
						ref={containerRef}
						className="scrollbar-hide w-full overflow-x-auto"
					>
						<div className="flex w-full min-w-max justify-end gap-0.5">
							{weeks.map(({ firstDay, contributionDays }, idx: number) => (
								<div
									key={`${firstDay}-${idx}`}
									className="flex flex-col gap-0.5"
								>
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
													onMouseEnter={() =>
														setSelectContribution({
															contributionCount,
															date,
														})
													}
													onMouseLeave={() =>
														setSelectContribution({
															contributionCount: null,
															date: null,
														})
													}
												/>
											);
										},
									)}
								</div>
							))}
						</div>
					</div>

					<div className="flex items-center justify-center">
						{selectContribution.contributionCount != null &&
						selectContribution.contributionCount > 0 ? (
							<p className="text-sm sm:text-base">
								<span className="font-bold text-theme">
									{selectContribution.contributionCount} commit
									{selectContribution.contributionCount > 1 ? 's' : ''}
								</span>{' '}
								<span className="font-medium">
									le {dayjs(selectContribution.date).format('DD MMM')}
								</span>
							</p>
						) : (
							<div className="flex items-center gap-x-2 sm:gap-x-4">
								<span className="font-medium text-sm sm:text-base">Moins</span>
								<ul className="flex gap-0.5">
									<li className="size-4 rounded-xs bg-[#4B5563]" />
									{colors.map((item, idx: number) => (
										<li
											key={`${item}-${idx}`}
											className="size-4 rounded-xs"
											style={{ backgroundColor: item }}
										/>
									))}
								</ul>
								<span className="font-medium text-sm sm:text-base">Plus</span>
							</div>
						)}
					</div>
				</div>
				<div className="mt-4 flex items-center space-x-3">
					<svg
						className="size-6 flex-none"
						viewBox="0 0 20 20"
						fill="none"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path
							d="m9.813 9.25.346-5.138a1.276 1.276 0 0 0-2.54-.235L6.75 11.25 5.147 9.327a1.605 1.605 0 0 0-2.388-.085.018.018 0 0 0-.004.019l1.98 4.87a5 5 0 0 0 4.631 3.119h3.885a4 4 0 0 0 4-4v-1a3 3 0 0 0-3-3H9.813Z"
							className="stroke-switch"
						/>
						<path
							d="M3 5s.35-.47 1.25-.828m9.516-.422c2.078.593 3.484 1.5 3.484 1.5"
							className="stroke-theme"
						/>
					</svg>
					<span className="text-sm">
						Vous pouvez scroller de{' '}
						<span className="font-medium text-theme">gauche</span> à{' '}
						<span className="font-medium text-theme">droite</span> pour voir
						toutes mes contributions.
					</span>
				</div>
			</>
		);
	},
);
