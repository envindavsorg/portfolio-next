'use client';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';
import { Pen } from '@phosphor-icons/react';
import type { DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import type React from 'react';
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	type MutableRefObject,
	forwardRef,
	useRef,
} from 'react';

const Command = forwardRef<
	ElementRef<typeof CommandPrimitive>,
	ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
	<CommandPrimitive
		ref={ref}
		className={cn(
			'flex size-full flex-col overflow-hidden rounded-md bg-background text-switch',
			className,
		)}
		{...props}
	/>
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
	const ref: MutableRefObject<HTMLDivElement | null> =
		useRef<HTMLDivElement | null>(null);

	const bounce = (): void => {
		const { current } = ref;

		if (current) {
			current.classList.add('scale-95');

			setTimeout(() => {
				if (current) {
					current.classList.remove('scale-95');
				}
			}, 100);
		}
	};

	return (
		<Dialog {...props}>
			<DialogContent
				className="overflow-hidden p-3"
				ref={ref}
				onKeyDown={(event: React.KeyboardEvent) => {
					const { key } = event;

					if (key === 'Enter' || key === 'Backspace') {
						bounce();
					}
				}}
			>
				<Command
					className={cn(
						'[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium',
						'[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0',
						'[&_[cmdk-group]]:px-0 [&_[cmdk-input-wrapper]_svg]:h-5',
						'[&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12',
						'[&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5',
					)}
				>
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
};

const CommandInput = forwardRef<
	ElementRef<typeof CommandPrimitive.Input>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
	<div
		className={cn(
			'flex items-center gap-x-2 border-border border-b',
			className,
		)}
		cmdk-input-wrapper=""
	>
		<Pen className="size-5" />
		<CommandPrimitive.Input
			ref={ref}
			className="h-11 w-full rounded-none bg-transparent py-3 font-geist-sans text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
			{...props}
		/>
	</div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = forwardRef<
	ElementRef<typeof CommandPrimitive.List>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.List
		ref={ref}
		className={cn('scrollbar-hide max-h-[400px] overflow-auto', className)}
		{...props}
	/>
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = forwardRef<
	ElementRef<typeof CommandPrimitive.Empty>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
	<CommandPrimitive.Empty ref={ref} className="py-3" {...props} />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = forwardRef<
	ElementRef<typeof CommandPrimitive.Group>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Group
		ref={ref}
		className={cn(
			'overflow-hidden text-foreground',
			'[&_[cmdk-group-heading]]:flex [&_[cmdk-group-heading]]:items-center',
			'[&_[cmdk-group-heading]]:px-2',
			'[&_[cmdk-group-heading]]:py-0',
			'[&_[cmdk-group-heading]]:mb-2',
			'[&_[cmdk-group-heading]]:font-medium',
			'[&_[cmdk-group-heading]]:text-muted-foreground',
			'[&_[cmdk-group-heading]]:text-xs',
			'[&_[cmdk-group-heading]]:select-none',
			className,
		)}
		{...props}
	/>
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = forwardRef<
	ElementRef<typeof CommandPrimitive.Separator>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Separator
		ref={ref}
		className={cn('-mx-1 h-px bg-border', className)}
		{...props}
	/>
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = forwardRef<
	ElementRef<typeof CommandPrimitive.Item>,
	ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Item
		ref={ref}
		className={cn(
			'relative h-12 cursor-pointer select-none rounded-lg px-4 py-0 text-sm outline-none',
			'flex items-center gap-2',
			'duration transition-all transition-none ease-[ease] will-change-[background,color]',
			'aria-selected:bg-accent aria-selected:text-accent-foreground',
			'data-[disabled="true"]:pointer-events-none data-[disabled="true"]:opacity-50',
			className,
		)}
		style={{ contentVisibility: 'auto' }}
		{...props}
	/>
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span
			className={cn(
				'ml-auto text-muted-foreground text-sm tracking-widest',
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
