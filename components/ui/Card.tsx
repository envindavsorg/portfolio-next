import { cn } from '@/lib/utils';
import type React from 'react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }: HTMLAttributes<HTMLDivElement>, ref) => (
		<div
			ref={ref}
			className={cn(
				'rounded-lg border border-neutral-200 bg-background text-card-foreground shadow-sm dark:border-neutral-700',
				className,
			)}
			{...props}
		/>
	),
);
Card.displayName = 'Card';

const CardHeader = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }: HTMLAttributes<HTMLDivElement>, ref) => (
	<div
		ref={ref}
		className={cn('flex flex-col space-y-1.5 p-6', className)}
		{...props}
	/>
));
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }: HTMLAttributes<HTMLHeadingElement>, ref) => (
	<h3
		ref={ref}
		className={cn(
			'font-semibold text-2xl leading-none tracking-tight',
			className,
		)}
		{...props}
	/>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }: HTMLAttributes<HTMLParagraphElement>, ref) => (
	<p
		ref={ref}
		className={cn('text-muted-foreground text-sm', className)}
		{...props}
	/>
));
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }: HTMLAttributes<HTMLDivElement>, ref) => (
	<div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }: HTMLAttributes<HTMLDivElement>, ref) => (
	<div
		ref={ref}
		className={cn('flex items-center p-6 pt-0', className)}
		{...props}
	/>
));
CardFooter.displayName = 'CardFooter';

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
};
