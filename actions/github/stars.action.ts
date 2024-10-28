'use server';

import { octokit } from '@/db/octokit';
import { query } from '@/graphql/stars';
import { logger } from '@/lib/logger';
import { unstable_cacheLife as cacheLife } from 'next/cache';

interface ProjectStars {
	stars: number;
	owner: string;
	name: string;
	avatar: string;
}

interface ProjectStarsResponse {
	repository: {
		stargazers: {
			totalCount: number;
		};
		owner: {
			login: string;
			avatarUrl: string;
		};
		name: string;
	};
}

export const projectStars = async (
	owner: string,
	project: string,
): Promise<ProjectStars> => {
	'use cache';
	cacheLife('hours');

	if (!owner || !project) {
		logger.error('→ GitHub owner and project parameters are required !');
		throw new Error('→ GitHub owner and project parameters are required ! ...');
	}

	try {
		const { repository } = await octokit.graphql<ProjectStarsResponse>(query, {
			owner,
			project,
		});

		return {
			stars: repository.stargazers.totalCount,
			owner: repository.owner.login,
			name: repository.name,
			avatar: repository.owner.avatarUrl,
		};
	} catch (error) {
		logger.error('Error fetching GitHub project stars data:', error);
		throw new Error('Failed to fetch GitHub project stars');
	}
};
