import { githubUser } from '@/actions/github/user.action';
import { GitHubStatsClient } from '@/components/github/stats/GitHubStatsClient';
import { env } from '@/env/server';
import { unstable_noStore as noStore } from 'next/cache';
import type React from 'react';

export const GitHubStatsServer = async () => {
	noStore();

	const { following, followers, commits } = await githubUser(
		env.GITHUB_USERNAME,
	);

	return (
		<GitHubStatsClient
			followers={followers}
			following={following}
			thisYear={commits.thisYear}
			thisWeek={commits.thisWeek}
			bestDay={commits.bestDay}
			perDay={commits.perDay}
		/>
	);
};
