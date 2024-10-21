'use client';

import { CommandToolbar } from '@/components/command/CommandToolbar';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from '@/components/ui/Command';
import { type Contact, contact } from '@/resources/contact';
import { type Links, links } from '@/resources/links';
import { type Navigation, navigation } from '@/resources/navigation';
import { Command, File, X } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';

export const CommandMenu = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const down = (event: KeyboardEvent) => {
			if (
				(event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
				event.key === '/'
			) {
				if (
					(event.target instanceof HTMLElement &&
						event.target.isContentEditable) ||
					event.target instanceof HTMLInputElement ||
					event.target instanceof HTMLTextAreaElement ||
					event.target instanceof HTMLSelectElement
				) {
					return;
				}

				event.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	const runCommand = useCallback((command: () => unknown) => {
		setOpen(false);
		setTimeout(() => {
			command();
		}, 1000);
	}, []);

	return (
		<>
			<p
				className="!cursor-pointer fixed right-0 bottom-0 left-0 mx-auto hidden w-full max-w-[70ch] border-t border-t-neutral-200 bg-background px-1 py-2 text-center font-medium text-muted-foreground text-sm lg:inline-block dark:border-neutral-700 print:hidden"
				onClick={() => setOpen(true)}
			>
				Appuyez sur{' '}
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-200 bg-muted px-1.5 font-bold font-mono text-[10px] text-foreground opacity-100 dark:border-neutral-700">
					<span className="text-xs">⌘</span>K
				</kbd>{' '}
				pour ouvrir le menu de commandes.
			</p>

			<button
				className="fixed top-4 right-4 flex items-center justify-center rounded-full border border-neutral-200 bg-background p-2 lg:hidden dark:border-neutral-700 print:hidden"
				aria-label="Effectuer une recherche sur mon site"
				onClick={() => setOpen(true)}
				type="button"
			>
				<Command className="size-7 shrink-0 text-foreground" weight="duotone" />
			</button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<div className="relative">
					<CommandInput placeholder="Tapez une commande ou recherchez ..." />
					<CommandShortcut
						className="-translate-y-1/2 absolute top-1/2 right-3 transform"
						onClick={() => setOpen(false)}
					>
						<X
							className="size-4 shrink-0 text-destructive opacity-90"
							weight="bold"
						/>
						<span className="sr-only">Fermer</span>
					</CommandShortcut>
				</div>

				<CommandToolbar />

				<CommandList>
					<CommandEmpty>Aucun résultat ...</CommandEmpty>
					<CommandGroup heading="Pages et plan du site :">
						{navigation.map(
							({ description, link }: Navigation, idx: number) => (
								<CommandItem
									key={`link-${idx}`}
									value={description}
									onSelect={() => {
										runCommand(() => router.push(link));
									}}
								>
									<File className="mr-2 size-5 shrink-0" />
									{description}
								</CommandItem>
							),
						)}
					</CommandGroup>
					<CommandGroup heading="Contact :">
						{contact.map(
							(
								{ name, description, url, icon: Icon }: Contact,
								idx: number,
							) => (
								<CommandItem
									key={`link-${idx}-${name}`}
									onSelect={() => {
										setOpen(false);
										window.open(url, '_self');
									}}
								>
									<Icon className="mr-2 size-5 shrink-0" />
									<span>{description}</span>
								</CommandItem>
							),
						)}
					</CommandGroup>
					<CommandGroup heading="Liens :">
						{links.map(
							({ name, description, url, icon: Icon }: Links, idx: number) => (
								<CommandItem
									key={`link-${idx}-${name}`}
									onSelect={() => {
										setOpen(false);
										window.open(url, '_self');
									}}
								>
									<Icon className="mr-2 size-5 shrink-0" />
									<span>{description}</span>
								</CommandItem>
							),
						)}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};
