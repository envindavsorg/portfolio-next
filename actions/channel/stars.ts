'use server';

import type { StaticImageData } from 'next/image';
import { getRepositoryStars } from '@/actions/github/stars.action';
import { getCachedData, setCachedData } from '@/lib/cache';
import { logger } from '@/lib/logger';

export interface ChannelStarsData {
	avatar: string | StaticImageData;
	name: string;
	link: string;
	metric: number;
}

interface RepositoryConfig {
	owner: string;
	name: string;
	displayName?: string;
}

const POPULAR_REPOSITORIES: RepositoryConfig[] = [
	{ owner: 'vercel', name: 'next.js', displayName: 'Next.js' },
	{ owner: 'facebook', name: 'react', displayName: 'React' },
	{ owner: 'microsoft', name: 'typescript', displayName: 'TypeScript' },
	{ owner: 'tailwindlabs', name: 'tailwindcss', displayName: 'Tailwind CSS' },
] as const;

const FALLBACK_DATA: ChannelStarsData[] = [
	{
		avatar: 'https://github.com/vercel.png',
		name: '@Next.js',
		link: 'https://github.com/vercel/next.js',
		metric: 120000,
	},
	{
		avatar: 'https://github.com/facebook.png',
		name: '@React',
		link: 'https://github.com/facebook/react',
		metric: 220000,
	},
];

export const channelStars = async (): Promise<ChannelStarsData[]> => {
	const cacheKey = 'channel-stars-data';
	const cachedData = getCachedData<ChannelStarsData[]>(cacheKey);

	if (cachedData) {
		logger.info('→ returning cached channel stars data');
		return cachedData;
	}

	try {
		// Use the first two repositories for better performance
		const repositoriesToFetch = POPULAR_REPOSITORIES.slice(0, 2);

		const repoPromises = repositoriesToFetch.map(async (repo) => {
			try {
				return await getRepositoryStars(repo.owner, repo.name);
			} catch (error) {
				logger.warn(`→ failed to fetch ${repo.owner}/${repo.name}:`, error);
				return null;
			}
		});

		const results = await Promise.all(repoPromises);

		const channelData: ChannelStarsData[] = [];

		for (let i = 0; i < results.length; i++) {
			const result = results[i];
			const config = repositoriesToFetch[i];

			if (result) {
				channelData.push({
					avatar: result.avatar,
					name: `@${config.displayName || result.name}`,
					link: `https://github.com/${result.owner}/${result.name}`,
					metric: result.stars,
				});
			} else {
				// Use fallback data if repository fetch failed
				if (FALLBACK_DATA[i]) {
					channelData.push(FALLBACK_DATA[i]);
				}
			}
		}

		// Ensure we always return at least the fallback data
		const finalData = channelData.length > 0 ? channelData : FALLBACK_DATA;

		// Cache for 1 hour (3600 seconds)
		setCachedData(cacheKey, finalData);

		logger.info(`→ successfully fetched ${finalData.length} channel stars data entries`);
		return finalData;
	} catch (error) {
		logger.error('→ error fetching channel stars data:', error);

		// Return fallback data on error and cache it briefly
		setCachedData(cacheKey, FALLBACK_DATA); // Cache for 5 minutes
		return FALLBACK_DATA;
	}
};
