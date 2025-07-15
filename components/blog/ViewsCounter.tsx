import { CircleIcon } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { cache } from 'react';
import {
	getViewsCount,
	incrementViewsCount,
	type ViewData,
} from '@/actions/blog/views.actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { fullName, fullNameInitials } from '@/resources/config';

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

export const incrementViews = cache(incrementViewsCount);

const formatViewCount = (count: number): string => {
	if (count === 0) {
		return '0 vues';
	}
	if (count === 1) {
		return '1 vue';
	}
	return `${count} vues`;
};

const formatDate = (dateString: string): string =>
	new Date(`${dateString}T00:00:00Z`).toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC',
	});

export const ViewsCounter = async ({
	article,
	slug,
}: ViewsCounterProps): Promise<React.JSX.Element> => {
	try {
		const views: ViewData[] = await getViewsCount(false);
		const viewsForSlug = views?.find((view: ViewData) => view.slug === slug);
		const viewCount: number = Number(viewsForSlug?.count || 0);

		await incrementViews(slug);

		return (
			<div className="flex items-center gap-4 py-6">
				<Avatar className="size-12 shrink-0">
					<AvatarImage
						src="/og-author.png"
						alt={`Photo de profil de ${fullName} pour l'article: ${article.title}`}
						loading="lazy"
					/>
					<AvatarFallback>{fullNameInitials}</AvatarFallback>
				</Avatar>
				<div className="flex select-none flex-col gap-1">
					<p className="font-medium text-primary">{article.author}</p>
					<div className="inline-flex items-center gap-x-2">
						<time className="text-muted-foreground text-sm" dateTime={article.date}>
							{formatDate(article.date)}
						</time>
						<CircleIcon
							className="size-1.5 shrink-0 text-muted-foreground"
							weight="duotone"
							aria-hidden="true"
						/>
						<span className="text-sm">{formatViewCount(viewCount)}</span>
					</div>
				</div>
			</div>
		);
	} catch (error) {
		console.error('Error in ViewsCounter:', error);
		return (
			<div className="fade-in flex max-w-none items-center gap-4 py-6">
				<Avatar className="size-12 shrink-0">
					<AvatarFallback>{fullNameInitials}</AvatarFallback>
				</Avatar>
				<div className="inline-flex select-none flex-col gap-1 overflow-hidden leading-tight">
					<p className="font-medium text-primary">{article.author}</p>
					<div className="inline-flex items-center gap-x-2">
						<time className="text-muted-foreground text-sm" dateTime={article.date}>
							{formatDate(article.date)}
						</time>
						<CircleIcon
							className="size-1.5 shrink-0 text-muted-foreground"
							weight="duotone"
							aria-hidden="true"
						/>
						<span className="text-sm">Aucune vue</span>
					</div>
				</div>
			</div>
		);
	}
};
