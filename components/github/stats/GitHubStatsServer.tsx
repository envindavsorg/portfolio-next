import { contributionsGitHub } from '@/actions/github/contributions.action';
import { githubUser } from '@/actions/github/user.action';
import { GitHubStatsClient } from '@/components/github/stats/GitHubStatsClient';
import { unstable_noStore as noStore } from 'next/cache';
import type React from 'react';

export const GitHubStatsServer = async () => {
	noStore();

	// get the number of followers and following on my GitHub account
	const { following, followers } = await githubUser();

	// get the total number of commits and the number of commits per week
	const {
		contributionCalendar: { totalContributions, weeks },
	} = await contributionsGitHub();

	const contributions: number[] = weeks.flatMap((week) =>
		week.contributionDays.map((day) => day.contributionCount),
	);

	const contributionsThisWeek: number = weeks[
		weeks.length - 1
	].contributionDays.reduce((sum, day) => sum + day.contributionCount, 0);

	return (
		<GitHubStatsClient
			followers={followers}
			following={following}
			totalContributions={totalContributions}
			contributions={contributions}
			contributionsThisWeek={contributionsThisWeek}
		/>
	);
};
