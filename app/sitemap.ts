import { promises as fs } from 'node:fs';
import path from 'node:path';

const getNoteSlugs = async (dir: string): Promise<string[]> => {
	const entries = await fs.readdir(dir, {
		recursive: true,
		withFileTypes: true,
	});

	return entries
		.filter((entry) => entry.isFile() && entry.name === 'page.mdx')
		.map((entry) => {
			const relativePath = path.relative(
				dir,
				path.join(entry.parentPath, entry.name),
			);
			return path.dirname(relativePath);
		})
		.map((slug) => slug.replace(/\\/g, '/'));
};

const sitemap = async () => {
	const notesDirectory = path.join(process.cwd(), 'app');
	const slugs = await getNoteSlugs(notesDirectory);

	const notes = slugs.map((slug) => ({
		url: `https://cuzeac-florin.app/${slug}`,
		lastModified: new Date().toISOString(),
	}));

	const routes = ['', '/contact'].map((route) => ({
		url: `https://cuzeac-florin.app${route}`,
		lastModified: new Date().toISOString(),
	}));

	return [...routes, ...notes];
};

export default sitemap;
