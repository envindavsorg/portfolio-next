import { LineVerticalIcon } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { memo } from 'react';
import type { ArticleWithSlug } from '@/lib/articles';
import { formatDate } from '@/lib/formatDate';

interface ArticleProps {
	article: ArticleWithSlug;
}

export const Article = memo(({ article }: ArticleProps): React.JSX.Element => {
	const { date, slug, title, image, readingTimeShort } = article;

	return (
		<li className="group py-3 transition-opacity first:pt-0 last:pb-0">
			<Link
				href={`/blog/articles/${slug}`}
				aria-label={`Lire l'article: ${title}`}
				className="no-underline"
				prefetch={false}
			>
				<article className="transition-opacity hover:opacity-80">
					<div className="flex items-center justify-between gap-6">
						<div className="flex flex-1 flex-col-reverse gap-2">
							<div className="flex items-center gap-1.5 min-[530px]:gap-3">
								<time
									dateTime={date}
									className="shrink-0 font-medium text-theme text-xs tracking-tight min-[530px]:text-sm"
								>
									{formatDate(date)}
								</time>
								<LineVerticalIcon className="size-4" aria-hidden="true" />
								<span className="shrink-0 font-medium text-foreground text-xs tracking-tight min-[530px]:text-sm">
									{readingTimeShort} de lecture
								</span>
							</div>
							<h2 className="font-bold font-geist-sans text-xl leading-tight sm:text-2xl">
								{title}
							</h2>
						</div>

						<div className="relative flex aspect-square size-20 min-w-20 items-center justify-center overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
							<Image
								src={image}
								alt={`Illustration de l'article: ${title}`}
								fill
								className="rounded-md object-cover object-center transition-transform duration-300 group-hover:scale-105"
								sizes="80px"
								priority={false}
								loading="lazy"
							/>
						</div>
					</div>
				</article>
			</Link>
		</li>
	);
});

Article.displayName = 'Article';
