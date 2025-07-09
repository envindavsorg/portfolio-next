import { ArticleNyTimesIcon } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { memo } from 'react';
import { Article } from '@/components/blog/Article';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import type { ArticleWithSlug } from '@/lib/articles';

interface ArticlesProps {
	articles: ArticleWithSlug[];
}

export const Articles = memo(
	({ articles }: ArticlesProps): React.JSX.Element => (
		<ul className="animated-list flex flex-col gap-y-3">
			{articles.length === 0 && (
				<Alert>
					<AlertDescription className="flex items-center gap-3">
						<ArticleNyTimesIcon className="size-6 shrink-0 text-theme" />{' '}
						<span className="text-sm">
							Aucun article pour le moment, venez voir plus tard !
						</span>
					</AlertDescription>
				</Alert>
			)}

			{articles.map((article: ArticleWithSlug) => (
				<Article key={article.slug} article={article} />
			))}
		</ul>
	),
);

Articles.displayName = 'Articles';
