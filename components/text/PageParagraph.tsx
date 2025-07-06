import type React from 'react';
import { memo } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

interface PageParagraphProps {
	children: React.ReactNode;
	className?: string;
}

const PageParagraph = memo(
	({ children, className }: PageParagraphProps): React.JSX.Element => (
		<FadeIn>
			<p className={cn('text-base leading-8 md:text-lg', className)}>{children}</p>
		</FadeIn>
	),
);

PageParagraph.displayName = 'PageParagraph';

export default PageParagraph;
