'use client';

import { Motion } from '@/components/motion/Motion';
import { variantsSeven } from '@/components/motion/variants';
import { getRelativeCoordinates } from '@/lib/utils';
import type React from 'react';
import { useRef, useState } from 'react';
import { Article } from './Article';

export const ArticlesList = ({ posts }: any) => {
	const [mousePosition, setMousePosition] = useState({
		x: 240,
		y: 0,
	});

	const listRef: React.MutableRefObject<null> = useRef(null);
	const handleMouseMove = (event: React.MouseEvent<HTMLUListElement>): void => {
		setMousePosition(getRelativeCoordinates(event, listRef.current));
	};

	return (
		<Motion variants={variantsSeven}>
			<ul
				ref={listRef}
				onMouseMove={(e) => handleMouseMove(e)}
				className="animated-list mt-6 flex flex-col"
			>
				{posts.length === 0 && <p>No posts found</p>}
				{posts.map((post: { slug: any }) => (
					<Article key={post.slug} post={post} mousePosition={mousePosition} />
				))}
			</ul>
		</Motion>
	);
};
