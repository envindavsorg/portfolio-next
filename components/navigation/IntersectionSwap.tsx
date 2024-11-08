'use client';

import { cn } from '@/lib/utils';
import type React from 'react';
import { useRef } from 'react';
import { useIntersection } from 'react-use';

interface IntersectionSwapProps {
	children: React.ReactNode;
	nav: React.ReactNode;
}

export const IntersectionSwap = ({
	children,
	nav,
}: IntersectionSwapProps): React.JSX.Element => {
	const intersectionRef: React.RefObject<HTMLDivElement | null> =
		useRef<HTMLDivElement | null>(null);

	const intersection: IntersectionObserverEntry | null = useIntersection(
		intersectionRef as React.RefObject<HTMLDivElement>,
		{
			root: null,
			rootMargin: '-100px',
		},
	);

	let showPrimary = false;
	if (intersection && !intersection.isIntersecting) {
		showPrimary = true;
	}

	return (
		<>
			<div
				className={cn(
					'-mx-px sticky top-6 z-[9999] transition duration-75 will-change-transform',
					!showPrimary && '-translate-y-2 scale-95 opacity-0',
					showPrimary && 'opacity-100',
				)}
			>
				{nav}
			</div>
			<div ref={intersectionRef}>
				<div
					className={cn(
						'transition duration-150 will-change-transform',
						showPrimary && '-translate-y-2 scale-[0.98] opacity-0',
						!showPrimary && 'opacity-100 delay-100',
					)}
				>
					{children}
				</div>
			</div>
		</>
	);
};
