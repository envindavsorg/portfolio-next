'use server';

import { env } from '@/env/server';
import { logger } from '@/lib/logger';

const headers = {
	'Content-Type': 'application/json',
	Authorization: `Basic ${env.WAKATIME_API_KEY}`,
};

const fetchWakatimeData = async (url: string) => {
	const response: Response = await fetch(url, {
		headers,
		cache: 'no-cache',
	});

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	return response.json();
};

export const wakatimeStats = async () => {
	const url: string = env.WAKATIME_DATA_URL;

	try {
		const [stats] = await fetchWakatimeData(url);
		return stats;
	} catch (error) {
		logger.error('Error fetching Wakatime stats data:', error);
		throw new Error('Error fetching Wakatime stats data');
	}
};
