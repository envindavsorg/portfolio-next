'use client';

import { useIntersectionObserver } from '@uidotdev/usehooks';
import type { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface IntersectionSwapProps {
	children: ReactNode;
	element: ReactNode;
}

export const IntersectionSwap: FC<IntersectionSwapProps> = ({ children, element }) => {
	const [ref, entry] = useIntersectionObserver({
		threshold: 0,
		root: null,
		rootMargin: '-100px',
	});
	const show: boolean = entry?.isIntersecting === false;

	return (
		<>
			<div
				className={cn(
					'-mx-px sticky top-6 z-[9999] transition duration-75 will-change-transform',
					show ? 'opacity-100' : '-translate-y-2 scale-95 opacity-0',
				)}
			>
				{element}
			</div>
			<div ref={ref}>
				<div
					className={cn(
						'transition duration-150 will-change-transform',
						show ? '-translate-y-2 scale-[0.98] opacity-0' : 'opacity-100 delay-100',
					)}
				>
					{children}
				</div>
			</div>
		</>
	);
};
