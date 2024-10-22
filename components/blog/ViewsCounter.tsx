import { getViewsCount, increment } from '@/actions/blog/views.actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { formatDate } from '@/lib/formatDate';
import { Circle } from '@phosphor-icons/react/dist/ssr';
import React, { cache } from 'react';

interface ViewsCounterProps {
	article: {
		author: string;
		date: string;
		title: string;
		description: string;
		// biome-ignore lint/complexity/noBannedTypes: <explanation>
		image: {};
	};
	slug: string;
}

export const incrementViews = cache(increment);

export const ViewsCounter = async ({ article, slug }: ViewsCounterProps) => {
	const views: any[] | string[] = await getViewsCount();
	const viewsForSlug = views?.find((view) => view.slug === slug);
	const number: number = Number(viewsForSlug?.count || 0);
	const name: string = `${process.env.NEXT_PUBLIC_FULLNAME}`;

	await incrementViews(slug);

	return (
		<div className="flex max-w-none items-center gap-4">
			<Avatar className="size-12 shrink-0">
				<AvatarImage src="https://cuzeac-florin.app/og-author.png" alt={name} />
				<AvatarFallback>
					{name
						.split(' ')
						.map((part: string) => part[0].toUpperCase())
						.join('')}
				</AvatarFallback>
			</Avatar>
			<div className="inline-flex select-none flex-col gap-0.5 overflow-hidden leading-tight">
				<p className="text-primary">{article.author}</p>
				<div className="inline-flex items-center gap-x-2">
					<time
						className="text-muted-foreground text-sm"
						dateTime={article.date}
					>
						{formatDate(article.date)}
					</time>
					<Circle
						className="size-1.5 shrink-0 text-muted-foreground"
						weight="fill"
					/>
					<div className="flex items-center gap-x-2 font-bold text-muted-foreground text-sm">
						{number} vue{number === 0 ? 's' : number > 1 ? 's' : ''}
					</div>
				</div>
			</div>
		</div>
	);
};
