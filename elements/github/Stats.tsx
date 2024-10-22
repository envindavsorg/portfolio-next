import { githubUser } from '@/actions/github/user.action';
import { ChannelSkeleton } from '@/components/blocs/Channel';
import { PatternCard } from '@/components/ui/PatternCard';
import { cn } from '@/lib/utils';
import {
	CalendarCheck,
	ChartPie,
	GitCommit,
	Trophy,
	UserPlus,
	UsersThree,
} from '@phosphor-icons/react/dist/ssr';
import { unstable_noStore as noStore } from 'next/cache';
import type React from 'react';
import { Suspense } from 'react';
import { Fragment } from 'react';

interface StatsProps {
	className?: string;
}

export const Stats = async ({
	className,
}: StatsProps): Promise<React.JSX.Element> => {
	noStore();
	const { following, followers, commits } = await githubUser(
		process.env.GITHUB_USERNAME!,
	);

	return (
		<div className={cn('grid grid-cols-4 gap-3', className)}>
			<div className="col-span-full min-[530px]:col-span-2">
				<PatternCard
					icon={<GitCommit className="text-theme" weight="duotone" />}
					title={`${commits.thisYear} commit${commits.thisYear > 1 ? 's' : ''}`}
					comment="(sur l'année)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</div>
			<div className="col-span-full min-[530px]:col-span-2">
				<PatternCard
					icon={<CalendarCheck className="text-theme" weight="duotone" />}
					title={`${commits.thisWeek} commit${commits.thisWeek > 1 ? 's' : ''}`}
					comment="(cette semaine)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</div>
			<div className="col-span-full min-[530px]:col-span-2">
				<PatternCard
					icon={<Trophy className="text-theme" weight="duotone" />}
					title={`${commits.bestDay} commit${commits.bestDay > 1 ? 's' : ''}`}
					comment="(en un jour)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</div>
			<div className="col-span-full min-[530px]:col-span-2">
				<PatternCard
					icon={<ChartPie className="text-theme" weight="duotone" />}
					title={`${commits.perDay} commit${commits.perDay > 1 ? 's' : ''}`}
					comment="(en moyenne par jour)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</div>
			<div className="col-span-full min-[530px]:col-span-2">
				<PatternCard
					icon={<UsersThree className="text-theme" weight="duotone" />}
					title={`${followers} abonné${followers > 1 ? 's' : ''}`}
					comment="(sur GitHub)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</div>
			<div className="col-span-full min-[530px]:col-span-2">
				<PatternCard
					icon={<UserPlus className="text-theme" weight="duotone" />}
					title={`${following} suivi${following > 1 ? 's' : ''}`}
					comment="(sur GitHub)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</div>
		</div>
	);
};

interface GitHubStatsProps {
	className?: string;
}

export const GitHubStats = ({
	className,
}: GitHubStatsProps): React.JSX.Element => (
	<Fragment>
		<Suspense
			fallback={
				<div className="mt-6 grid w-full gap-3 sm:grid-cols-2">
					{Array.from({ length: 6 }).map((_, idx: number) => (
						<ChannelSkeleton key={`${idx}-channel-skeleton`} />
					))}
				</div>
			}
		>
			<Stats className={className} />
		</Suspense>
	</Fragment>
);
