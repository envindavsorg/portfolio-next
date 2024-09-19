'use server';

import { env } from '@/env/server';
import { dayjs } from '@/lib/dayjs';
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
	const urls: string[] = [env.WAKATIME_DATA_SHARE_URL, env.WAKATIME_DATA_URL];

	try {
		const [share, stats] = await Promise.all(urls.map(fetchWakatimeData));
		stats.data.code_time = share.data;
		stats.data.code_time_charts = stats.data.code_time
			.filter(({ range }: { range: any }) => {
				const day: number = dayjs(range.date).day();
				return day !== 0 && day !== 6;
			})
			.map(({ range, grand_total }: { range: any; grand_total: any }) => {
				const percent: number = Math.round((grand_total.hours / 6) * 100);
				return {
					label: dayjs(range.date).format('ddd'),
					progress: percent > 0 ? percent + 20 : 0,
				};
			})
			.filter(({ progress }: { progress: number }) => progress > 0);

		return stats;
	} catch (error) {
		logger.error('Error fetching Wakatime stats data:', error);
		throw new Error('Error fetching Wakatime stats data');
	}
};
