'use client';

import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { memo } from 'react';
import type { getGithubContributions } from '@/app/actions';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { cn } from '@/lib/utils';

interface GitHubStatsCardProps {
	followers: number;
	stars: number;
	contributions: Awaited<ReturnType<typeof getGithubContributions>>;
	position: string;
}

export const GithubStatsCard = memo(
	({ followers, stars, contributions, position }: GitHubStatsCardProps) => {
		const MotionLink = motion.create(Link);
		return (
			<MotionLink
				href="https://github.com/envindavsorg"
				target="_blank"
				title="Mon profil GitHub - Cuzeac Florin"
				variants={defaultVariantsNoDelay}
				whileHover={{ scale: 1.05 }}
				className={cn(
					position,
					'relative isolate overflow-hidden rounded-xl bg-white/20 p-4 ring-1 ring-black/5 dark:bg-white/10',
					'border border-neutral-200/50 dark:border-neutral-700/50',
				)}
			>
				<div className="relative z-10 flex h-full flex-col justify-between gap-2">
					<div className="flex items-center gap-2">
						<GithubLogoIcon weight="duotone" className="size-4" />
						<h2 className="font-medium text-sm">Mes statistiques GitHub</h2>
					</div>

					<div className="flex flex-wrap items-end gap-4">
						<GithubStatItem label="Followers" value={followers} />
						<GithubStatItem label="Stars" value={stars} />
						<GithubStatItem
							label="Contributions"
							value={contributions.totalContributions}
						/>
					</div>
				</div>

				<ContributionsGraph contributions={contributions} />
			</MotionLink>
		);
	},
);

const GithubStatItem = ({ label, value }: { label: string; value: number }) => (
	<div className="col-span-1 flex flex-col items-start">
		<p className="font-semibold text-lg text-neutral-700 dark:text-white">{value}</p>
		<p className="text-neutral-500 text-xs dark:text-neutral-400">{label}</p>
	</div>
);

const contributionsColorMap: Record<string, string> = {
	'#ebedf0': 'bg-[#ebedf0] dark:bg-[#262626]',
	'#9be9a8': 'bg-[#9be9a8] dark:bg-[#0e4429]',
	'#40c463': 'bg-[#40c463] dark:bg-[#006d32]',
	'#30a14e': 'bg-[#30a14e] dark:bg-[#26a641]',
	'#216e39': 'bg-[#216e39] dark:bg-[#39d353]',
};

const ContributionsGraph = ({
	contributions,
}: {
	contributions: Awaited<ReturnType<typeof getGithubContributions>>;
}) => {
	const daysFlat = contributions.latestContributions.flatMap((week) => {
		const days = [...week.contributionDays];
		for (let i = days.length; i < 7; i++) {
			days.push({ color: '', contributionCount: 0, date: '' });
		}
		return days;
	});

	return (
		<div className="absolute inset-0 z-0 grid grid-flow-col grid-rows-7 gap-1 p-0 opacity-50">
			<div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/50 to-neutral-50/50 dark:from-neutral-950/95 dark:via-neutral-950/65 dark:to-transparent" />
			{daysFlat.map((day, idx) => (
				<div
					key={`day-${idx}-${day.date}`}
					className={cn('aspect-square rounded-[3px]', contributionsColorMap[day.color])}
				/>
			))}
		</div>
	);
};
