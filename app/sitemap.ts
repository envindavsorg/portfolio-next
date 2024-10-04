import { promises as fs, type Dirent } from 'node:fs';
import path from 'node:path';

export const getNoteSlugs = async (dir: string): Promise<string[]> => {
	const entries: Dirent[] = await fs.readdir(dir, {
		recursive: true,
		withFileTypes: true,
	});

	return entries
		.filter((entry) => entry.isFile() && entry.name === 'page.mdx')
		.map((entry) => {
			const relativePath: string = path.relative(
				dir,
				path.join(entry.parentPath, entry.name),
			);

			return path.dirname(relativePath);
		})
		.map((slug) => slug.replace(/\\/g, '/'));
};

const sitemap = async () => {
	const notesDirectory: string = path.join(process.cwd(), 'app');
	const slugs: string[] = await getNoteSlugs(notesDirectory);

	const notes = slugs.map((slug) => ({
		url: `https://cuzeac-florin.app/${slug}`,
		lastModified: new Date().toISOString(),
	}));

	const routes = ['/contact', '/blog'].map((route) => ({
		url: `https://cuzeac-florin.app${route}`,
		lastModified: new Date().toISOString(),
	}));

	return [...routes, ...notes];
};

export default sitemap;
