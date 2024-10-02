'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type SectionProps = {
	heading: string;
	headingAlignment?: 'right' | 'left';
	children: ReactNode;
	invert?: boolean;
};

export const Section = ({
	heading,
	headingAlignment,
	children,
	invert = false,
}: SectionProps) => (
	<section className="col-reverse flex flex-col gap-2 md:flex-row md:items-center md:gap-9">
		<h2
			className={cn(
				'shrink-0 font-bold text-sm tracking-tight md:w-32',
				headingAlignment === 'right' && 'md:text-right',
				invert ? 'font-medium text-theme' : 'text-foreground',
			)}
		>
			{heading}
		</h2>
		{children}
	</section>
);
