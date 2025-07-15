'use server';

import type { StaticImageData } from 'next/image';
import { githubUser } from '@/actions/github/user.action';
import { getCachedData, setCachedData } from '@/lib/cache';
import { logger } from '@/lib/logger';

export interface ChannelSubscribersData {
	avatar: string | StaticImageData;
	name: string;
	link: string;
	metric: number;
	icon: string;
}

interface SocialPlatform {
	name: string;
	avatar: string;
	link: string;
	metric: number;
	icon: string;
}

// Configuration for social platforms
const SOCIAL_PLATFORMS: Omit<SocialPlatform, 'metric'>[] = [
	{
		name: 'Florin Cuzeac',
		avatar: '/og-author.png',
		link: 'https://www.linkedin.com/in/cuzeacflorin',
		icon: 'linkedin',
	},
	{
		name: 'Florin Cuzeac',
		avatar: '/og-author.png',
		link: 'https://twitter.com/cuzeacflorin',
		icon: 'twitter',
	},
] as const;

const FALLBACK_DATA: ChannelSubscribersData[] = [
	{
		avatar: 'https://github.com/envindavsorg.png',
		name: '@envindavsorg',
		link: 'https://github.com/envindavsorg',
		metric: 50,
		icon: 'github',
	},
	{
		avatar: '/og-author.png',
		name: 'Florin Cuzeac',
		link: 'https://www.linkedin.com/in/cuzeacflorin',
		metric: 2414,
		icon: 'linkedin',
	},
];

export const channelSubscribers = async (): Promise<ChannelSubscribersData[]> => {
	const cacheKey = 'channel-subscribers-data';
	const cachedData = getCachedData<ChannelSubscribersData[]>(cacheKey);

	if (cachedData) {
		logger.info('→ returning cached channel subscribers data');
		return cachedData;
	}

	try {
		// Fetch GitHub user data with error handling
		let githubData: Awaited<ReturnType<typeof githubUser>> | null = null;

		try {
			githubData = await githubUser();
		} catch (githubError) {
			logger.warn('→ failed to fetch GitHub user data, using fallback:', githubError);
		}

		const subscribersData: ChannelSubscribersData[] = [];

		// Add GitHub data if available
		if (githubData) {
			subscribersData.push({
				avatar: githubData.avatar,
				name: `@${githubData.login}`,
				link: `https://github.com/${githubData.login}`,
				metric: githubData.followers + githubData.following,
				icon: 'github',
			});
		} else {
			// Use fallback GitHub data
			subscribersData.push(FALLBACK_DATA[0]);
		}

		// Add LinkedIn data (with potential for future dynamic fetching)
		subscribersData.push({
			name: SOCIAL_PLATFORMS[0].name,
			avatar: SOCIAL_PLATFORMS[0].avatar,
			link: SOCIAL_PLATFORMS[0].link,
			metric: 2414,
			icon: SOCIAL_PLATFORMS[0].icon,
		});

		// Cache for 2 hours (7200 seconds) since social metrics don't change frequently
		setCachedData(cacheKey, subscribersData);

		logger.info(
			`→ successfully fetched ${subscribersData.length} channel subscribers data entries`,
		);
		return subscribersData;
	} catch (error) {
		logger.error('→ error fetching channel subscribers data:', error);

		// Return fallback data on error and cache it briefly
		setCachedData(cacheKey, FALLBACK_DATA); // Cache for 5 minutes
		return FALLBACK_DATA;
	}
};
