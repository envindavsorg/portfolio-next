import { Article } from '@/components/blog/Article';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import type { ArticleWithSlug } from '@/lib/articles';
import { ArticleNyTimes } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';

interface ArticlesProps {
	articles: ArticleWithSlug[];
}

export const Articles = ({ articles }: ArticlesProps): React.JSX.Element => (
	<ul className="animated-list flex list-none flex-col pl-0">
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
			<Article key={`${article.slug}-${idx}`} article={article} />
		))}
	</ul>
);
