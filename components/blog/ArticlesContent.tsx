import Link from 'next/link';
import type React from 'react';
import { Suspense } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Articles } from '@/components/blog/Articles';
import PageParagraph from '@/components/text/PageParagraph';
import { type ArticleWithSlug, getRecentArticles } from '@/lib/articles';

const ArticlesContentSkeleton = () => (
	<div className="space-y-4">
		{Array.from({ length: 3 }).map((_, i) => (
			<div key={i} className="animate-pulse py-3">
				<div className="flex items-center justify-between gap-6">
					<div className="flex flex-1 flex-col-reverse gap-2">
						<div className="flex items-center gap-1.5">
							<div className="h-4 w-20 rounded bg-neutral-200 dark:bg-neutral-700" />
							<div className="h-4 w-4 rounded bg-neutral-200 dark:bg-neutral-700" />
							<div className="h-4 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
						</div>
						<div className="h-6 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
					</div>
					<div className="h-20 w-20 rounded-md bg-neutral-200 dark:bg-neutral-700" />
				</div>
			</div>
		))}
	</div>
);

export const ArticlesContent = async (): Promise<React.JSX.Element> => {
	const articles: ArticleWithSlug[] = await getRecentArticles(3);

	return (
		<>
			<PageParagraph>
				J'écris occasionnellement des{' '}
				<Link href="/blog" className="font-medium text-foreground" prefetch={false}>
					<span className="text-theme">/</span>articles
				</Link>{' '}
				sur des sujets variés, comme le développement web, le design, le marketing, etc.
			</PageParagraph>

			<FadeIn className="mt-8" asChild>
				<Suspense fallback={<ArticlesContentSkeleton />}>
					<Articles articles={articles} />
				</Suspense>
			</FadeIn>
		</>
	);
};
