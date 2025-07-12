import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
	rules: {
		userAgent: '*',
		allow: '/',
		disallow: ['/api/', '/_next/', '/admin/'],
	},
	sitemap: 'https://cuzeacflorin.fr/sitemap.xml',
	host: 'https://cuzeacflorin.fr',
});

export default robots;
