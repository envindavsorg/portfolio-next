import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type React from 'react';
import { Suspense } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Articles } from '@/components/blog/Articles';
import PageTitle from '@/components/text/PageTitle';
import { Separator } from '@/components/ui/Separator';
import { getAllArticles } from '@/lib/articles';
import { constructMetadata } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/utils';
import { name, title } from '@/resources/config';

const ArticlesLoading = () => (
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

export const generateMetadata = async (): Promise<Metadata> => {
	const cookie = await cookies();
	const mode: string | undefined = cookie.get('theme')?.value;
	const blogTitle = 'Tous mes articles de blog';
	const description =
		'Découvrez tous mes articles de blog sur le développement web, React, Next.js, TypeScript et plus encore. Conseils pratiques et tutoriels détaillés.';

	return constructMetadata({
		title: blogTitle,
		description,
		image: absoluteUrl(`/api/og?heading=${blogTitle}&type=image&mode=${mode}`),
	});
};

const BlogPage = async (): Promise<React.JSX.Element> => {
	const articles = await getAllArticles();

	return (
		<section>
			<PageTitle name={name} title={title}>
				- tous les articles que j'ai écrit
			</PageTitle>

			<Separator className="my-12" />

			<Suspense fallback={<ArticlesLoading />}>
				<Articles articles={articles} />
			</Suspense>

			<Separator className="my-12" />

			<FadeIn className="mt-3" asChild>
				<span className="text-theme">{articles.length} articles</span> pour l'instant.{' '}
				<span className="font-medium">Restez branchés pour la suite !</span>
			</FadeIn>
		</section>
	);
};

export default BlogPage;
