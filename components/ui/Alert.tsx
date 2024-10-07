import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type React from 'react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

const alertVariants = cva(
	'relative w-full rounded-md border border-border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground',
				destructive:
					'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

const Alert = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(
	(
		{
			className,
			variant,
			...props
		}: React.HTMLAttributes<HTMLDivElement> &
			VariantProps<typeof alertVariants>,
		ref,
	): React.JSX.Element => (
		<div
			ref={ref}
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	),
);
Alert.displayName = 'Alert';

const AlertTitle = forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(
	(
		{ className, ...props }: HTMLAttributes<HTMLHeadingElement>,
		ref,
	): React.JSX.Element => (
		<h5
			ref={ref}
			className={cn('mb-1 font-medium leading-none tracking-tight', className)}
			{...props}
		/>
	),
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(
	(
		{ className, ...props }: HTMLAttributes<HTMLParagraphElement>,
		ref,
	): React.JSX.Element => (
		<div
			ref={ref}
			className={cn('text-sm [&_p]:my-0 [&_p]:leading-relaxed', className)}
			{...props}
		/>
	),
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
