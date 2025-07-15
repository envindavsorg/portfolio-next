'use server';

import { octokit } from '@/db/octokit';
import { getCachedData, setCachedData } from '@/lib/cache';
import { logger } from '@/lib/logger';

interface ProjectLanguage {
	name: string;
	size: number;
	percentage: number;
	color?: string;
}

interface ProjectData {
	owner: string;
	name: string;
	description: string | null;
	url: string;
	avatar: string;
	stars: number;
	forks: number;
	watchers: number;
	issues: number;
	pullRequests: number;
	commits: number;
	releases: number;
	languages: ProjectLanguage[];
	topics: string[];
	createdAt: string;
	updatedAt: string;
	pushedAt: string;
	defaultBranch: string;
	isPrivate: boolean;
	isFork: boolean;
	isArchived: boolean;
	license: string | null;
	homepageUrl: string | null;
}

interface UserRepositoriesResponse {
	user: {
		login: string;
		repositories: {
			totalCount: number;
			nodes: {
				name: string;
				description: string | null;
				url: string;
				stargazers: {
					totalCount: number;
				};
				forkCount: number;
				watchers: {
					totalCount: number;
				};
				issues: {
					totalCount: number;
				};
				pullRequests: {
					totalCount: number;
				};
				releases: {
					totalCount: number;
				};
				primaryLanguage: {
					name: string;
				} | null;
				languages: {
					totalSize: number;
					edges: {
						size: number;
						node: {
							name: string;
							color: string | null;
						};
					}[];
				};
				repositoryTopics: {
					nodes: {
						topic: {
							name: string;
						};
					}[];
				};
				createdAt: string;
				updatedAt: string;
				pushedAt: string;
				defaultBranchRef: {
					name: string;
					target: {
						history: {
							totalCount: number;
						};
					};
				} | null;
				isPrivate: boolean;
				isFork: boolean;
				isArchived: boolean;
				licenseInfo: {
					name: string;
				} | null;
				homepageUrl: string | null;
			}[];
		};
	};
}

interface SingleProjectResponse {
	repository: {
		owner: {
			login: string;
			avatarUrl: string;
		};
		name: string;
		description: string | null;
		url: string;
		stargazers: {
			totalCount: number;
		};
		forkCount: number;
		watchers: {
			totalCount: number;
		};
		issues: {
			totalCount: number;
		};
		pullRequests: {
			totalCount: number;
		};
		releases: {
			totalCount: number;
		};
		languages: {
			totalSize: number;
			edges: {
				size: number;
				node: {
					name: string;
					color: string | null;
				};
			}[];
		};
		repositoryTopics: {
			nodes: {
				topic: {
					name: string;
				};
			}[];
		};
		createdAt: string;
		updatedAt: string;
		pushedAt: string;
		defaultBranchRef: {
			name: string;
			target: {
				history: {
					totalCount: number;
				};
			};
		} | null;
		isPrivate: boolean;
		isFork: boolean;
		isArchived: boolean;
		licenseInfo: {
			name: string;
		} | null;
		homepageUrl: string | null;
	};
}

// Legacy interface for backward compatibility
interface ProjectInfo {
	commits: number;
	languages: {
		name: string;
		percentage: number;
	}[];
}

// Enhanced GraphQL query for user repositories
const userRepositoriesQuery = String.raw`
	query userRepositories($username: String!) {
		user(login: $username) {
			login
			repositories(ownerAffiliations: OWNER, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
				totalCount
				nodes {
					name
					description
					url
					stargazers {
						totalCount
					}
					forkCount
					watchers {
						totalCount
					}
					issues {
						totalCount
					}
					pullRequests {
						totalCount
					}
					releases {
						totalCount
					}
					primaryLanguage {
						name
					}
					languages(first: 10) {
						totalSize
						edges {
							size
							node {
								name
								color
							}
						}
					}
					repositoryTopics(first: 10) {
						nodes {
							topic {
								name
							}
						}
					}
					createdAt
					updatedAt
					pushedAt
					defaultBranchRef {
						name
						target {
							... on Commit {
								history(first: 0) {
									totalCount
								}
							}
						}
					}
					isPrivate
					isFork
					isArchived
					licenseInfo {
						name
					}
					homepageUrl
				}
			}
		}
	}
`;

