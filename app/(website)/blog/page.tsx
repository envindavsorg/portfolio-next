import { AnimatedName } from '@/app/(website)/animated-name';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { Title } from '@/components/blocs/Typography';
import { Articles } from '@/components/blog/Articles';
import { getAllArticles } from '@/lib/articles';
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
			<Title>- tous mes articles de blog</Title>
			<AnimatedName />

			<FadeInStagger className="mt-10" faster>
				<FadeIn>
					<span className="font-bold text-theme">
						{articles.length} articles
					</span>{' '}
					pour l'instant.{' '}
					<span className="font-bold">Restez branchés pour la suite !</span>
				</FadeIn>

				<FadeIn className="mt-12">
					<Articles articles={articles} isBlog />
				</FadeIn>
			</FadeInStagger>
		</>
	);
};

export default BlogPage;
