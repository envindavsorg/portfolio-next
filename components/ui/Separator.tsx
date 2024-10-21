'use client';

import { cn } from '@/lib/utils';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import type React from 'react';
import { forwardRef } from 'react';

const Separator = forwardRef<
	React.ComponentRef<typeof SeparatorPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
	(
		{
			className,
			orientation = 'horizontal',
			decorative = true,
			...props
		}: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
			decorative?: boolean;
			orientation?: 'horizontal' | 'vertical';
		},
		ref,
	): React.JSX.Element => (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'shrink-0 bg-border',
				orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
				className,
			)}
			{...props}
		/>
	),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
