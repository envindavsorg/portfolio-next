'use server';

import { getCachedData, setCachedData } from '@/lib/cache';
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

export const githubUser = async (username: string): Promise<GitHubData> => {
	if (!username) {
		logger.error('→ username parameter is required !');
		throw new Error('→ GITHUB_USERNAME env variable is not set ...');
	}

	const cacheKey = `github-user-${username}`;
	const cachedData = getCachedData<GitHubData>(cacheKey);
	
	if (cachedData) {
		logger.info(`→ returning cached GitHub user data for ${username}`);
		return cachedData;
	}

	try {
		const { user } = await octokit.graphql<{
			user: GitHubResponse;
		}>(query, {
			username,
		});

		const githubData: GitHubData = {
			login: user.login,
			name: user.name,
			avatar: user.avatarUrl,
			followers: user.followers.totalCount,
			following: user.following.totalCount,
			stars: user.repositories.nodes.reduce(
				(totalStars, repo) => totalStars + repo.stargazers.totalCount,
				0,
			),
			commits: {
				thisYear: totalCommitsThisYear(user),
				thisWeek: totalCommitsThisWeek(user),
				bestDay: totalCommitsBestDay(user),
				perDay: totalCommitsPerDay(user),
				all: user.contributionsCollection,
			},
		};

		setCachedData(cacheKey, githubData);
		logger.info(`→ cached GitHub user data for ${username}`);
		
		return githubData;
	} catch (error) {
		logger.error('→ there is an error fetching GitHub user data: ', error);
		throw new Error('→ failed to fetch GitHub user data ...');
	}
};
