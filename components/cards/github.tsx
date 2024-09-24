'use client';

import type { getGithubContributions } from '@/app/actions';
import { contributionsColorMap } from '@/components/cards/constants';
import { defaultVariantsNoDelay } from '@/components/motion/variants';
import { cn } from '@/lib/utils';
import { GithubLogo } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface GithubStatItemProps {
	label: string;
	value: number;
}

const GitHubStatItem = ({ label, value }: GithubStatItemProps) => (
	<div className="col-span-1 flex flex-col items-start">
		<p className="font-bold text-black text-lg dark:text-white">{value}</p>
		<p className="text-neutral-500 text-xs dark:text-neutral-400">{label}</p>
	</div>
);

interface ContributionsGraphProps {
	contributions: Awaited<ReturnType<typeof getGithubContributions>>;
}

const ContributionsGraph = ({ contributions }: ContributionsGraphProps) => (
	<ul className="absolute inset-y-0 right-0 z-0 flex max-h-full gap-1 overflow-hidden opacity-50">
		<div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/50 to-neutral-50/50 dark:from-neutral-950/95 dark:via-neutral-950/65 dark:to-transparent" />
		{contributions.latestContributions.map((week, weekIndex) => {
			if (week.contributionDays.length < 7) {
				// missing contributions days
				const days = week.contributionDays.length;
				const missingDays = 7 - days;
				for (let i = 0; i < missingDays; i++) {
					week.contributionDays.push({
						color: '',
						contributionCount: 0,
						date: '',
					});
				}
			}

			return (
				<li
					key={`contributions-week-${weekIndex}`}
					className="flex aspect-[1/8] size-full flex-col gap-1"
				>
					{week.contributionDays.map((day, idx) => {
						return (
							<div
								key={`contribution-week-${weekIndex}-day-${day.date}-${idx}`}
								className={cn(
									'flex aspect-square rounded-[3px]',
									contributionsColorMap[day.color],
								)}
							/>
						);
					})}
				</li>
			);
		})}
	</ul>
);

interface GitHubStatsCardProps {
	followers: number;
	stars: number;
	contributions: Awaited<ReturnType<typeof getGithubContributions>>;
}

export const GitHubStatsCard = ({
	followers,
	stars,
	contributions,
}: GitHubStatsCardProps) => {
	const MotionLink = motion.create(Link);

	return (
		<MotionLink
			href="https://github.com/olivercederborg"
			target="_blank"
			variants={defaultVariantsNoDelay}
			whileHover={{
				scale: 1.05,
			}}
			className="relative col-span-4 row-span-2 overflow-hidden rounded-md border border-border bg-white p-4 md:col-span-3 md:col-start-3 md:row-span-2 md:row-start-1 dark:bg-neutral-900"
		>
			<div className="relative z-10 flex h-full flex-col justify-between gap-2">
				<div className="flex items-center gap-x-2">
					<GithubLogo className="size-6 shrink-0" weight="regular" />
					<h2 className="font-semibold text-lg">Mes stats</h2>
				</div>

				<div className="flex flex-wrap items-end gap-4">
					<GitHubStatItem label="Abonnés" value={followers} />
					<GitHubStatItem label="Étoiles" value={stars} />
					<GitHubStatItem
						label="Commits"
						value={contributions.totalContributions}
					/>
				</div>
			</div>

			<ContributionsGraph contributions={contributions} />
		</MotionLink>
	);
};
