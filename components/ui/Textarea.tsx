import { cn } from '@/lib/utils';
import type React from 'react';
import { forwardRef } from 'react';

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'flex min-h-32 w-full px-3 py-2 text-base',
					'placeholder:text-muted-foreground',
					'focus-visible:outline-none focus-visible:ring-0',
					'disabled:cursor-not-allowed disabled:opacity-50',
					'rounded-md border border-border bg-background',
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Textarea.displayName = 'Textarea';

export { Textarea };
