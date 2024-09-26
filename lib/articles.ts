import glob from 'fast-glob';
import type { ComponentType } from 'react';

interface Article {
	title: string;
	description: string;
	author: string;
	date: string;
}

export interface ArticleWithSlug extends Article {
	slug: string;
}

const importArticle = async (
	articleFilename: string,
): Promise<ArticleWithSlug> => {
	const { article } = (await import(`../app/articles/${articleFilename}`)) as {
		default: ComponentType;
		article: Article;
	};

	return {
		slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
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
