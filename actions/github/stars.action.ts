'use server';

import { octokit } from '@/db/octokit';
import { query } from '@/graphql/stars';
import { logger } from '@/lib/logger';
import type { ProjectStars, ProjectStarsResponse } from '@/types';

const fetchProjectStars = async (
	owner: string,
	project: string,
): Promise<ProjectStars> => {
	const { graphql } = octokit;

	try {
		const { repository } = await graphql<ProjectStarsResponse>(query, {
			owner,
			project,
		});
		return {
			stars: repository.stargazers.totalCount,
		};
	} catch (error) {
		logger.error('Error fetching GitHub project stars data:', error);
		throw new Error('Failed to fetch GitHub project stars');
	}
};

export const projectStars = async (owner: string, project: string) =>
	fetchProjectStars(owner, project);
