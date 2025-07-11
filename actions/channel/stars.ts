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

const FRAMEWORK_REPOSITORIES: RepositoryConfig[] = [
	{ owner: 'vercel', name: 'next.js', displayName: 'Next.js' },
	{ owner: 'facebook', name: 'react', displayName: 'React' },
] as const;

const DESIGN_REPOSITORIES: RepositoryConfig[] = [
	{ owner: 'tailwindlabs', name: 'tailwindcss', displayName: 'Tailwind CSS' },
	{ owner: 'shadcn-ui', name: 'ui', displayName: 'shadcn/ui' },
] as const;

export const channelStarsForFrameworks = async (): Promise<ChannelStarsData[]> => {
	const cacheKey = 'channel-stars-data';
	const cachedData = getCachedData<ChannelStarsData[]>(cacheKey);

	if (cachedData) {
		logger.info('→ returning cached channel stars data');
		return cachedData;
	}

	try {
		const repoPromises = FRAMEWORK_REPOSITORIES.map(async (repo) => {
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
			const config = FRAMEWORK_REPOSITORIES[i];

			if (result) {
				channelData.push({
					avatar: result.avatar,
					name: `@${config.displayName || result.name}`,
					link: `https://github.com/${result.owner}/${result.name}`,
					metric: result.stars,
				});
			}
		}

		// Cache for 1 hour (3600 seconds)
		setCachedData(cacheKey, channelData);

		logger.info(
			`→ successfully fetched ${channelData.length} channel stars data entries`,
		);
		return channelData;
	} catch (error) {
		logger.error('→ error fetching channel stars data:', error);
		return [];
	}
};

export const channelStarsForDesign = async (): Promise<ChannelStarsData[]> => {
	const cacheKey = 'channel-stars-design-data';
	const cachedData = getCachedData<ChannelStarsData[]>(cacheKey);

	if (cachedData) {
		logger.info('→ returning cached channel stars design data');
		return cachedData;
	}

	try {
		const repoPromises = DESIGN_REPOSITORIES.map(async (repo) => {
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
			const config = DESIGN_REPOSITORIES[i];

			if (result) {
				channelData.push({
					avatar: result.avatar,
					name: `@${config.displayName || result.name}`,
					link: `https://github.com/${result.owner}/${result.name}`,
					metric: result.stars,
				});
			}
		}

		// Cache for 1 hour (3600 seconds)
		setCachedData(cacheKey, channelData);

		logger.info(
			`→ successfully fetched ${channelData.length} channel stars design data entries`,
		);
		return channelData;
	} catch (error) {
		logger.error('→ error fetching channel stars design data:', error);
		return [];
	}
};
