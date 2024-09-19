'use server';

import { octokit } from '@/db/octokit';
import { env } from '@/env/server';
import { query } from '@/graphql/contributions';
import { logger } from '@/lib/logger';
import type { ContributionsGitHub, ContributionsGitHubResponse } from '@/types';

const fetchContributionsGitHub = async (
	login: string,
): Promise<ContributionsGitHub> => {
	const { graphql } = octokit;

	try {
		const { user } = await graphql<ContributionsGitHubResponse>(query, {
			login,
		});
		return user.contributionsCollection;
	} catch (error) {
		logger.error('Error fetching GitHub contributions data:', error);
		throw new Error('Failed to fetch GitHub contributions data');
	}
};

export const contributionsGitHub = async () => {
	const login: string = env.GITHUB_USERNAME;
	if (!login) {
		throw new Error('GITHUB_USERNAME environment variable is not set');
	}

	return fetchContributionsGitHub(login);
};
