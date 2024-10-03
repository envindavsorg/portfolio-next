import { Articles } from '@/components/blog/Articles';
import { AnimatedNameLink } from '@/components/text/AnimatedName';
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles';
import type React from 'react';

export const metadata = {
	title: 'Mes articles de blog',
	alternates: {
		canonical: '/blog',
	},
};

const Blog = async (): Promise<React.JSX.Element> => {
	const articles: Awaited<ArticleWithSlug>[] = await getAllArticles();

	return (
		<>
			<h1 className="fade-in mb-0 pt-16 font-geist-sans font-medium text-lg lg:pt-12">
				Mes articles de blog
			</h1>
			<AnimatedNameLink />
			<p>
				<span className="font-bold text-theme">{articles.length} articles</span>{' '}
				pour l'instant.{' '}
				<span className="font-bold">Restez branchés pour la suite !</span>
			</p>

			<div className="mt-10">
				<Articles articles={articles} isBlog />
			</div>
		</>
	);
};

export default Blog;
