'use server';

import { logger } from '@/lib/logger';
import { unstable_cacheLife as cacheLife } from 'next/cache';

const headers = {
	'Content-Type': 'application/json',
	Authorization: `Basic ${process.env.WAKATIME_API_KEY}`,
};

export const wakatimeStats = async (url: string) => {
	'use cache';
	cacheLife('hours');

	if (!url) {
		logger.error('→ url parameter is required !');
		throw new Error('→ WAKATIME_DATA_URL env variable is not set ...');
	}

	try {
		const response: Response = await fetch(url, {
			headers,
			cache: 'no-cache',
		});

		return response.json();
	} catch (error) {
		logger.error('→ there is an error fetching Wakatime data: ', error);
		throw new Error('→ failed to fetch Wakatime data ...');
	}
};
