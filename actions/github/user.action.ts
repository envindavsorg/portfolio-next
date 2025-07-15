'use server';

import { getCachedData, setCachedData } from '@/lib/cache';
import { logger } from '@/lib/logger';
import { octokit } from '@/lib/octokit';

const { GITHUB_USERNAME } = process.env;

export const githubUser = async (): Promise<any> => {
	const cacheKey = `github-user-${GITHUB_USERNAME}`;
	const cachedData = getCachedData(cacheKey);

	if (cachedData) {
		logger.info(`→ returning cached GitHub user data for ${GITHUB_USERNAME}`);
		return cachedData;
	}

	const gql = String.raw;

	try {
		const { user } = await octokit.graphql<{
			user: {
				login: string;
				name: string;
				avatarUrl: string;
				followers: {
					totalCount: number;
				};
				following: {
					totalCount: number;
				};
				contributionsCollection: {
					contributionCalendar: {
						totalContributions: number;
						weeks: {
							contributionDays: {
								color: string;
								contributionCount: number;
								date: string;
							}[];
						}[];
					};
				};
				repositories: {
					totalCount: number;
					nodes: {
						stargazers: { totalCount: number };
					}[];
					pageInfo: {
						hasNextPage: boolean;
						endCursor: string | null;
					};
				};
			};
		}>(
			gql`
			query ($username: String!) {
				user(login: $username) {
					login
					name
					avatarUrl
					followers {
						totalCount
					}
					following {
						totalCount
					}
					contributionsCollection {
						contributionCalendar {
					        totalContributions
		                    weeks {
		                        contributionDays {
		                            color
		                            contributionCount
		                            date
		                        }
		                    }
				        }
					}
					repositories(ownerAffiliations: OWNER, first: 100) {
		                totalCount
		                nodes {
		                    stargazers {
		                        totalCount
		                    }
		                }
		                pageInfo {
		                    hasNextPage
		                    endCursor
		                }
		            }
				}
			}
		`,
			{ username: GITHUB_USERNAME },
		);

		const weeklyContributions = user.contributionsCollection.contributionCalendar.weeks;

		// find the day with the highest contribution count.
		let maxContributionDay = { contributionCount: 0, date: '', color: '' };

		for (const week of weeklyContributions) {
			for (const day of week.contributionDays) {
				if (day.contributionCount > maxContributionDay.contributionCount) {
					maxContributionDay = day;
				}
			}
		}
		const latestContributions = weeklyContributions.slice(-16);
		const totalContributions =
			user.contributionsCollection.contributionCalendar.totalContributions;

		// Extract colors from the contribution calendar
		const colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

		const data = {
			login: user.login,
			name: user.name,
			avatar: user.avatarUrl,
			followers: user.followers.totalCount,
			following: user.following.totalCount,
			stars: user.repositories.nodes.reduce(
				(totalStars, repo) => totalStars + repo.stargazers.totalCount,
				0,
			),
			contributions: {
				totalContributions,
				latestContributions,
				maxContributionDay,
			},
			// For backward compatibility with existing components
			commits: {
				all: {
					contributionCalendar: {
						weeks: weeklyContributions,
						colors,
					},
				},
			},
		};

		setCachedData(cacheKey, data);
		return data;
	} catch (error) {
		logger.error('→ there is an error fetching GitHub user data: ', error);
		throw new Error('→ failed to fetch GitHub user data ...');
	}
};
