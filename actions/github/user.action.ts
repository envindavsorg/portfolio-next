'use server';

import { octokit } from '@/db/octokit';
import { query } from '@/graphql/user';
import {
	type GitHubData,
	type GitHubResponse,
	totalCommitsBestDay,
	totalCommitsPerDay,
	totalCommitsThisWeek,
	totalCommitsThisYear,
} from '@/lib/github';
import { logger } from '@/lib/logger';
import { unstable_noStore as noStore } from 'next/cache';

const { graphql } = octokit;

export const githubUser = async (username: string): Promise<GitHubData> => {
	noStore();

	if (!username) {
		logger.error('→ username parameter is required !');
		throw new Error('→ GITHUB_USERNAME env variable is not set ...');
	}

	try {
		const { user } = await graphql<{
			user: GitHubResponse;
		}>(query, {
			username,
		});

		return {
			login: user.login,
			name: user.name,
			avatar: user.avatarUrl,
			followers: user.followers.totalCount,
			following: user.following.totalCount,
			commits: {
				thisYear: totalCommitsThisYear(user),
				thisWeek: totalCommitsThisWeek(user),
				bestDay: totalCommitsBestDay(user),
				perDay: totalCommitsPerDay(user),
				all: user.contributionsCollection,
			},
		};
	} catch (error) {
		logger.error('→ there is an error fetching GitHub user data: ', error);
		throw new Error('→ failed to fetch GitHub user data ...');
	}
};
