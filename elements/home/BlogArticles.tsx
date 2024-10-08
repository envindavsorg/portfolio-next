import { FadeIn } from '@/components/animations/FadeIn';
import { Articles } from '@/components/blog/Articles';
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { Fragment, memo } from 'react';

export const BlogArticles = memo(async () => {
	const articles: Awaited<ArticleWithSlug>[] = await getAllArticles();

	return (
		<Fragment>
			<FadeIn>
				<h2 className="font-bold font-geist-sans text-xl md:text-2xl">
					Mes derniers articles <span className="tracking-widest">...</span>
				</h2>
			</FadeIn>

			<FadeIn className="mt-3">
				<p>
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
				</p>
			</FadeIn>

			<FadeIn className="mt-6">
				<Articles articles={articles.slice(0, 3)} isLanding />
			</FadeIn>
		</Fragment>
	);
});
