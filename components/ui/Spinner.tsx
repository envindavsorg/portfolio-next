import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

const loadingVariants = cva(
	'direction-alternate animate-pulse rounded-full duration-700',
	{
		variants: {
			variant: {
				default: 'bg-theme',
				blue: 'bg-blue-600 dark:bg-blue-300',
			},
			size: {
				default: 'size-2.5',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

interface Props
	extends React.ComponentProps<'div'>,
		VariantProps<typeof loadingVariants> {}

export const Spinner = ({
	className,
	variant,
	size,
	...props
}: Props): React.JSX.Element => (
	<div
		className={cn('flex items-center justify-center gap-1', className)}
		{...props}
	>
		<div className={cn(loadingVariants({ variant, size }))} />
		<div className={cn(loadingVariants({ variant, size }), 'delay-100')} />
		<div className={cn(loadingVariants({ variant, size }), 'delay-300')} />
		<div className={cn(loadingVariants({ variant, size }), 'delay-500')} />
	</div>
);
