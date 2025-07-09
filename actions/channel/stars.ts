'use server';

import type { StaticImageData } from 'next/image';
import { projectStars } from '@/actions/github/stars.action';
import { logger } from '@/lib/logger';

export interface ChannelStarsData {
	avatar: string | StaticImageData;
	name: string;
	link: string;
	metric: number;
}

export const channelStars = async (): Promise<ChannelStarsData[]> => {
	enum Providers {
		NEXT = 'next.js',
		REACT = 'react',
		VERCEL = 'vercel',
		FACEBOOK = 'facebook',
	}

	try {
		const [next, react] = await Promise.all([
			projectStars(Providers.VERCEL, Providers.NEXT),
			projectStars(Providers.FACEBOOK, Providers.REACT),
		]);

		return [
			{
				avatar: next.avatar,
				name: `@${next.name}`,
				link: `https://github.com/${next.owner}/${next.name}`,
				metric: next.stars,
			},
			{
				avatar: react.avatar,
				name: `@${react.name}`,
				link: `https://github.com/${react.owner}/${react.name}`,
				metric: react.stars,
			},
		];
	} catch (error) {
		logger.error('→ there is an error fetching stars channel data: ', error);
		throw new Error('→ failed to fetch stars channel data ...');
	}
};
