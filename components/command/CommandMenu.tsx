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
	CloudMoon,
	Command,
	File,
	Printer,
	ReadCvLogo,
	Smiley,
	Sun,
	X,
	XCircle,
} from '@phosphor-icons/react';
import type { DialogProps } from '@radix-ui/react-dialog';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const CommandMenu = ({ ...props }: DialogProps) => {
	const router = useRouter();

	const { systemTheme, theme, setTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState<string | undefined>(
		undefined,
	);
	const [open, setOpen] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);

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

	useEffect(() => {
		setCurrentTheme(theme === 'system' ? systemTheme : theme);
	}, [theme, systemTheme]);

	const toggleTheme = (): void => {
		if (currentTheme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	const runCommand = useCallback((command: () => unknown) => {
		setOpen(false);
		command();
	}, []);

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

			<Button
				variant="ghost"
				className="fixed right-4 bottom-4 flex h-14 rounded-full border border-neutral-200 bg-background lg:hidden dark:border-neutral-700 print:hidden"
				aria-labelledby="Effectuer une recherche sur mon site"
				aria-label="Effectuer une recherche sur mon site"
				onClick={() => setOpen(true)}
				{...props}
			>
				<Command className="size-7 shrink-0" weight="duotone" />
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

				<div className="mx-2 my-2.5 grid grid-cols-5 gap-3 min-[530px]:grid-cols-6">
					<Button
						onClick={toggleTheme}
						variant="ghost"
						aria-labelledby="Activer ou désactiver le thème clair ou sombre sur le site"
						aria-label="Activer ou désactiver le thème clair ou sombre sur le site"
						className="mx-auto flex aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 dark:border-neutral-700"
					>
						{currentTheme === 'dark' ? (
							<Sun
								weight="duotone"
								className="size-5 shrink-0 text-foreground sm:size-6"
							/>
						) : (
							<CloudMoon
								weight="duotone"
								className="size-5 shrink-0 text-foreground sm:size-6"
							/>
						)}

						<span className="sr-only">
							Activer ou désactiver le thème clair ou sombre sur le site ...
						</span>
					</Button>
					<Button
						onClick={() => {
							setOpen(false);
							window.print();
						}}
						aria-labelledby="Imprimer la page"
						aria-label="Imprimer la page"
						className="mx-auto flex aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 dark:border-neutral-700"
					>
						<Printer
							weight="duotone"
							className="size-5 shrink-0 text-foreground sm:size-6"
						/>

						<span className="sr-only">Imprimer la page ...</span>
					</Button>
					<Button
						onClick={() => runCommand(() => fullscreen())}
						aria-labelledby="Agrandir / réduire la fenêtre"
						aria-label="Agrandir / réduire la fenêtre"
						className="mx-auto flex aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 dark:border-neutral-700"
					>
						{isFullscreen ? (
							<ArrowsOutCardinal
								weight="duotone"
								className="size-5 shrink-0 text-foreground sm:size-6"
							/>
						) : (
							<ArrowsOut
								weight="duotone"
								className="size-5 shrink-0 text-foreground sm:size-6"
							/>
						)}

						<span className="sr-only">Agrandir / réduire la fenêtre ...</span>
					</Button>
					<Button
						onClick={() => runCommand(() => close())}
						aria-labelledby="Fermer cette fenêtre"
						aria-label="Fermer cette fenêtre"
						className="mx-auto hidden aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 min-[530px]:flex dark:border-neutral-700"
					>
						<XCircle
							weight="duotone"
							className="size-5 shrink-0 text-foreground sm:size-6"
						/>

						<span className="sr-only">Fermer cette fenêtre ...</span>
					</Button>
					<Button
						onClick={() =>
							runCommand(() =>
								window.open(env.NEXT_PUBLIC_UMAMI_PREVIEW_ENDPOINT, '_blank'),
							)
						}
						aria-labelledby="Voir les statistiques sur Umami"
						aria-label="Voir les statistiques sur Umami"
						className="mx-auto flex aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 dark:border-neutral-700"
					>
						<ChartBar
							weight="duotone"
							className="size-5 shrink-0 text-foreground sm:size-6"
						/>

						<span className="sr-only">Voir les statistiques sur Umami ...</span>
					</Button>
					<Button
						onClick={() =>
							runCommand(() =>
								window.open(
									'https://drive.google.com/file/d/1mD3zdZeeg9q4sQooyd8R1bsfZ8Uw_NIt/view?usp=share_link',
									'_blank',
								),
							)
						}
						aria-labelledby="Téléchargez mon CV"
						aria-label="Téléchargez mon CV"
						className="mx-auto flex aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 dark:border-neutral-700"
					>
						<ReadCvLogo
							weight="duotone"
							className="size-5 shrink-0 text-foreground sm:size-6"
						/>

						<span className="sr-only">Téléchargez mon CV ...</span>
					</Button>
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
				</CommandList>
			</CommandDialog>
		</>
	);
};
