'use client';

import { cn } from '@/lib/utils';
import * as LabelPrimitive from '@radix-ui/react-label';
import { type VariantProps, cva } from 'class-variance-authority';
import type React from 'react';
import { forwardRef } from 'react';

const labelVariants = cva(
	'font-geist-sans font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

const Label = forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants>
>(
	(
		{
			className,
			...props
		}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
		ref,
	): React.JSX.Element => (
		<LabelPrimitive.Root
			ref={ref}
			className={cn(labelVariants(), className)}
			{...props}
		/>
	),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
