'use server';

import { logger } from '@/lib/logger';
import { unstable_noStore as noStore } from 'next/cache';

const headers = {
	'Content-Type': 'application/json',
	Authorization: `token ${process.env.GOGS_TOKEN}`,
};

export const gogsStats = async (url: string): Promise<Response[]> => {
	noStore();

	if (!url) {
		logger.error('→ url parameter is required !');
		throw new Error('→ GOGS_URL env variable is not set ...');
	}

	try {
		const response: Response = await fetch(url, {
			headers,
			cache: 'no-cache',
		});

		return response.json();
	} catch (error) {
		logger.error('→ there is an error fetching GOGS stats: ', error);
		throw new Error('→ failed to fetch GOGS stats ...');
	}
};
