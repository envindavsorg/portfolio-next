import type React from 'react';

interface ArticleLayoutProps {
	children: React.ReactNode;
}

const ArticleLayout = ({ children }: ArticleLayoutProps): React.JSX.Element => (
	<div className="container flex min-h-screen max-w-2xl flex-col">
		<main className="flex flex-1 flex-col">
			<article className="prose prose-neutral dark:prose-invert max-w-none">
				{children}
			</article>
		</main>
	</div>
);

export default ArticleLayout;
