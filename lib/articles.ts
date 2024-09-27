import { promises as fs } from 'node:fs';
import path from 'node:path';
import glob from 'fast-glob';
import readingDuration from 'reading-duration';

interface Article {
	title: string;
	description: string;
	author: string;
	date: string;
	readingTime: string;
}

export interface ArticleWithSlug extends Article {
	slug: string;
	content: string;
}

const importArticle = async (
	articleFilename: string,
): Promise<ArticleWithSlug> => {
	const articleModule = await import(`../app/articles/${articleFilename}`);
	const { article } = articleModule;

	const contentPath: string = path.resolve('./app/articles', articleFilename);
	const content: string = await fs.readFile(contentPath, 'utf-8');

	article.readingTime = readingDuration(content, {
		wordsPerMinute: 100,
		emoji: false,
	}).replace('min read', 'minutes de lecture');

	return {
		slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
		content,
		...article,
	};
};

export const getAllArticles = async () => {
	const articleFilenames = await glob('*/page.mdx', {
		cwd: './app/articles',
	});

	const articles = await Promise.all(articleFilenames.map(importArticle));
	return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date));
};
