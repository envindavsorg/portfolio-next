import { promises as fs, type Dirent } from 'node:fs';
import path from 'node:path';
import { routes } from '@/resources/config';
import type { RouteKey } from '@/resources/navigation';

export const getSlugs = async (dir: string): Promise<string[]> => {
	const walkDir = async (currentDir: string): Promise<string[]> => {
		const entries = await fs.readdir(currentDir, { withFileTypes: true });
		const slugs: string[] = [];

		for (const entry of entries) {
			const fullPath = path.join(currentDir, entry.name);
			
			if (entry.isDirectory()) {
				// Recursively walk subdirectories
				const subSlugs = await walkDir(fullPath);
				slugs.push(...subSlugs);
			} else if (entry.isFile() && entry.name === 'page.mdx') {
				// Get the relative path and extract the directory
				const relativePath = path.relative(dir, fullPath);
				const slug = path.dirname(relativePath).replace(/\\/g, '/');
				if (slug !== '.') {
					slugs.push(slug);
				}
			}
		}

		return slugs;
	};

	return await walkDir(dir);
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
			return routes[routeKey];
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
