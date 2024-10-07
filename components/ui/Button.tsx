import { cn } from '@/lib/utils';
import { Slot, type SlotProps } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import type React from 'react';
import { forwardRef } from 'react';

const buttonVariants = cva(
	'inline-flex cursor-pointer items-center justify-center rounded-md font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-transparent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-3 text-sm',
				xs: 'h-5 px-2 text-sm',
				sm: 'h-9 rounded-md px-3 text-sm',
				lg: 'h-11 rounded-md px-8 text-sm',
				xl: 'h-12 rounded-md px-8 text-base',
				icon: 'size-7',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant, size, asChild = false, ...props }: ButtonProps,
		ref,
	): React.JSX.Element => {
		const Comp:
			| React.ForwardRefExoticComponent<
					SlotProps & React.RefAttributes<HTMLElement>
			  >
			| string = asChild ? Slot : 'button';

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
