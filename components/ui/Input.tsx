import { cn } from '@/lib/utils';
import type React from 'react';
import { forwardRef } from 'react';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }: InputProps, ref): React.JSX.Element => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-11 w-full px-3 py-2 text-base',
					'placeholder:text-muted-foreground',
					'focus-visible:outline-none focus-visible:ring-0',
					'disabled:cursor-not-allowed disabled:opacity-50',
					'rounded-md border border-neutral-200 dark:border-neutral-700 bg-background',
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input };
