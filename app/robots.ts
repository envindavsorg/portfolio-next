import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [
				'/api/',
				'/_next/',
				'/admin/',
			],
		},
		sitemap: 'https://cuzeac-florin.app/sitemap.xml',
		host: 'https://cuzeac-florin.app',
	};
}