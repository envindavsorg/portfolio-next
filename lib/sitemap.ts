import path from 'node:path';
import { getNoteSlugs } from '@/app/sitemap';

export const getSitemapUrls = async () => {
	const notesDirectory: string = path.join(process.cwd(), 'app');
	const slugs: string[] = await getNoteSlugs(notesDirectory);

	const notes = slugs.map((slug) => ({
		url: `/${slug}`,
	}));

	const routes = ['/', '/contact', '/blog'].map((route) => ({
		url: `${route}`,
	}));

	return [...routes, ...notes];
};
