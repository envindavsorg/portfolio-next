'use server';

import { getCachedData, setCachedData } from '@/lib/cache';
import { logger } from '@/lib/logger';
import { octokit } from '@/lib/octokit';

interface ProjectStars {
	stars: number;
	owner: string;
	name: string;
	avatar: string;
	url: string;
	description: string | null;
	language: string | null;
	forks: number;
	watchers: number;
	issues: number;
	createdAt: string;
	updatedAt: string;
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
		url: string;
		description: string | null;
		primaryLanguage: {
			name: string;
		} | null;
		forkCount: number;
		watchers: {
			totalCount: number;
		};
		issues: {
			totalCount: number;
		};
		createdAt: string;
		updatedAt: string;
	};
}

interface UserStarsResponse {
	user: {
		login: string;
		starredRepositories: {
			totalCount: number;
			nodes: {
				name: string;
				owner: {
					login: string;
					avatarUrl: string;
				};
				stargazers: {
					totalCount: number;
				};
				url: string;
				description: string | null;
				primaryLanguage: {
					name: string;
				} | null;
			}[];
		};
		repositories: {
			totalCount: number;
			nodes: {
				stargazers: {
					totalCount: number;
				};
			}[];
		};
	};
}

// Enhanced GraphQL query for repository details
const repositoryQuery = String.raw`
	query repositoryStars($owner: String!, $project: String!) {
		repository(owner: $owner, name: $project) {
			stargazers {
				totalCount
			}
			owner {
				login
				avatarUrl
			}
			name
			url
			description
			primaryLanguage {
				name
			}
			forkCount
			watchers {
				totalCount
			}
			issues {
				totalCount
			}
			createdAt
			updatedAt
		}
	}
`;

// Enhanced GraphQL query for user stars and owned repository stars
const userStarsQuery = String.raw`
	query userStars($username: String!) {
		user(login: $username) {
			login
			starredRepositories(first: 100, orderBy: {field: STARRED_AT, direction: DESC}) {
				totalCount
				nodes {
					name
					owner {
						login
						avatarUrl
					}
					stargazers {
						totalCount
					}
					url
					description
					primaryLanguage {
						name
					}
				}
			}
			repositories(ownerAffiliations: OWNER, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
				totalCount
				nodes {
					stargazers {
						totalCount
					}
				}
			}
		}
	}
`;

// Get detailed information about a specific repository
export const getRepositoryStars = async (
	owner: string,
	project: string,
): Promise<ProjectStars> => {
	if (!owner || !project) {
		logger.error('→ GitHub owner and project parameters are required!');
		throw new Error('→ GitHub owner and project parameters are required!');
	}

	const cacheKey = `github-repo-${owner}-${project}`;
	const cachedData = getCachedData(cacheKey);

	if (cachedData) {
		logger.info(`→ returning cached GitHub repository data for ${owner}/${project}`);
		return cachedData as ProjectStars;
	}

	try {
		const { repository } = await octokit.graphql<ProjectStarsResponse>(repositoryQuery, {
			owner,
			project,
		});

		const data: ProjectStars = {
			stars: repository.stargazers.totalCount,
			owner: repository.owner.login,
			name: repository.name,
			avatar: repository.owner.avatarUrl,
			url: repository.url,
			description: repository.description,
			language: repository.primaryLanguage?.name || null,
			forks: repository.forkCount,
			watchers: repository.watchers.totalCount,
			issues: repository.issues.totalCount,
			createdAt: repository.createdAt,
			updatedAt: repository.updatedAt,
		};

		setCachedData(cacheKey, data); // Cache for default duration
		return data;
	} catch (error) {
		logger.error('Error fetching GitHub repository data:', error);
		throw new Error('Failed to fetch GitHub repository data');
	}
};

// Get user's starred repositories and total stars from owned repositories
export const getUserStarsData = async (
	username: string = process.env.GITHUB_USERNAME!,
) => {
	const cacheKey = `github-stars-${username}`;
	const cachedData = getCachedData(cacheKey);

	if (cachedData) {
		logger.info(`→ returning cached GitHub stars data for ${username}`);
		return cachedData;
	}

	try {
		const { user } = await octokit.graphql<UserStarsResponse>(userStarsQuery, {
			username,
		});

		// Calculate total stars from a user's own repositories
		const totalOwnedStars = user.repositories.nodes.reduce(
			(total, repo) => total + repo.stargazers.totalCount,
			0,
		);

		const data = {
			starredRepositories: {
				total: user.starredRepositories.totalCount,
				repos: user.starredRepositories.nodes.map((repo) => ({
					name: repo.name,
					owner: repo.owner.login,
					avatar: repo.owner.avatarUrl,
					stars: repo.stargazers.totalCount,
					url: repo.url,
					description: repo.description,
					language: repo.primaryLanguage?.name || null,
				})),
			},
			ownedRepositories: {
				total: user.repositories.totalCount,
				totalStars: totalOwnedStars,
			},
		};

		setCachedData(cacheKey, data); // Cache for default duration
		return data;
	} catch (error) {
		logger.error('Error fetching GitHub stars data:', error);
		throw new Error('Failed to fetch GitHub stars data');
	}
};

// Legacy function for backward compatibility
export const projectStars = getRepositoryStars;
