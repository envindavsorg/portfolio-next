'use client';

import { cn } from '@/lib/utils';
import { CaretDown } from '@phosphor-icons/react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import type React from 'react';
import { forwardRef } from 'react';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(
	(
		{
			className,
			...props
		}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
		ref,
	): React.JSX.Element => (
		<AccordionPrimitive.Item ref={ref} className={className} {...props} />
	),
);
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
	(
		{
			className,
			children,
			...props
		}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
		ref,
	): React.JSX.Element => (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				ref={ref}
				className={cn(
					'flex flex-1 items-center gap-x-6 py-3 text-start transition-all [&[data-state=open]>svg]:rotate-180',
					className,
				)}
				{...props}
			>
				{children}
				<CaretDown
					className="size-4 shrink-0 text-foreground transition-transform duration-200"
					weight="bold"
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	),
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(
	(
		{
			className,
			children,
			...props
		}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
		ref,
	): React.JSX.Element => (
		<AccordionPrimitive.Content
			ref={ref}
			className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
			{...props}
		>
			<div className={cn(className, 'pt-1.5')}>{children}</div>
		</AccordionPrimitive.Content>
	),
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
