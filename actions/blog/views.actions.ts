'use server';

import { redis } from '@/db/redis';
import { env } from '@/env/server';
import { unstable_noStore as noStore } from 'next/cache';

export const getBlogViews = async (): Promise<number> => {
	if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
		return 0;
	}

	noStore();
	const views: any = await redis.lrange('views', 0, -1);

	return views.reduce((total: any, item: any) => total + item.count, 0);
};

export const getViewsCount = async () => {
	if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
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

	const views: any = await redis.lrange('views', 0, -1);
	const viewIndex: number = views.findIndex((view: any) => view.slug === slug);

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
};
