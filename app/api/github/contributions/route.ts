import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

const CACHE_DURATION = 6 * 60 * 60;

export const GET = async () => {
	try {
		const token = process.env.GITHUB_TOKEN;
		const username = process.env.GITHUB_USERNAME;

		if (!token || !username) {
			return NextResponse.json(
				{ error: 'GitHub credentials not configured' },
				{ status: 500 },
			);
		}

		const octokit = new Octokit({ auth: token });

		// Get the current year for contributions
		const currentYear = new Date().getFullYear();
		const fromDate = `${currentYear}-01-01T00:00:00Z`;
		const toDate = `${currentYear}-12-31T23:59:59Z`;

		// GraphQL query to get contribution graph data
		const query = `
			query($username: String!, $from: DateTime!, $to: DateTime!) {
				user(login: $username) {
					contributionsCollection(from: $from, to: $to) {
						totalCommitContributions
						totalIssueContributions
						totalPullRequestContributions
						totalPullRequestReviewContributions
						contributionCalendar {
							totalContributions
							weeks {
								contributionDays {
									contributionCount
									date
									contributionLevel
								}
							}
						}
					}
				}
			}
		`;

		const response = await octokit.graphql(query, {
			username,
			from: fromDate,
			to: toDate,
		});

		const contributionsData = (response as any).user.contributionsCollection;

		// Process contribution calendar data
		const weeks = contributionsData.contributionCalendar.weeks;
		const contributionDays = weeks.flatMap((week: any) => week.contributionDays);

		// Calculate weekly contributions for the last 12 weeks
		const last12Weeks = weeks.slice(-12).map((week: any) => {
			const weekTotal = week.contributionDays.reduce(
				(sum: number, day: any) => sum + day.contributionCount,
				0,
			);
			return {
				week: week.contributionDays[0]?.date,
				contributions: weekTotal,
			};
		});

		// Calculate current streak
		let currentStreak = 0;
		const today = new Date();
		for (let i = contributionDays.length - 1; i >= 0; i--) {
			const day = contributionDays[i];
			const dayDate = new Date(day.date);

			// Skip today if no contributions yet
			if (
				dayDate.toDateString() === today.toDateString() &&
				day.contributionCount === 0
			) {
				continue;
			}

			if (day.contributionCount > 0) {
				currentStreak++;
			} else {
				break;
			}
		}

		// Calculate this year's total contributions
		const thisYearTotal = contributionsData.contributionCalendar.totalContributions;

		// Get recent activity (commits from last 30 days)
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const recentActivity = contributionDays
			.filter((day: any) => new Date(day.date) >= thirtyDaysAgo)
			.reduce((sum: number, day: any) => sum + day.contributionCount, 0);

		const contributions = {
			thisYear: {
				total: thisYearTotal,
				commits: contributionsData.totalCommitContributions,
				issues: contributionsData.totalIssueContributions,
				pullRequests: contributionsData.totalPullRequestContributions,
				pullRequestReviews: contributionsData.totalPullRequestReviewContributions,
			},
			currentStreak,
			last12Weeks,
			recentActivity,
			lastUpdated: new Date().toISOString(),
		};

		return NextResponse.json(contributions, {
			headers: {
				'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
			},
		});
	} catch (error) {
		console.error('Error fetching GitHub contributions:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch GitHub contributions' },
			{ status: 500 },
		);
	}
};
