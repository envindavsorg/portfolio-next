'use server';

import crypto from 'node:crypto';
import { unstable_noStore as noStore } from 'next/cache';
import { headers } from 'next/headers';
import { redis } from '@/db/redis';

// Type definitions for better type safety
export interface ViewData {
	slug: string;
	count: number;
}

export const getBlogViews = async (dynamic = false): Promise<number> => {
	if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
		return 0;
	}

	if (dynamic) {
		noStore();
	}
	
	try {
		const views = await redis.lrange('views', 0, -1);
		const parsedViews: ViewData[] = views
			.map((view: any) => {
				try {
					// Handle both string and object cases
					if (typeof view === 'string') {
						// Additional safety check for valid JSON strings
						if (view.trim().startsWith('{') && view.trim().endsWith('}')) {
							return JSON.parse(view) as ViewData;
						}
						return null;
					}
					if (typeof view === 'object' && view !== null && view.slug && typeof view.count === 'number') {
						return view as ViewData;
					}
					return null;
				} catch (error) {
					console.error('Error parsing view data:', error, 'Raw view:', view);
					return null;
				}
			})
			.filter((view): view is ViewData => view !== null);
		
		return parsedViews.reduce((total: number, item: ViewData) => total + item.count, 0);
	} catch (error) {
		console.error('Error getting blog views:', error);
		return 0;
	}
};

export const getViewsCount = async (dynamic = false): Promise<ViewData[]> => {
	if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
		return [];
	}

	if (dynamic) {
		noStore();
	}
	
	try {
		const views = await redis.lrange('views', 0, -1);
		return views
			.map((view: any) => {
				try {
					// Handle both string and object cases
					if (typeof view === 'string') {
						// Additional safety check for valid JSON strings
						if (view.trim().startsWith('{') && view.trim().endsWith('}')) {
							return JSON.parse(view) as ViewData;
						}
						return null;
					}
					if (typeof view === 'object' && view !== null && view.slug && typeof view.count === 'number') {
						return view as ViewData;
					}
					return null;
				} catch (error) {
					console.error('Error parsing view data:', error, 'Raw view:', view);
					return null;
				}
			})
			.filter((view): view is ViewData => view !== null);
	} catch (error) {
		console.error('Error getting views count:', error);
		return [];
	}
};

export const increment = async (slug: string): Promise<void> => {
	noStore();

	if (process.env.NODE_ENV === 'development') {
		return;
	}

	try {
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
			const parsedViews: ViewData[] = views
				.map((view: any) => {
					try {
						// Handle both string and object cases
						if (typeof view === 'string') {
							return JSON.parse(view) as ViewData;
						}
						if (typeof view === 'object' && view !== null) {
							return view as ViewData;
						}
						return null;
					} catch {
						return null;
					}
				})
				.filter((view): view is ViewData => view !== null);
			const viewIndex = parsedViews.findIndex((view: ViewData) => view.slug === slug);

			if (viewIndex === -1) {
				const newView: ViewData = { slug, count: 1 };
				await redis.rpush('views', JSON.stringify(newView));
			} else {
				const view = parsedViews[viewIndex];
				const updatedView: ViewData = {
					...view,
					count: view.count + 1,
				};

				await redis.lset('views', viewIndex, JSON.stringify(updatedView));
			}

			// Set view tracking with 24h expiry to prevent double counting
			await redis.set(ipViewKey, '1', { ex: 86400 });
		}
	} catch (error) {
		console.error('Error incrementing view count:', error);
	}
};
