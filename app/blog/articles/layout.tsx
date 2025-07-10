import type React from 'react';

interface ArticleLayoutProps {
	children: React.ReactNode;
}

const ArticleLayout = ({ children }: ArticleLayoutProps): React.JSX.Element => (
	<article className="prose prose-neutral dark:prose-invert max-w-none">
		{children}
	</article>
);

export default ArticleLayout;
