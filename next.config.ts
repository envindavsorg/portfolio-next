import createMDX from '@next/mdx';
import { Redis } from '@upstash/redis';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	pageExtensions: ['mdx', 'ts', 'tsx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'www.cuzeac-florin.app',
			},
			{
				protocol: 'https',
				hostname: 'media.licdn.com',
			},
		],
	},
	async redirects() {
		const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;
		if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
			return [];
		}

		const redis: Redis = new Redis({
			url: UPSTASH_REDIS_REST_URL,
			token: UPSTASH_REDIS_REST_TOKEN,
		});

		const redirects: string[] = await redis.lrange('redirects', 0, -1);
		return redirects.map((redirect: string) => {
			const { source, destination, permanent } = JSON.parse(redirect);
			return {
				source,
				destination,
				permanent: !!permanent,
			};
		});
	},
	experimental: {
		mdxRs: true,
	},
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
