import type { Metadata } from 'next';
import type React from 'react';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/metadata';
import { getPost } from '@/lib/posts';
import { baseURL } from '@/resources/config';

interface ArticleLayoutProps {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPost(slug);

	if (!post) {
		return constructMetadata();
	}

	const canonicalUrl = `https://${baseURL}/blog/articles/${slug}`;
	const imageUrl = post.image 
		? `https://${baseURL}/blog/articles/${slug}/${post.image}`
		: `https://${baseURL}/api/og?heading=${encodeURIComponent(post.title)}&type=article&mode=dark`;

	return constructMetadata({
		title: post.title,
		description: post.description,
		image: imageUrl,
		canonicalUrl,
		tags: post.tags,
		publishedTime: post.date,
		modifiedTime: post.date,
		type: 'article',
	});
}

const ArticleLayout = async ({ children, params }: ArticleLayoutProps): Promise<React.JSX.Element> => {
	const { slug } = await params;
	const post = await getPost(slug);

	if (!post) {
		notFound();
	}

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.description,
		image: post.image 
			? `https://${baseURL}/blog/articles/${slug}/${post.image}`
			: `https://${baseURL}/api/og?heading=${encodeURIComponent(post.title)}&type=article&mode=dark`,
		datePublished: post.date,
		dateModified: post.date,
		author: {
			'@type': 'Person',
			name: post.author,
			url: `https://${baseURL}`,
		},
		publisher: {
			'@type': 'Person',
			name: 'Cuzeac Florin',
			url: `https://${baseURL}`,
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://${baseURL}/blog/articles/${slug}`,
		},
		keywords: post.tags?.join(', '),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<article className="prose prose-neutral dark:prose-invert max-w-none">
				{children}
			</article>
		</>
	);
};

export default ArticleLayout;
