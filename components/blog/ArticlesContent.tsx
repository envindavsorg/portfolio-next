import type React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Articles } from '@/components/blog/Articles';
import PageParagraph from '@/components/text/PageParagraph';
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles';

export const ArticlesContent = async (): Promise<React.JSX.Element> => {
	const articles: Awaited<ArticleWithSlug>[] = await getAllArticles();

	return (
		<>
			<PageParagraph>
				J'écris occasionnellement des articles sur des sujets variés, comme le{' '}
				développement web, le design, le marketing, etc.
			</PageParagraph>

			<FadeIn className="mt-8" asChild>
				<Articles articles={articles.slice(0, 3)} />
			</FadeIn>
		</>
	);
};
