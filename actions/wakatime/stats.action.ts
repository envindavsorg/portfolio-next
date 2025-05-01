import { Redis } from '@upstash/redis';

export interface WakatimeStats {
	data: {
		start: string;
		end: string;
		daily_average: number;
		best_day: {
			date: string;
			total_seconds: number;
		};
		total_seconds: number;
		languages: Array<{
			name: string;
			percent: number;
			color: string;
		}>;
	};
}

export async function wakatimeStats(url?: string): Promise<WakatimeStats> {
	try {
		// If no URL provided, return mock data
		if (!url) {
			return {
				data: {
					start: '2024-01-01',
					end: '2024-12-31',
					daily_average: 28800, // 8 hours in seconds
					best_day: {
						date: '2024-06-15',
						total_seconds: 36000, // 10 hours in seconds
					},
					total_seconds: 10512000, // 365 days * 8 hours
					languages: [
						{ name: 'TypeScript', percent: 45.2, color: '#3178c6' },
						{ name: 'JavaScript', percent: 25.1, color: '#f7df1e' },
						{ name: 'CSS', percent: 15.3, color: '#1572b6' },
						{ name: 'JSON', percent: 8.7, color: '#000000' },
						{ name: 'MDX', percent: 5.7, color: '#1f2937' },
					],
				},
			};
		}

		// Try to fetch from cache first
		const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;
		if (UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN) {
			const redis = new Redis({
				url: UPSTASH_REDIS_REST_URL,
				token: UPSTASH_REDIS_REST_TOKEN,
			});

			const cached = await redis.get<WakatimeStats>('wakatime:stats');
			if (cached) {
				return cached;
			}
		}

		// Fetch from Wakatime API
		const response = await fetch(url, {
			headers: {
				'Authorization': `Bearer ${process.env.WAKATIME_API_KEY}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Wakatime API error: ${response.status}`);
		}

		const data = await response.json();

		// Cache the result for 1 hour
		if (UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN) {
			const redis = new Redis({
				url: UPSTASH_REDIS_REST_URL,
				token: UPSTASH_REDIS_REST_TOKEN,
			});

			await redis.setex('wakatime:stats', 3600, data);
		}

		return data;
	} catch (error) {
		console.error('Error fetching Wakatime stats:', error);
		// Return mock data on error
		return {
			data: {
				start: '2024-01-01',
				end: '2024-12-31',
				daily_average: 28800,
				best_day: {
					date: '2024-06-15',
					total_seconds: 36000,
				},
				total_seconds: 10512000,
				languages: [
					{ name: 'TypeScript', percent: 45.2, color: '#3178c6' },
					{ name: 'JavaScript', percent: 25.1, color: '#f7df1e' },
					{ name: 'CSS', percent: 15.3, color: '#1572b6' },
					{ name: 'JSON', percent: 8.7, color: '#000000' },
					{ name: 'MDX', percent: 5.7, color: '#1f2937' },
				],
			},
		};
	}
}