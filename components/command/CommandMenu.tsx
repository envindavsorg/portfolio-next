'use client';

import { CommandToast } from '@/components/command/CommandToast';
import { CommandToolbar } from '@/components/command/CommandToolbar';
import { Kbd } from '@/components/layout/Kbd';
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
			<CommandToast onClick={() => setOpen(true)}>
				<div className="flex size-[30px] items-center justify-center">
					<Command
						className="size-5 shrink-0 text-foreground"
						weight="duotone"
					/>
				</div>
				<div className="absolute top-0 left-[30px] flex items-center justify-center gap-x-1.5 whitespace-nowrap font-semibold text-foreground text-sm leading-[30px] opacity-100 transition-opacity duration-[0.5s] ease-[ease-in-out]">
					Menu de commandes{' '}
					<Kbd>
						<span className="text-xs">⌘</span>K
					</Kbd>
				</div>
			</CommandToast>

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
