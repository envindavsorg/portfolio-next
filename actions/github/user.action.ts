'use server';

import { octokit } from '@/db/octokit';
import { env } from '@/env/server';
import { query } from '@/graphql/user';
import { logger } from '@/lib/logger';
import type { GitHubUser, GitHubUserResponse } from '@/types';

const fetchGitHubUser = async (login: string): Promise<GitHubUser> => {
	const { graphql } = octokit;

	try {
		const { user } = await graphql<GitHubUserResponse>(query, { login });
		return {
			login: user.login,
			name: user.name,
			avatar: user.avatarUrl,
			followers: user.followers.totalCount,
			following: user.following.totalCount,
		};
	} catch (error) {
		logger.error('Error fetching GitHub user data:', error);
		throw new Error('Failed to fetch GitHub user data');
	}
};

export const githubUser = async () => {
	const login: string = env.GITHUB_USERNAME;
	if (!login) {
		throw new Error('GITHUB_USERNAME environment variable is not set');
	}

	return fetchGitHubUser(login);
};
