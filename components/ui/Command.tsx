'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';
import { MagnifyingGlass } from '@phosphor-icons/react';
import type { DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import type React from 'react';
import type { ComponentPropsWithoutRef, ComponentRef, RefObject } from 'react';
import { forwardRef, useRef } from 'react';

const Command = forwardRef<
	ComponentRef<typeof CommandPrimitive>,
	ComponentPropsWithoutRef<typeof CommandPrimitive>
>(
	(
		{ className, ...props }: ComponentPropsWithoutRef<typeof CommandPrimitive>,
		ref,
	): React.JSX.Element => (
		<CommandPrimitive
			ref={ref}
			className={cn(
				'flex size-full flex-col overflow-hidden rounded-md bg-background text-foreground',
				className,
			)}
			{...props}
		/>
	),
);
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({
	children,
	...props
}: CommandDialogProps): React.JSX.Element => {
	const ref: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(
		null,
	);

	const bounce = (): void => {
		const { current } = ref;

		if (current) {
			current.classList.add('scale-95');

			setTimeout((): void => {
				if (current) {
					current.classList.remove('scale-95');
				}
			}, 100);
		}
	};

	return (
		<Dialog {...props}>
			<DialogTitle className="sr-only">
				Menu avec les différents contenus et commandes
			</DialogTitle>
			<DialogContent
				className="max-w-lg overflow-hidden p-0"
				ref={ref as RefObject<HTMLDivElement>}
				onKeyDown={(event: React.KeyboardEvent): void => {
					if (event.key === 'Enter' || event.key === 'Backspace') {
						bounce();
					}
				}}
			>
				<Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
};

const CommandInput = forwardRef<
	ComponentRef<typeof CommandPrimitive.Input>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(
	(
		{
			className,
			...props
		}: ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
		ref,
	): React.JSX.Element => (
		<div
			className={cn(
				'flex items-center border-neutral-200 border-b px-3 dark:border-neutral-700',
				className,
			)}
			cmdk-input-wrapper=""
		>
			<MagnifyingGlass
				className="mr-2 size-5 shrink-0 opacity-50"
				weight="duotone"
			/>
			<CommandPrimitive.Input
				ref={ref}
				className="w-full rounded-none bg-transparent py-3 font-geist-sans text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
				{...props}
			/>
		</div>
	),
);

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = forwardRef<
	ComponentRef<typeof CommandPrimitive.List>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(
	(
		{
			className,
			...props
		}: ComponentPropsWithoutRef<typeof CommandPrimitive.List>,
		ref,
	): React.JSX.Element => (
		<CommandPrimitive.List
			ref={ref}
			className={cn('scrollbar-hide max-h-[400px] overflow-auto', className)}
			{...props}
		/>
	),
);

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = forwardRef<
	ComponentRef<typeof CommandPrimitive.Empty>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(
	(props, ref): React.JSX.Element => (
		<CommandPrimitive.Empty
			ref={ref}
			className="py-6 text-center text-sm"
			{...props}
		/>
	),
);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = forwardRef<
	ComponentRef<typeof CommandPrimitive.Group>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(
	(
		{
			className,
			...props
		}: ComponentPropsWithoutRef<typeof CommandPrimitive.Group>,
		ref,
	): React.JSX.Element => (
		<CommandPrimitive.Group
			ref={ref}
			className={cn(
				'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-theme [&_[cmdk-group-heading]]:text-xs sm:[&_[cmdk-group-heading]]:font-geist-sans',
				className,
			)}
			{...props}
		/>
	),
);

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = forwardRef<
	ComponentRef<typeof CommandPrimitive.Separator>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(
	(
		{
			className,
			...props
		}: ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>,
		ref,
	): React.JSX.Element => (
		<CommandPrimitive.Separator
			ref={ref}
			className={cn('-mx-1 h-px bg-border', className)}
			{...props}
		/>
	),
);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = forwardRef<
	ComponentRef<typeof CommandPrimitive.Item>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(
	(
		{
			className,
			...props
		}: ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
		ref,
	): React.JSX.Element => (
		<CommandPrimitive.Item
			ref={ref}
			className={cn(
				'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50',
				className,
			)}
			style={{ contentVisibility: 'auto' }}
			{...props}
		/>
	),
);

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>): React.JSX.Element => {
	return (
		<span
			className={cn(
				'ml-auto cursor-pointer text-muted-foreground text-sm tracking-widest',
				className,
			)}
			{...props}
		/>
	);
};
CommandShortcut.displayName = 'CommandShortcut';

export {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator,
};
