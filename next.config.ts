import { fileURLToPath } from 'node:url';
import createMDX from '@next/mdx';
import { Redis } from '@upstash/redis';
import createJiti, { type JITI } from 'jiti';
import type { NextConfig } from 'next';

// Import env here to validate during build.
// Using jiti we can import .ts files :)
const jiti: JITI = createJiti(fileURLToPath(import.meta.url));
jiti('./env/server');
jiti('./env/client');

// Next.js configuration
const nextConfig: NextConfig = {
	pageExtensions: ['mdx', 'ts', 'tsx'],
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
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
		if (
			!process.env.UPSTASH_REDIS_REST_URL ||
			!process.env.UPSTASH_REDIS_REST_TOKEN
		) {
			return [];
		}

		const redis = new Redis({
			url: process.env.UPSTASH_REDIS_REST_URL,
			token: process.env.UPSTASH_REDIS_REST_TOKEN,
		});

		const redirects = await redis.lrange('redirects', 0, -1);

		return redirects.map((redirect) => {
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

// Add MDX support to Next.js
const withMDX: (config: NextConfig) => NextConfig = createMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
