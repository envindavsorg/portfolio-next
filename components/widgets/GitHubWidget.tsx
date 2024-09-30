'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import { dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';
import { memo, useState } from 'react';

interface GitHubWidgetProps {
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

export const GitHubWidget = memo(
	({
		weeks,
		colors,
		login,
		name,
		avatar,
	}: GitHubWidgetProps): React.JSX.Element => {
		const { isMobile } = useMediaQuery();

		const [selectContribution, setSelectContribution] = useState<Contributions>(
			{
				contributionCount: null,
				date: null,
			},
		);

		const numberOfContributions: number = (
			weeks[weeks.length - 1].contributionDays || []
		).reduce((prev, curr) => prev + curr.contributionCount, 0);

		return (
			<div>
				<div className="flex w-full items-center justify-between">
					<div className="flex flex-col">
						<h3 className="font-bold font-geist-sans text-sm sm:text-base">
							@{login}
						</h3>
						<p className="-mt-1 text-xs sm:text-sm">
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
							'size-9 object-cover object-center sm:size-12',
							'rounded-full border-2 border-theme',
						)}
					/>
				</div>

				<div className="flex gap-0.5">
					{weeks
						.slice(isMobile ? -12 : -13)
						.map(({ firstDay, contributionDays }, idx: number) => (
							<div key={`${firstDay}-${idx}`} className="flex flex-col gap-0.5">
								{contributionDays.map(
									({ contributionCount, color, date }, idx: number) => {
										const background: string =
											contributionCount > 0 ? color : '#4B5563';

										return (
											<motion.span
												key={`${date}-${idx}`}
												className="size-3.5 cursor-pointer rounded-xs sm:size-4"
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

				<div className="inline-flex max-w-fit items-center gap-x-2 sm:gap-x-4">
					{selectContribution.contributionCount != null &&
					selectContribution.contributionCount > 0 ? (
						<>
							<span className="font-bold text-theme text-xs">
								{selectContribution.contributionCount} commit
								{selectContribution.contributionCount > 1 ? 's' : ''}
							</span>{' '}
							<span className="font-medium text-xs">
								le {dayjs(selectContribution.date).format('DD MMM')}
							</span>
						</>
					) : (
						<>
							<span className="font-medium text-xs sm:text-sm">Moins</span>
							<ul className="flex gap-0.5">
								<li className="size-2.5 rounded-xs bg-[#4B5563] sm:size-3" />
								{colors.map((item, idx: number) => (
									<li
										key={`${item}-${idx}`}
										className="size-2.5 rounded-xs sm:size-3"
										style={{ backgroundColor: item }}
									/>
								))}
							</ul>
							<span className="font-medium text-xs sm:text-sm">Plus</span>
						</>
					)}
				</div>
			</div>
		);
	},
);