const singleRepositoryQuery = String.raw`
	query singleRepository($owner: String!, $repo: String!) {
		repository(owner: $owner, name: $repo) {
			owner {
				login
				avatarUrl
			}
			name
			description
			url
			stargazers {
				totalCount
			}
			forkCount
			watchers {
				totalCount
			}
			issues {
				totalCount
			}
			pullRequests {
				totalCount
			}
			releases {
				totalCount
			}
			languages(first: 10) {
				totalSize
				edges {
					size
					node {
						name
						color
					}
				}
			}
			repositoryTopics(first: 10) {
				nodes {
					topic {
						name
					}
				}
			}
			createdAt
			updatedAt
			pushedAt
			defaultBranchRef {
				name
				target {
					... on Commit {
						history(first: 0) {
							totalCount
						}
					}
				}
			}
			isPrivate
			isFork
			isArchived
			licenseInfo {
				name
			}
			homepageUrl
		}
	}
`;

// Get comprehensive data for all user repositories
export const getUserRepositories = async (
	username: string = process.env.GITHUB_USERNAME!,
) => {
	const cacheKey = `github-repositories-${username}`;
	const cachedData = getCachedData(cacheKey);

	if (cachedData) {
		logger.info(`→ returning cached GitHub repositories data for ${username}`);
		return cachedData;
	}

	try {
		const { user } = await octokit.graphql<UserRepositoriesResponse>(
			userRepositoriesQuery,
			{
				username,
			},
		);

		const repositories = user.repositories.nodes.map((repo) => {
			const totalSize = repo.languages.totalSize;
			const languages: ProjectLanguage[] = repo.languages.edges.map((edge) => ({
				name: edge.node.name,
				size: edge.size,
				percentage: totalSize > 0 ? (edge.size / totalSize) * 100 : 0,
				color: edge.node.color || undefined,
			}));

			return {
				owner: username,
				name: repo.name,
				description: repo.description,
				url: repo.url,
				avatar: user.login, // Will be filled from user data
				stars: repo.stargazers.totalCount,
				forks: repo.forkCount,
				watchers: repo.watchers.totalCount,
				issues: repo.issues.totalCount,
				pullRequests: repo.pullRequests.totalCount,
				commits: repo.defaultBranchRef?.target.history.totalCount || 0,
				releases: repo.releases.totalCount,
				languages,
				topics: repo.repositoryTopics.nodes.map((topic) => topic.topic.name),
				createdAt: repo.createdAt,
				updatedAt: repo.updatedAt,
				pushedAt: repo.pushedAt,
				defaultBranch: repo.defaultBranchRef?.name || 'main',
				isPrivate: repo.isPrivate,
				isFork: repo.isFork,
				isArchived: repo.isArchived,
				license: repo.licenseInfo?.name || null,
				homepageUrl: repo.homepageUrl,
			};
		});

		const data = {
			totalRepositories: user.repositories.totalCount,
			repositories,
			stats: {
				totalStars: repositories.reduce((sum, repo) => sum + repo.stars, 0),
				totalForks: repositories.reduce((sum, repo) => sum + repo.forks, 0),
				totalCommits: repositories.reduce((sum, repo) => sum + repo.commits, 0),
				mostStarred: repositories.sort((a, b) => b.stars - a.stars)[0] || null,
				languages: repositories
					.flatMap((repo) => repo.languages)
					.reduce((acc, lang) => {
						const existing = acc.find((l) => l.name === lang.name);
						if (existing) {
							existing.size += lang.size;
							existing.percentage = 0; // Will be recalculated
						} else {
							acc.push({ ...lang });
						}
						return acc;
					}, [] as ProjectLanguage[])
					.sort((a, b) => b.size - a.size),
			},
		};

		// Recalculate language percentages
		const totalLanguageSize = data.stats.languages.reduce(
			(sum, lang) => sum + lang.size,
			0,
		);
		data.stats.languages.forEach((lang) => {
			lang.percentage = totalLanguageSize > 0 ? (lang.size / totalLanguageSize) * 100 : 0;
		});

		setCachedData(cacheKey, data); // Cache for default duration
		return data;
	} catch (error) {
		logger.error('Error fetching GitHub repositories data:', error);
		throw new Error('Failed to fetch GitHub repositories data');
	}
};

