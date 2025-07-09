import createMDX from '@next/mdx';
import { Redis } from '@upstash/redis';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	pageExtensions: ['mdx', 'ts', 'tsx'],

	// Enhanced image optimization
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'www.cuzeacflorin.fr',
			},
		],
		formats: ['image/webp', 'image/avif'],
		minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},

	// Performance optimizations
	compress: true,
	poweredByHeader: false,

	// Enhanced redirects with error handling
	async redirects() {
		try {
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
		} catch (error) {
			console.error('Error loading redirects:', error);
			return [];
		}
	},

	// Enhanced security headers
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
				],
			},
		];
	},

	// Modern experimental features
	experimental: {
		mdxRs: true,
		optimizePackageImports: [
			'motion',
			'lucide-react',
			'@phosphor-icons/react',
		],
	},

	// Turbopack configuration
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js',
			},
		},
	},

	// Enhanced webpack configuration
	webpack: (config, { dev, isServer }) => {
		// SVG optimization
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		// Bundle analyzer in development
		if (dev && !isServer) {
			config.optimization.splitChunks = {
				...config.optimization.splitChunks,
				cacheGroups: {
					...config.optimization.splitChunks?.cacheGroups,
					motion: {
						name: 'motion',
						test: /[\\/]node_modules[\\/]motion[\\/]/,
						chunks: 'all',
						priority: 10,
					},
				},
			};
		}

		return config;
	},
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
