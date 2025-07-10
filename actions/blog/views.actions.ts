'use server';

import crypto from 'node:crypto';
import { unstable_noStore as noStore } from 'next/cache';
import { headers } from 'next/headers';
import { redis } from '@/db/redis';
import { logger } from '@/lib/logger';

export interface ViewData {
	slug: string;
	count: number;
}

const { NODE_ENV, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;

export const getBlogViews = async (dynamic = false) => {
	if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) return 0;
	if (dynamic) noStore();

	try {
		const views = await redis.lrange<string | ViewData>('views', 0, -1);
		return views.reduce(
			(sum, v) =>
				sum + (typeof v === 'string' ? (JSON.parse(v)?.count ?? 0) : (v.count ?? 0)),
			0,
		);
	} catch (error) {
		logger.error('→ Error getting blog views!', error);
		return 0;
	}
};

export const getViewsCount = async (dynamic = false) => {
	if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) return [];
	if (dynamic) noStore();

	try {
		const views = await redis.lrange<ViewData>('views', 0, -1);
		return views.filter((v): v is ViewData => Boolean(v?.slug));
	} catch (error) {
		logger.error('→ Error getting blog views count !', error);
		return [];
	}
};

export const incrementViewsCount = async (slug: string) => {
	noStore();
	if (NODE_ENV === 'development') return;

	try {
		const hdr = await headers();
		const ip = (hdr.get('x-forwarded-for') || hdr.get('x-real-ip') || 'localhost')
			.split(',')[0]
			.trim() as string;
		const ipKey =
			`ip:${crypto.createHash('sha256').update(ip).digest('hex')}:views:${slug}` as string;

		if (!(await redis.get(ipKey))) {
			await Promise.all([
				redis.hincrby('views_hash', slug, 1),
				redis.set(ipKey, '1', { ex: 86400 }),
			]);
		}
	} catch (error) {
		logger.error('→ Error incrementing blog views count !', error);
	}
};
