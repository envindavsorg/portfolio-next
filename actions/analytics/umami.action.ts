'use server';

import Umami, { type UmamiApiClient, getClient } from '@umami/api-client';
import WebsiteStats = Umami.WebsiteStats;
import { env } from '@/env/server';
import { logger } from '@/lib/logger';

const client: UmamiApiClient = getClient({
	userId: env.UMAMI_USER_ID as string | undefined,
	apiEndpoint: env.UMAMI_API_CLIENT_ENDPOINT as string | undefined,
	apiKey: env.UMAMI_API_KEY as string | undefined,
});

const visitorsCount = async (): Promise<WebsiteStats | undefined> => {
	try {
		const { data } = await client.getWebsiteStats(
			<string>env.UMAMI_WEBSITE_ID,
			{
				startAt: (new Date(2024, 4, 1).getTime() / 1000) * 1000,
				endAt: (new Date().getTime() / 1000) * 1000,
			},
		);

		return data;
	} catch (error) {
		logger.error('Failed to fetch visitors count:', error);
		throw error;
	}
};

export { visitorsCount };
