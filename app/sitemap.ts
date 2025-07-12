import type { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
	const baseUrl = 'https://cuzeacflorin.fr';

	const blogPosts = [
		'quelques-snippets-javascript-utiles-en-developpement',
		'generer-des-balises-open-graph-dynamiques-avec-next-js-14',
		'differents-filtres-css-pour-enrichir-toutes-vos-images',
	];

	const staticPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		},
	];

	const blogPages = blogPosts.map((slug) => ({
		url: `${baseUrl}/blog/articles/${slug}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.6,
	}));

	return [...staticPages, ...blogPages];
};

export default sitemap;
