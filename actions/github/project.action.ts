'use server';

import { octokit } from '@/db/octokit';
import { env } from '@/env/server';
import { query } from '@/graphql/project';
import { logger } from '@/lib/logger';
import type { ProjectInfo, ProjectInfoResponse } from '@/types';

const fetchProjectInfo = async (
	login: string,
	repo: string,
): Promise<ProjectInfo> => {
	const { graphql } = octokit;

	try {
		const {
			repository: {
				ref: {
					target: {
						history: { totalCount },
					},
				},
				languages: { totalSize, edges },
			},
		} = await graphql<ProjectInfoResponse>(query, {
			owner: login,
			repo,
		});
		return {
			commits: totalCount,
			languages: edges.map(({ size, node: { name } }) => ({
				name,
				percentage: Number(((size / totalSize) * 100).toFixed(2)),
			})),
		};
	} catch (error) {
		logger.error('Error fetching GitHub project data:', error);
		throw new Error('Failed to fetch GitHub project data');
	}
};

export const projectInfo = async (repo: string) => {
	const login: string = env.GITHUB_USERNAME;
	if (!login) {
		throw new Error('GITHUB_USERNAME environment variable is not set');
	}

	return fetchProjectInfo(login, repo);
};
