import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface Post {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	image?: string;
	tags?: string[];
	readingTime?: string;
}

const postsDirectory = path.join(process.cwd(), 'app/blog/articles');

export async function getAllPosts(): Promise<Post[]> {
	try {
		const folders = fs.readdirSync(postsDirectory, { withFileTypes: true });
		const posts: Post[] = [];

		for (const folder of folders) {
			if (folder.isDirectory()) {
				const slug = folder.name;
				const fullPath = path.join(postsDirectory, slug, 'page.mdx');

				if (fs.existsSync(fullPath)) {
					const fileContents = fs.readFileSync(fullPath, 'utf8');
					const { data } = matter(fileContents);

					posts.push({
						slug,
						title: data.title || slug,
						description: data.description || '',
						date: data.date || new Date().toISOString(),
						author: data.author || 'Cuzeac Florin',
						image: data.image,
						tags: data.tags || [],
						readingTime: data.readingTime,
					});
				}
			}
		}

		return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	} catch (error) {
		console.error('Error reading posts:', error);
		return [];
	}
}

export async function getPost(slug: string): Promise<Post | null> {
	try {
		const fullPath = path.join(postsDirectory, slug, 'page.mdx');

		if (!fs.existsSync(fullPath)) {
			return null;
		}

		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data } = matter(fileContents);

		return {
			slug,
			title: data.title || slug,
			description: data.description || '',
			date: data.date || new Date().toISOString(),
			author: data.author || 'Cuzeac Florin',
			image: data.image,
			tags: data.tags || [],
			readingTime: data.readingTime,
		};
	} catch (error) {
		console.error('Error reading post:', error);
		return null;
	}
}
