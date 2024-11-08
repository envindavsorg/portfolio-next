import type { ArticleWithSlug } from '@/lib/articles';
import { formatDate } from '@/lib/formatDate';
import { LineVertical } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import type React from 'react';

interface ArticleProps {
	article: ArticleWithSlug;
}

export const Article = ({ article }: ArticleProps): React.JSX.Element => {
	const { date, slug, title, image, readingTimeShort } = article;

	return (
		<li className="group py-3 transition-opacity first:pt-0 last:pb-0">
			<Link
				href={`/blog/articles/${slug}`}
				aria-label={title}
				className="no-underline"
			>
				<div className="transition-opacity">
					<div className="flex items-center justify-between gap-6">
						<div className="flex flex-col-reverse gap-2">
							<div className="flex items-center gap-1.5 min-[530px]:gap-3">
								<h3 className="shrink-0 font-medium text-theme text-xs tracking-tight min-[530px]:text-sm">
									{formatDate(date)}
								</h3>
								<LineVertical className="size-4" />
								<h3 className="shrink-0 font-extrabold text-foreground text-xs tracking-tight min-[530px]:text-sm">
									{readingTimeShort}
								</h3>
							</div>
							<span className="font-bold font-geist-sans text-lg leading-tight min-[530px]:text-xl">
								{title}
							</span>
						</div>

						<div className="relative flex aspect-square size-20 min-w-20 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-700">
							<Image
								src={image}
								alt={title}
								fill
								className="rounded-md object-cover object-center"
							/>
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
};
