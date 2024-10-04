import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import type React from 'react';

interface ArticleTitleProps {
	className?: string;
	children: React.ReactNode;
}

export const ArticleTitle = ({
	className,
	children,
}: ArticleTitleProps): React.JSX.Element => (
	<Link
		href="/blog"
		aria-label="Retourner à la liste des articles"
		className={cn(
			'fade-in mb-8 flex font-bold font-geist-sans text-3xl text-theme md:text-4xl',
			className,
		)}
	>
		{children}
	</Link>
);
