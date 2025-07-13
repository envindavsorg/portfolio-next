import type React from 'react';
import { memo } from 'react';
import { FadeIn } from '@/components/blocs/FadeIn';
import { cn } from '@/lib/utils';

interface PageParagraphProps {
	children: React.ReactNode;
	className?: string;
}

const PageParagraph = memo(
	({ children, className }: PageParagraphProps): React.JSX.Element => (
		<FadeIn>
			<p
				className={cn(
					'text-neutral-600 text-sm leading-8 sm:text-base dark:text-neutral-300',
					className,
				)}
			>
				{children}
			</p>
		</FadeIn>
	),
);

PageParagraph.displayName = 'PageParagraph';

export default PageParagraph;
