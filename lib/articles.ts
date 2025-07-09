import { promises as fs } from 'node:fs';
import path from 'node:path';
import glob from 'fast-glob';
import { cache } from 'react';
import readingDuration from 'reading-duration';

interface Article {
	title: string;
	description: string;
	author: string;
	date: string;
	readingTime: string;
	readingTimeShort: string;
	image: string;
}

export interface ArticleWithSlug extends Article {
	slug: string;
	content: string;
}

const readArticleContent = cache(async (contentPath: string): Promise<string> => {
	return await fs.readFile(contentPath, 'utf-8');
});

const calculateReadingTime = cache((content: string) => {
	const duration = readingDuration(content, {
		wordsPerMinute: 100,
		emoji: false,
	});

	return {
		readingTime: duration.replace('min read', 'minutes de lecture'),
		readingTimeShort: duration.replace('min read', 'minutes'),
	};
});

const importArticle = async (articleFilename: string): Promise<ArticleWithSlug> => {
	try {
		const articleModule = await import(`../app/blog/articles/${articleFilename}`);
		const { article } = articleModule;

		const contentPath: string = path.resolve('./app/blog/articles', articleFilename);
		const content: string = await readArticleContent(contentPath);

		const { readingTime, readingTimeShort } = calculateReadingTime(content);

		return {
			slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
			content,
			...article,
			readingTime,
			readingTimeShort,
		};
	} catch (error) {
		console.error(`Error importing article ${articleFilename}:`, error);
		throw error;
	}
};

export const getAllArticles = cache(async (): Promise<ArticleWithSlug[]> => {
	try {
		const articleFilenames: string[] = await glob('*/page.mdx', {
			cwd: './app/blog/articles',
			onlyFiles: true,
		});

		const articles: ArticleWithSlug[] = await Promise.all(
			articleFilenames.map(importArticle),
		);

		return articles.sort((a, b): number => +new Date(b.date) - +new Date(a.date));
	} catch (error) {
		console.error('Error fetching articles:', error);
		return [];
	}
});

export const getArticleBySlug = cache(
	async (slug: string): Promise<ArticleWithSlug | undefined> => {
		const articles = await getAllArticles();
		return articles.find((article) => article.slug === slug);
	},
);

export const getRecentArticles = cache(
	async (limit: number = 3): Promise<ArticleWithSlug[]> => {
		const articles = await getAllArticles();
		return articles.slice(0, limit);
	},
);
