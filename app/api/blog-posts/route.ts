import { getAllArticles } from '@/lib/articles';
import { NextResponse } from 'next/server';

export interface GetBlogPosts {
	slug: string;
	author: string;
	date: string;
	title: string;
	description: string;
}

export const GET = async () => {
	try {
		const articles: GetBlogPosts[] = await getAllArticles();

		return NextResponse.json(
			articles.map((post) => {
				return {
					slug: post.slug,
					author: post.author,
					date: post.date,
					title: post.title,
					description: post.description,
				};
			}),
		);
	} catch (error) {
		return NextResponse.json({ error });
	}
};
