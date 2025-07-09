import { Circle } from '@phosphor-icons/react/dist/ssr';
import React, { cache, memo } from 'react';
import { getViewsCount, increment } from '@/actions/blog/views.actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { formatDate } from '@/lib/formatDate';
import { initials, name } from '@/resources/config';

interface ViewsCounterProps {
	article: {
		author: string;
		date: string;
		title: string;
		description: string;
		image: string;
	};
	slug: string;
}

interface ViewData {
	slug: string;
	count: number;
}

export const incrementViews = cache(increment);

// Format view count text
const formatViewCount = (count: number): string => {
	if (count === 0) return '0 vues';
	if (count === 1) return '1 vue';
	return `${count} vues`;
};

// Memoized author info component
const AuthorInfo = memo(({ author, date }: { author: string; date: string }) => (
	<>
		<p className="text-primary font-medium">{author}</p>
		<div className="inline-flex items-center gap-x-2">
			<time className="text-muted-foreground text-sm" dateTime={date}>
				{formatDate(date)}
			</time>
			<Circle
				className="size-1.5 shrink-0 text-muted-foreground"
				weight="fill"
				aria-hidden="true"
			/>
		</div>
	</>
));

AuthorInfo.displayName = 'AuthorInfo';

export const ViewsCounter = async ({ article, slug }: ViewsCounterProps) => {
	try {
		const views: ViewData[] = await getViewsCount();
		const viewsForSlug = views?.find((view: ViewData) => view.slug === slug);
		const viewCount: number = Number(viewsForSlug?.count || 0);

		// Increment views asynchronously without blocking render
		await incrementViews(slug);

		return (
			<div className="fade-in flex max-w-none items-center gap-4 py-6">
				<Avatar className="size-12 shrink-0">
					<AvatarImage
						src="https://cuzeac-florin.app/og-author.png"
						alt={`Photo de profil de ${name}`}
						loading="lazy"
					/>
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
				<div className="inline-flex select-none flex-col gap-1 overflow-hidden leading-tight">
					<AuthorInfo author={article.author} date={article.date} />
					<div className="flex items-center gap-x-2 text-muted-foreground text-sm">
						<span aria-label={`${viewCount} vues pour cet article`}>
							{formatViewCount(viewCount)}
						</span>
					</div>
				</div>
			</div>
		);
	} catch (error) {
		console.error('Error in ViewsCounter:', error);
		// Fallback UI if views fail to load
		return (
			<div className="fade-in flex max-w-none items-center gap-4 py-6">
				<Avatar className="size-12 shrink-0">
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
				<div className="inline-flex select-none flex-col gap-1 overflow-hidden leading-tight">
					<AuthorInfo author={article.author} date={article.date} />
					<div className="flex items-center gap-x-2 text-muted-foreground text-sm">
						<span>0 vues</span>
					</div>
				</div>
			</div>
		);
	}
};
