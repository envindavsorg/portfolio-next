'use client';

import { cn } from '@/lib/utils';
import { X } from '@phosphor-icons/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { DialogContentProps } from '@radix-ui/react-dialog';
import type React from 'react';
import { forwardRef } from 'react';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(
	(
		{
			className,
			...props
		}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
		ref,
	): React.JSX.Element => (
		<DialogPrimitive.Overlay
			ref={ref}
			className={cn(
				'fixed inset-0 z-50 bg-black/80',
				'data-[state=closed]:fade-out-0 data-[state=closed]:animate-out',
				'data-[state=open]:fade-in-0 data-[state=open]:animate-in',
				className,
			)}
			{...props}
		/>
	),
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(
	(
		{ className, children, ...props }: DialogContentProps,
		ref,
	): React.JSX.Element => (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					'fixed top-[50%] left-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 duration-200',
					'w-11/12 max-w-xl rounded-md border border-border border-dashed bg-background p-6',
					'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=closed]:animate-out',
					'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:animate-in',
					className,
				)}
				{...props}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogPortal>
	),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
	<div
		className={cn('flex items-center justify-between', className)}
		{...props}
	>
		{children}
		<DialogPrimitive.Close
			className={cn(
				'ms-auto rounded-sm outline-0',
				'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
				'disabled:pointer-events-none',
				'focus:outline-none focus:outline-0 focus:ring-0',
				'transition-opacity hover:opacity-100',
			)}
		>
			<X className="size-5 text-red-600 dark:text-red-300" />
			<span className="sr-only">Fermer</span>
		</DialogPrimitive.Close>
	</div>
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
	<div
		className={cn(
			'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
			className,
		)}
		{...props}
	/>
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(
	(
		{ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>,
		ref,
	): React.JSX.Element => (
		<DialogPrimitive.Title
			ref={ref}
			className={cn(
				'font-semibold text-lg leading-none tracking-tight',
				className,
			)}
			{...props}
		/>
	),
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(
	(
		{ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>,
		ref,
	): React.JSX.Element => (
		<DialogPrimitive.Description
			ref={ref}
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	),
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogClose,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