// Get comprehensive data for a single repository
export const getRepositoryData = async (
	owner: string,
	repo: string,
): Promise<ProjectData> => {
	if (!owner || !repo) {
		logger.error('→ GitHub owner and repository parameters are required!');
		throw new Error('→ GitHub owner and repository parameters are required!');
	}

	const cacheKey = `github-project-${owner}-${repo}`;
	const cachedData = getCachedData(cacheKey);

	if (cachedData) {
		logger.info(`→ returning cached GitHub project data for ${owner}/${repo}`);
		return cachedData as ProjectData;
	}

	try {
		const { repository } = await octokit.graphql<SingleProjectResponse>(
			singleRepositoryQuery,
			{
				owner,
				repo,
			},
		);

		const totalSize = repository.languages.totalSize;
		const languages: ProjectLanguage[] = repository.languages.edges.map((edge) => ({
			name: edge.node.name,
			size: edge.size,
			percentage: totalSize > 0 ? (edge.size / totalSize) * 100 : 0,
			color: edge.node.color || undefined,
		}));

		const data: ProjectData = {
			owner: repository.owner.login,
			name: repository.name,
			description: repository.description,
			url: repository.url,
			avatar: repository.owner.avatarUrl,
			stars: repository.stargazers.totalCount,
			forks: repository.forkCount,
			watchers: repository.watchers.totalCount,
			issues: repository.issues.totalCount,
			pullRequests: repository.pullRequests.totalCount,
			commits: repository.defaultBranchRef?.target.history.totalCount || 0,
			releases: repository.releases.totalCount,
			languages,
			topics: repository.repositoryTopics.nodes.map((topic) => topic.topic.name),
			createdAt: repository.createdAt,
			updatedAt: repository.updatedAt,
			pushedAt: repository.pushedAt,
			defaultBranch: repository.defaultBranchRef?.name || 'main',
			isPrivate: repository.isPrivate,
			isFork: repository.isFork,
			isArchived: repository.isArchived,
			license: repository.licenseInfo?.name || null,
			homepageUrl: repository.homepageUrl,
		};

		setCachedData(cacheKey, data); // Cache for default duration
		return data;
	} catch (error) {
		logger.error('Error fetching GitHub project data:', error);
		throw new Error('Failed to fetch GitHub project data');
	}
};

// Legacy function for backward compatibility
export const projectInfo = async (repository: string): Promise<ProjectInfo> => {
	if (!repository) {
		logger.error('→ GitHub repository parameter is required!');
		throw new Error('→ GitHub repository parameter is required!');
	}

	try {
		const data = await getRepositoryData(process.env.GITHUB_USERNAME!, repository);

		return {
			commits: data.commits,
			languages: data.languages.map((lang) => ({
				name: lang.name,
				percentage: Number(lang.percentage.toFixed(2)),
			})),
		};
	} catch (error) {
		logger.error('→ there is an error fetching GitHub project data:', error);
		throw new Error('→ failed to fetch GitHub project data');
	}
};

// Legacy function for backward compatibility
export const githubProject = getRepositoryData;
