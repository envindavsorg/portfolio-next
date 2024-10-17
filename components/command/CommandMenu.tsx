'use client';

import { Button } from '@/components/ui/Button';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from '@/components/ui/Command';
import { env } from '@/env/client';
import { type Contact, contact } from '@/resources/contact';
import { type Links, links } from '@/resources/links';
import { type Navigation, navigation } from '@/resources/navigation';
import {
	ArrowsOut,
	ArrowsOutCardinal,
	ChartBar,
	File,
	Laptop,
	MagnifyingGlass,
	MoonStars,
	SunDim,
	X,
	XCircle,
} from '@phosphor-icons/react';
import { Smiley } from '@phosphor-icons/react/dist/ssr';
import type { DialogProps } from '@radix-ui/react-dialog';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const CommandMenu = ({ ...props }: DialogProps) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const { setTheme } = useTheme();

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
		command();
	}, []);

	///////////////////////////////////////////////////////////////////////////////////

	const fullscreen = (): void => {
		if (document.fullscreenElement) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}

			setIsFullscreen(false);
		} else {
			document.documentElement.requestFullscreen();
			setIsFullscreen(true);
		}
	};

	const close = (): void => {
		if (window.confirm('Voulez-vous vraiment fermer cette fenêtre ?')) {
			window.close();
		} else {
			toast.success('Très bien, je ne la ferme pas', {
				description: 'Vous avez toujours le choix !',
				duration: 5000,
				icon: <Smiley className="text-green-600 text-xl dark:text-green-300" />,
			});
		}
	};

	return (
		<>
			<Button
				variant="ghost"
				size="icon"
				className="z-20 flex shrink-0 rounded-none"
				aria-labelledby="Effectuer une recherche sur mon site"
				aria-label="Effectuer une recherche sur mon site"
				onClick={() => setOpen(true)}
				{...props}
			>
				<MagnifyingGlass className="size-5 shrink-0" />
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<div className="relative">
					<CommandInput placeholder="Tapez une commande ou recherchez ..." />
					<CommandShortcut
						className="-translate-y-1/2 absolute top-1/2 right-3 transform"
						onClick={() => setOpen(false)}
					>
						<X className="size-4 shrink-0 opacity-70" />
						<span className="sr-only">Fermer</span>
					</CommandShortcut>
				</div>

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
					<CommandGroup heading="Apparence :">
						<CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
							<SunDim className="mr-2 size-5 shrink-0" />
							Mode clair
						</CommandItem>
						<CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
							<MoonStars className="mr-2 size-5 shrink-0" />
							Mode sombre
						</CommandItem>
						<CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
							<Laptop className="mr-2 size-5 shrink-0" />
							Système
						</CommandItem>
					</CommandGroup>
					<CommandGroup heading="Outils :">
						<CommandItem onSelect={() => runCommand(() => fullscreen())}>
							{isFullscreen ? (
								<ArrowsOutCardinal
									className="mr-2 size-5 shrink-0"
									weight="duotone"
								/>
							) : (
								<ArrowsOut className="mr-2 size-5 shrink-0" />
							)}
							{isFullscreen ? (
								<>Quitter le mode plein écran</>
							) : (
								<>Activer le mode plein écran</>
							)}
						</CommandItem>

						<CommandItem onSelect={() => runCommand(() => close())}>
							<XCircle className="mr-2 size-5 shrink-0" />
							Fermer cette fenêtre
						</CommandItem>
					</CommandGroup>
					<CommandGroup heading="Statistiques :">
						<CommandItem
							onSelect={() =>
								runCommand(() =>
									window.open(env.NEXT_PUBLIC_UMAMI_PREVIEW_ENDPOINT, '_blank'),
								)
							}
						>
							<ChartBar className="mr-2 size-5 shrink-0" />
							Voir les statistiques sur Umami
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};
