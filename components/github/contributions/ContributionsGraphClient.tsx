'use client';

import { HowToScroll } from '@/components/blocs/HowToScroll';
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

				<HowToScroll className="mt-4" />
			</>
		);
	},
);
