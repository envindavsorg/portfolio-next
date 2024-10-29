'use server';

import { octokit } from '@/db/octokit';
import { query } from '@/graphql/project';
import { logger } from '@/lib/logger';

interface ProjectInfo {
	commits: number;
	languages: {
		name: string;
		percentage: number;
	}[];
}

interface ProjectInfoResponse {
	repository: {
		ref: {
			target: {
				history: {
					totalCount: number;
				};
			};
		};
		languages: {
			totalSize: number;
			edges: {
				size: number;
				node: {
					name: string;
				};
			}[];
		};
	};
}

export const projectInfo = async (repository: string): Promise<ProjectInfo> => {
	if (!repository) {
		logger.error('→ GitHub repository parameter is required !');
		throw new Error('→ GitHub repository parameter is required ! ...');
	}

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
		} = await octokit.graphql<ProjectInfoResponse>(query, {
			owner: process.env.GITHUB_USERNAME,
			repo: repository,
		});

		return {
			commits: totalCount,
			languages: edges.map(({ size, node: { name } }) => ({
				name,
				percentage: Number(((size / totalSize) * 100).toFixed(2)),
			})),
		};
	} catch (error) {
		logger.error('→ there is an error fetching GitHub project data: ', error);
		throw new Error('→ failed to fetch GitHub project data ...');
	}
};
