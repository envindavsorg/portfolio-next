'use server';

import crypto from 'node:crypto';
import { redis } from '@/db/redis';
import { unstable_noStore as noStore } from 'next/cache';
import { headers } from 'next/headers';

export const getBlogViews = async (): Promise<number> => {
	if (
		!process.env.UPSTASH_REDIS_REST_URL ||
		!process.env.UPSTASH_REDIS_REST_TOKEN
	) {
		return 0;
	}

	noStore();
	const views = await redis.lrange('views', 0, -1);
	return views.reduce((total: any, item: any) => total + item.count, 0);
};

export const getViewsCount = async () => {
	if (
		!process.env.UPSTASH_REDIS_REST_URL ||
		!process.env.UPSTASH_REDIS_REST_TOKEN
	) {
		return [];
	}

	noStore();
	return await redis.lrange('views', 0, -1);
};

export const increment = async (slug: string) => {
	noStore();

	if (process.env.NODE_ENV === 'development') {
		return;
	}

	const headersList = await headers();
	const forwardedFor = headersList.get('x-forwarded-for');
	const realIp = headersList.get('x-real-ip');
	const ipSource = forwardedFor || realIp || 'localhost';
	const ip = ipSource.split(',')[0].trim();
	const hashedIp = crypto.createHash('sha256').update(ip).digest('hex');
	const ipViewKey = ['ip', hashedIp, 'views', slug].join(':');
	const hasViewed = await redis.get(ipViewKey);

	if (!hasViewed) {
		const views = await redis.lrange('views', 0, -1);
		const viewIndex: number = views.findIndex(
			(view: any) => view.slug === slug,
		);

		if (viewIndex === -1) {
			await redis.rpush('views', JSON.stringify({ slug, count: 1 }));
		} else {
			const view: any = views[viewIndex];
			const updatedView: any = {
				...view,
				count: view.count + 1,
			};

			await redis.lset('views', viewIndex, JSON.stringify(updatedView));
		}

		await redis.set(ipViewKey, '1');
	}
};
