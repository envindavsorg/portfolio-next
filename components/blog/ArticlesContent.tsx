import { Link } from 'next-view-transitions';
import type React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Articles } from '@/components/blog/Articles';
import PageParagraph from '@/components/text/PageParagraph';
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles';

export const ArticlesContent = async (): Promise<React.JSX.Element> => {
	const articles: Awaited<ArticleWithSlug>[] = await getAllArticles();

	return (
		<>
			<FadeIn>
				<h2 className="font-bold font-hubot text-2xl sm:text-3xl">
					Mes derniers articles <span className="tracking-widest">...</span>
				</h2>
			</FadeIn>
			<PageParagraph className="mt-3">
				J'écris occasionnellement des{' '}
				<Link
					href="/blog"
					aria-label="Voir tous mes articles"
					className="font-bold text-theme"
				>
					articles
				</Link>{' '}
				sur des sujets variés, comme le{' '}
				<span className="font-bold">développement web</span>, le{' '}
				<span className="font-bold">design</span>, le{' '}
				<span className="font-bold">marketing</span>, etc.
			</PageParagraph>

			<FadeIn className="mt-6" asChild>
				<Articles articles={articles.slice(0, 3)} />
			</FadeIn>
		</>
	);
};
