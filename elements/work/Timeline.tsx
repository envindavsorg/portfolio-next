'use client';

import { MotionTimelineItem } from '@/elements/work/TimelineItem';
import { posts } from '@/elements/work/posts';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

export const Timeline = () => {
	return (
		<section>
			<AnimatePresence mode="popLayout" initial={false}>
				{posts.map((post, index) => (
					<MotionTimelineItem
						key={post.title}
						post={post}
						drawLine={index < posts.length - 1}
						transition={{ duration: 0.2 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						layout
					/>
				))}
			</AnimatePresence>
		</section>
	);
};
