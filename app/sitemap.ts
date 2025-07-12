import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://cuzeac-florin.app';
	
	// Static blog posts (add more as needed)
	const blogPosts = [
		'quelques-snippets-javascript-utiles-en-developpement',
		'generer-des-balises-open-graph-dynamiques-avec-next-js-14',
		'differents-filtres-css-pour-enrichir-toutes-vos-images',
	];
	
	// Static pages
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
	
	// Dynamic blog post pages
	const blogPages = blogPosts.map((slug) => ({
		url: `${baseUrl}/blog/articles/${slug}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.6,
	}));
	
	return [...staticPages, ...blogPages];
}