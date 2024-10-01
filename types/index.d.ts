// router
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
export type { AppRouterInstance };

// battery levels
type BatteryLevels = {
	'70-100': string;
	'20-70': string;
	'0-20': string;
};

type BatteryConditions = {
	limit: number;
	color: string;
};
export type { BatteryLevels, BatteryConditions };

// blog
type Metadata = {
	title: string;
	publishedAt: string;
	summary: string;
	author: string;
	image?: string;
};

interface Post {
	readingTime: string;
	metadata: { [p: string]: any };
	source: string;
	slug: string;
}

interface Posts {
	metadata: Metadata;
	slug: string;
	content: string;
	readingTime: string;
}

interface MDX {
	metadata: Metadata;
	content: string;
}

export type { Metadata, Post, Posts, MDX };

// fetch all GitHub contributions for the last year
interface ContributionsGitHub {
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

export type WeeksWithContributionCounts = Pick<
	ContributionsGitHub['contributionCalendar'],
	'weeks'
>;
export type ContributionDays =
	WeeksWithContributionCounts['weeks'][number]['contributionDays'][number];

interface ContributionsGitHubResponse {
	user: {
		contributionsCollection: {
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
		};
	};
}

export type { ContributionsGitHub, ContributionsGitHubResponse };

// fetch starred repositories on GitHub
interface StarredRepos {
	repos: {
		id: string;
		name: string;
		stargazerCount: number;
		owner: string;
		starredAt: string;
		avatar: string;
	}[];
	total: number;
}

interface StarredReposResponse {
	user: {
		starredRepositories: {
			totalCount: number;
			edges: {
				starredAt: string;
				node: {
					id: string;
					name: string;
					stargazerCount: number;
					owner: {
						login: string;
						avatarUrl: string;
					};
				};
			}[];
		};
	};
}

export type { StarredRepos, StarredReposResponse };

// fetch followed people on GitHub
interface FollowedPeople {
	people: {
		login: string;
		name: string;
		avatar: string;
		followers: number;
	}[];
	total: number;
}

interface FollowedPeopleResponse {
	user: {
		following: {
			totalCount: number;
			edges: {
				node: {
					id: string;
					login: string;
					name: string;
					avatarUrl: string;
					followers: {
						totalCount: number;
					};
				};
			}[];
		};
	};
}

export type { FollowedPeople, FollowedPeopleResponse };

// fetch data about a specific GitHub repository
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

export type { ProjectInfo, ProjectInfoResponse };

// fetch number of stars for a specific GitHub project
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

export type { ProjectStars, ProjectStarsResponse };

// fetch Wakatime data / stats
interface WakatimeRange {
	date: string;
}

interface WakatimeGrandTotal {
	hours: number;
}

interface WakatimeData {
	range: WakatimeRange;
	grand_total: WakatimeGrandTotal;
}

export type { WakatimeRange, WakatimeGrandTotal, WakatimeData };

// fetch blog views count
interface ViewsCount {
	slug: string;
	count: number;
}

export type { ViewsCount };

// fetch LinkedIn data
interface LinkedInData {
	name: string;
	id: string;
	avatar: string;
	followers: number;
}

export type { LinkedInData };

// Dynamic Island
export type DynamicIslandSize =
	| 'compact'
	| 'minimalLeading'
	| 'minimalTrailing'
	| 'default'
	| 'large'
	| 'long'
	| 'ultra';

export type DynamicIslandState = {
	size: DynamicIslandSize;
	imageUrl: string;
	title: string;
	description: string;
};
