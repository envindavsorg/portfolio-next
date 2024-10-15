import { promises as fs, type Dirent } from 'node:fs';
import path from 'node:path';
import { routes } from '@/resources/config';
import type { RouteKey } from '@/resources/navigation';

export const getSlugs = async (dir: string): Promise<string[]> => {
	const entries: Dirent[] = await fs.readdir(dir, {
		recursive: true,
		withFileTypes: true,
	});

	return entries
		.filter((entry: Dirent) => entry.isFile() && entry.name === 'page.mdx')
		.map((entry: Dirent) => {
			const relativePath: string = path.relative(
				dir,
				path.join(entry.parentPath, entry.name),
			);

			return path.dirname(relativePath);
		})
		.map((slug: string) => slug.replace(/\\/g, '/'));
};

interface Pages {
	url: string;
	lastModified: string;
}

const sitemap = async () => {
	const notesDirectory: string = path.join(process.cwd(), 'app');
	const slugs: string[] = await getSlugs(notesDirectory);

	const pages: Pages[] = slugs
		.filter((slug) => {
			const routeKey = `/${slug}` as RouteKey;
			// @ts-ignore
			// noinspection PointlessBooleanExpressionJS
			return routes[routeKey] !== false;
		})
		.map((slug) => ({
			url: `https://cuzeac-florin.app/${slug}`,
			lastModified: new Date().toISOString(),
		}));

	const home: Pages[] = ['/'].map((route) => ({
		url: `https://cuzeac-florin.app${route}`,
		lastModified: new Date().toISOString(),
	}));

	return [...home, ...pages];
};

export default sitemap;
