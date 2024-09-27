import { Motion } from '@/components/motion/Motion';
import { variantsOne } from '@/components/motion/variants';
import { AnimatedNameLink } from '@/components/text/AnimatedName';
import { getAllArticles } from '@/lib/articles';
import { formatDate } from '@/lib/formatDate';
import { ArrowRight, Book, Calendar } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import type React from 'react';

export const metadata = {
	title: 'Mes articles de blog',
	alternates: {
		canonical: '/blog',
	},
};

const Blog = async (): Promise<React.JSX.Element> => {
	const articles = await getAllArticles();

	return (
		<>
			<h1 className="fade-in mb-0 pt-16 font-geist-sans font-medium text-lg lg:pt-12">
				Mes articles de blog
			</h1>

			<AnimatedNameLink />

			<Motion className="mt-8" variants={variantsOne}>
				<div className="flex flex-col gap-y-12">
					{articles.map(({ slug, date, title, description, readingTime }) => (
						<article
							key={slug}
							className="flex max-w-xl flex-col items-start justify-between"
						>
							<h2 className="font-bold font-geist-sans text-foreground text-xl sm:text-2xl">
								<Link href={`/articles/${slug}`} aria-label={description}>
									<span className="absolute inset-0" />
									{title}
								</Link>
							</h2>

							<div className="mt-2 flex items-center gap-x-12 text-sm">
								<div className="flex items-center gap-x-2">
									<Calendar className="size-4 shrink-0" weight="regular" />
									<time dateTime={date}>{formatDate(date)}</time>
								</div>
								<div className="flex items-center gap-x-2">
									<Book className="size-4 shrink-0" weight="regular" />
									<p>{readingTime}</p>
								</div>
							</div>

							<p className="mt-4 line-clamp-3 text-foreground leading-6">
								{description}
							</p>

							<Link
								className="mt-5 flex items-center gap-x-2 font-bold text-sm"
								href={`/articles/${slug}`}
								aria-label={description}
							>
								Lire l'article{' '}
								<ArrowRight className="size-4 shrink-0" weight="bold" />
							</Link>
						</article>
					))}
				</div>
			</Motion>
		</>
	);
};

export default Blog;
