'use client';

import { Alert, AlertDescription } from '@/components/ui/Alert';
import type { ArticleWithSlug } from '@/lib/articles';
import { getRelativeCoordinates } from '@/lib/utils';
import { ArticleNyTimes } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import type { RefObject } from 'react';
import { useRef, useState } from 'react';
import { Article } from './Article';

interface ArticlesProps {
	isLanding?: boolean;
	isBlog?: boolean;
	articles: ArticleWithSlug[];
}

export const Articles = ({
	isLanding,
	isBlog,
	articles,
}: ArticlesProps): React.JSX.Element => {
	const [mousePosition, setMousePosition] = useState({
		x: 240,
		y: 0,
	});

	const listRef: RefObject<HTMLUListElement | null> = useRef(null);

	const handleMouseMove = (event: React.MouseEvent<HTMLUListElement>): void => {
		setMousePosition(getRelativeCoordinates(event, listRef.current));
	};

	return (
		<ul
			ref={listRef}
			onMouseMove={(event) => handleMouseMove(event)}
			className="animated-list flex list-none flex-col pl-0"
		>
			{articles.length === 0 && (
				<Alert>
					<AlertDescription className="flex items-center gap-3">
						<ArticleNyTimes className="size-6 shrink-0 text-theme" />{' '}
						<span className="text-sm">
							Aucun article pour le moment, venez voir plus tard !
						</span>
					</AlertDescription>
				</Alert>
			)}

			{articles.map((article: ArticleWithSlug, idx: number) => (
				<Article
					key={`${article.slug}-${idx}`}
					article={article}
					mousePosition={mousePosition}
					isLanding={isLanding}
					isBlog={isBlog}
				/>
			))}
		</ul>
	);
};
