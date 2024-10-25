import { cn } from '@/lib/utils';
import { Caveat } from 'next/font/google';
import type React from 'react';

const caveat = Caveat({
	weight: '600',
	style: 'normal',
	subsets: ['latin'],
	display: 'swap',
});

interface TypographyProps {
	children: React.ReactNode;
}

export const Title = ({ children }: TypographyProps) => (
	<h1
		className={cn(
			'fade-in mb-0 pt-6 text-2xl text-theme sm:pt-12',
			caveat.className,
		)}
	>
		{children}
	</h1>
);

export const Paragraph = ({ children }: TypographyProps) => (
	<p className={cn('text-2xl text-theme', caveat.className)}>{children}</p>
);
