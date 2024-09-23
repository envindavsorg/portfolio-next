import { contributionsGitHub } from '@/actions/github/contributions.action';
import { githubUser } from '@/actions/github/user.action';
import { Motion } from '@/components/motion';
import { defaultVariants } from '@/components/motion.variants';
import { Card } from '@/components/ui/Card';
import {
	CalendarCheck,
	ChartPie,
	GitCommit,
	Trophy,
	UserPlus,
	UsersThree,
} from '@phosphor-icons/react/dist/ssr';
import type React from 'react';

export const GitHubStatsOverall = async () => {
	// get GitHub profile data
	const { following, followers } = await githubUser();
	// get GitHub contributions data
	const {
		contributionCalendar: { totalContributions, weeks },
	} = await contributionsGitHub();
	const contributions: number[] = weeks.flatMap((week) =>
		week.contributionDays.map(
			(contributionDay) => contributionDay.contributionCount,
		),
	);

	return (
		<Motion className="flex flex-col" asChild variants={defaultVariants}>
			<div className="grid gap-3 sm:grid-cols-2">
				<Card
					tag="static"
					icon={<GitCommit className="text-theme" weight="duotone" />}
					title={`${totalContributions} commits`}
					comment="(sur l'année)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
				<Card
					tag="static"
					icon={<CalendarCheck className="text-theme" weight="duotone" />}
					title={`${weeks[weeks.length - 1].contributionDays.reduce(
						(prev, curr) => prev + curr.contributionCount,
						0,
					)} commits`}
					comment="(cette semaine)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
				<Card
					tag="static"
					icon={<Trophy className="text-theme" weight="duotone" />}
					title={`${Math.max(...contributions)} commits`}
					comment="(en un jour)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
				<Card
					tag="static"
					icon={<ChartPie className="text-theme" weight="duotone" />}
					title={`${Math.round(totalContributions / contributions.length)} commits`}
					comment="(en moyenne par jour)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
				<Card
					tag="static"
					icon={<UsersThree className="text-theme" weight="duotone" />}
					title={`${followers} abonnés`}
					comment="(sur GitHub)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
				<Card
					tag="static"
					icon={<UserPlus className="text-theme" weight="duotone" />}
					title={`${following} abonnements`}
					comment="(sur GitHub)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</div>
		</Motion>
	);
};
