import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type React from 'react';

const badgeVariants = cva(
	'inline-flex items-center rounded-md p-1 font-bold text-sm leading-4 no-underline',
	{
		variants: {
			variant: {
				default:
					'border border-neutral-200 bg-orange-50 text-foreground dark:border-neutral-700 dark:bg-neutral-800',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

const Badge = ({
	className,
	variant,
	...props
}: BadgeProps): React.JSX.Element => (
	<span className={cn(badgeVariants({ variant }), className)} {...props} />
);

export { Badge, badgeVariants };
