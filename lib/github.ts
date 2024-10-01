export interface GitHubCollection {
	contributionCalendar: {
		colors: string[];
		totalContributions: number;
		months: {
			firstDay: string;
			name: string;
			totalWeeks: number;
		}[];
		weeks: {
			contributionDays: {
				color: string;
				contributionCount: number;
				date: string;
			}[];
			firstDay: string;
		}[];
	};
}

export interface GitHubCommits {
	thisYear: number;
	thisWeek: number;
	bestDay: number;
	perDay: number;
	all: GitHubCollection;
}

export interface GitHubData {
	login: string;
	name: string;
	avatar: string;
	followers: number;
	following: number;
	commits: GitHubCommits;
}

export interface GitHubResponse {
	login: string;
	name: string;
	avatarUrl: string;
	followers: {
		totalCount: number;
	};
	following: {
		totalCount: number;
	};
	contributionsCollection: GitHubCollection;
}

export const totalCommitsThisYear = (data: GitHubResponse): number =>
	data.contributionsCollection.contributionCalendar.totalContributions;

export const totalCommitsThisWeek = (data: GitHubResponse): number => {
	const weeks = data.contributionsCollection.contributionCalendar.weeks;
	return weeks[weeks.length - 1].contributionDays.reduce(
		(sum, day) => sum + day.contributionCount,
		0,
	);
};

export const totalCommitsBestDay = (data: GitHubResponse): number => {
	const weeks = data.contributionsCollection.contributionCalendar.weeks;
	return Math.max(
		...weeks.flatMap((week) =>
			week.contributionDays.map((day) => day.contributionCount),
		),
	);
};

export const totalCommitsPerDay = (data: GitHubResponse): number => {
	const weeks = data.contributionsCollection.contributionCalendar.weeks;
	return Math.round(
		totalCommitsThisYear(data) /
			weeks.flatMap((week) =>
				week.contributionDays.map((day) => day.contributionCount),
			).length,
	);
};
