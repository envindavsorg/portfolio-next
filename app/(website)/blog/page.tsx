import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { Articles } from '@/components/blog/Articles';
import { Title } from '@/components/layout/Title';
import { getAllArticles } from '@/lib/articles';
import { name, title } from '@/resources/config';
import { absoluteUrl } from '@/site/metadata';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type React from 'react';

export const generateMetadata = async (): Promise<Metadata> => {
	const cookie = await cookies();
	const type: string = 'image';
	const mode: string | undefined = cookie.get('theme')?.value;
	const title: string = 'Tous mes articles de blog';

	return {
		title,
		description:
			'Découvrez tous mes articles de blog sur mon portfolio, avec des illustrations et des descriptions.',
		openGraph: {
			images: [
				absoluteUrl(`/api/og?heading=${title}&type=${type}&mode=${mode}`),
			],
		},
		alternates: {
			canonical: '/blog',
		},
	};
};

const BlogPage = async (): Promise<React.JSX.Element> => {
	const articles = await getAllArticles();

	return (
		<>
			<Title name={name} title={title}>
				tous mes articles de blog
			</Title>

			<FadeInStagger className="mt-10" faster>
				<FadeIn>
					<span className="font-bold text-theme">
						{articles.length} articles
					</span>{' '}
					pour l'instant.{' '}
					<span className="font-bold">Restez branchés pour la suite !</span>
				</FadeIn>

				<FadeIn className="mt-12">
					<Articles articles={articles} />
				</FadeIn>
			</FadeInStagger>
		</>
	);
};

export default BlogPage;
