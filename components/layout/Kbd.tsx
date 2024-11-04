// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

import { cn } from '@/lib/utils';
import type React from 'react';
import { memo } from 'react';

export type KbdProps = React.HTMLProps<HTMLElement> & {
	children: React.ReactNode;
	className?: string;
};

export const Kbd: React.FC<KbdProps> = memo(({ children, className }) => (
	<kbd
		className={cn(
			'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-200 bg-muted px-1 font-extrabold font-mono text-[10px] text-foreground opacity-100 dark:border-neutral-700',
			className,
		)}
	>
		{children}
	</kbd>
));
