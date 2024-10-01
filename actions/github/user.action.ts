'use server';

import { octokit } from '@/db/octokit';
import { query } from '@/graphql/user';
import { logger } from '@/lib/logger';

interface Commits {
	thisYear: number;
	thisWeek: number;
	bestDay: number;
	perDay: number;
}

interface GitHubUser {
	login: string;
	name: string;
	avatar: string;
	followers: number;
	following: number;
	commits: Commits;
}

const { graphql } = octokit;

export const githubUser = async (username: string): Promise<GitHubUser> => {
	if (!username) {
		logger.error('→ username parameter is required !');
		throw new Error('→ GITHUB_USERNAME env variable is not set ...');
	}

	try {
		const { user } = await graphql<Response>(query, {
			username,
		});

		const total =
			user.contributionsCollection.contributionCalendar.totalContributions;
		const weeks = user.contributionsCollection.contributionCalendar.weeks;

		const commits: Commits = {
			thisYear: total,
			thisWeek: weeks[weeks.length - 1].contributionDays.reduce(
				(sum, day) => sum + day.contributionCount,
				0,
			),
			bestDay: Math.max(
				...weeks.flatMap((week) =>
					week.contributionDays.map((day) => day.contributionCount),
				),
			),
			perDay: Math.round(
				total /
					weeks.flatMap((week) =>
						week.contributionDays.map((day) => day.contributionCount),
					).length,
			),
		};
		console.log(commits);

		return {
			login: user.login,
			name: user.name,
			avatar: user.avatarUrl,
			followers: user.followers.totalCount,
			following: user.following.totalCount,
			commits,
		};
	} catch (error) {
		logger.error('→ there is an error fetching GitHub user data: ', error);
		throw new Error('→ failed to fetch GitHub user data ...');
	}
};

interface Response {
	user: {
		login: string;
		name: string;
		avatarUrl: string;
		followers: {
			totalCount: number;
		};
		following: {
			totalCount: number;
		};
		contributionsCollection: {
			contributionCalendar: {
				colors: string[];
				totalContributions: number;
				months: {
					firstDay: string;
					name: string;
					totalWeeks: number;
				}[];
				weeks: {
					contributionDays: {
						color: string;
						contributionCount: number;
						date: string;
					}[];
					firstDay: string;
				}[];
			};
		};
	};
}
