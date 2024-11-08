'use client';

import { useCommandContext } from '@/components/command/CommandContext';
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
import { File, X } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useCallback } from 'react';

export const CommandMenu = () => {
	const router = useRouter();
	const { open, setOpen } = useCommandContext();

	const runCommand = useCallback((command: () => unknown) => {
		setOpen(false);
		setTimeout(() => {
			command();
		}, 1000);
	}, []);

	return (
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
					{navigation.map(({ description, link }: Navigation, idx: number) => (
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
					))}
				</CommandGroup>
				<CommandGroup heading="Contact :">
					{contact.map(
						({ name, description, url, icon: Icon }: Contact, idx: number) => (
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
	);
};
