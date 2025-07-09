import { Link } from 'next-view-transitions';
import type React from 'react';
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface ArticleTitleProps {
	className?: string;
	children: React.ReactNode;
}

export const ArticleTitle = memo(
	({ className, children }: ArticleTitleProps): React.JSX.Element => (
		<div className="flex flex-col">
			<Link
				href="/blog"
				aria-label="Retourner à la liste des articles"
				className="fade-in mb-2 flex items-center gap-x-2 ps-5 font-hubot text-sm text-theme no-underline transition-colors hover:text-theme/80 sm:text-base"
			>
				- tous les articles que j'ai écrit
			</Link>

			<h1
				className={cn(
					'fade-in font-extrabold font-hubot text-3xl text-foreground md:text-4xl',
					className,
				)}
			>
				{children}
			</h1>
		</div>
	),
);

ArticleTitle.displayName = 'ArticleTitle';
