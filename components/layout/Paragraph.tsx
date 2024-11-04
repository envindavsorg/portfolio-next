// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

import { FadeIn } from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import type React from 'react';
import { memo } from 'react';

export type ParagraphProps = React.HTMLProps<HTMLParagraphElement> & {
	children: React.ReactNode;
	className?: string;
};

export const Paragraph: React.FC<ParagraphProps> = memo(
	({ children, className }) => (
		<FadeIn>
			<p className={cn('text-base leading-8', className)}>{children}</p>
		</FadeIn>
	),
);
