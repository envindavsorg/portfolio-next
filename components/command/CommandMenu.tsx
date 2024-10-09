'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/command/CommandCard';
import { contactItems, linksItems } from '@/components/command/CommandContact';
import type { NavItems } from '@/components/navigation/NavItems';
import { Button } from '@/components/ui/Button';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/Command';
import { DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { env } from '@/env/client';
import { cn } from '@/lib/utils';
import {
	ArrowsOut,
	ArrowsOutCardinal,
	ChartBar,
	GoogleLogo,
	MagnifyingGlass,
	MoonStars,
	SunDim,
	XCircle,
} from '@phosphor-icons/react';
import { EnvelopeSimple, Smiley } from '@phosphor-icons/react/dist/ssr';
import { useTheme } from 'next-themes';
import type React from 'react';
import { type ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CommandMenuProps {
	navItems: NavItems[];
	pathname: string;
}

export const CommandMenu = ({ navItems, pathname }: CommandMenuProps) => {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');

	useEffect(() => {
		const down = (event: KeyboardEvent): void => {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);

		return () => document.removeEventListener('keydown', down);
	}, []);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setQuery(event.target.value);
	};

	const handleFindGoogle = (): void => {
		const url: string = `https://www.google.com/search?q=${query}&ref=cuzeac-florin.app`;
		window.open(url, '_blank');
	};

	const { systemTheme, theme, setTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState<string | undefined>(
		undefined,
	);

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

	const [isFullscreen, setIsFullscreen] = useState(false);

	const handleFullscreen = (): void => {
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

	const handleClose = (): void => {
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
				onClick={() => setOpen((open: boolean) => !open)}
				aria-labelledby="Effectuer une recherche sur mon site"
				aria-label="Effectuer une recherche sur mon site"
			>
				<MagnifyingGlass className="text-2xl" />
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<DialogTitle className="sr-only">
					Menu avec les différents contenus et commandes
				</DialogTitle>

				<DialogHeader>
					{navItems.map(({ name, link }: NavItems, idx) => {
						const isActive: boolean =
							link === '/blog' ? pathname.startsWith(link) : pathname === link;

						return isActive ? (
							<div
								key={`indicator-${idx}`}
								className={cn(
									'inline-flex animate-pulse select-none items-center',
									'h-6 w-fit px-2 py-1',
									'rounded-md border border-border font-semibold text-xs',
								)}
							>
								{name}
							</div>
						) : null;
					})}
				</DialogHeader>

				<CommandInput
					placeholder="De quoi avez-vous besoin ? ..."
					onChangeCapture={handleInputChange}
					className="mt-1"
				/>

				<CommandList>
					<CommandGroup className="mt-4">
						<Card>
							<CardHeader className="space-y-1 p-3">
								<CardTitle className="text-sm text-theme">
									Pages et plan du site :
								</CardTitle>
								<CardDescription className="text-xs">
									- choisissez un élément dans la liste ci-dessous.
								</CardDescription>
							</CardHeader>

							<CardContent className="px-3 pt-0 pb-3">
								{navItems.map(({ description, link }, idx: number) => (
									<CommandItem
										key={`link-${idx}`}
										onSelect={() => {
											setOpen(false);
											window.open(link, '_self');
										}}
									>
										{description}
									</CommandItem>
								))}
							</CardContent>
						</Card>
					</CommandGroup>

					<div className="my-4" />

					<CommandGroup>
						<Card>
							<CardHeader className="space-y-1 p-3">
								<CardTitle className="text-green-600 text-sm dark:text-green-300">
									Entrez en contact avec moi :
								</CardTitle>
								<CardDescription className="text-xs">
									- choisissez un moyen de contact dans la liste ci-dessous.
								</CardDescription>
							</CardHeader>

							<CardContent className="px-3 pt-0 pb-3">
								{contactItems.map(
									({ title, url, icon, description }, idx: number) => (
										<CommandItem
											key={`link-${idx}-${title}`}
											onSelect={() => {
												setOpen(false);
												window.open(url, '_self');
											}}
										>
											<div className="*:size-4 *:text-green-600 dark:*:text-green-300">
												{icon}
											</div>
											<span>{description}</span>
										</CommandItem>
									),
								)}
							</CardContent>
						</Card>
					</CommandGroup>

					<div className="my-4" />

					<CommandGroup>
						<Card>
							<CardHeader className="space-y-1 p-3">
								<CardTitle className="text-sm text-violet-600 dark:text-violet-300">
									Liens externes :
								</CardTitle>
								<CardDescription className="text-xs">
									- choisissez un lien dans la liste ci-dessous.
								</CardDescription>
							</CardHeader>

							<CardContent className="px-3 pt-0 pb-3">
								{Object.entries(linksItems).map(
									([title, { link, icon, text }], idx: number) => (
										<CommandItem
											key={`link-${idx}-${title}`}
											onSelect={() => {
												setOpen(false);
												window.open(link, '_blank');
											}}
										>
											<div className="*:size-4 *:text-violet-600 dark:*:text-violet-300">
												{icon}
											</div>
											<span>{text}</span>
										</CommandItem>
									),
								)}
							</CardContent>
						</Card>
					</CommandGroup>

					<div className="my-4" />

					<CommandGroup>
						<Card>
							<CardHeader className="space-y-1 p-3">
								<CardTitle className="text-red-600 text-sm dark:text-red-300">
									Apparence & outils :
								</CardTitle>
								<CardDescription className="text-xs">
									- choisissez un élément dans la liste ci-dessous.
								</CardDescription>
							</CardHeader>

							<CardContent className="px-3 pt-0 pb-3">
								<CommandItem onSelect={toggleTheme}>
									{currentTheme === 'light' ? (
										<>
											<MoonStars
												className="size-4 text-red-600 dark:text-red-300"
												weight="duotone"
											/>
											<span>Activer le thème sombre sur le site</span>
										</>
									) : (
										<>
											<SunDim
												className="size-4 text-red-600 dark:text-red-300"
												weight="duotone"
											/>
											<span>Activer le thème clair sur le site</span>
										</>
									)}
								</CommandItem>

								<CommandItem onSelect={handleFullscreen}>
									{isFullscreen ? (
										<>
											<ArrowsOutCardinal
												className="size-4 text-red-600 dark:text-red-300"
												weight="duotone"
											/>
											<span>Quitter le mode plein écran</span>
										</>
									) : (
										<>
											<ArrowsOut
												className="size-4 text-red-600 dark:text-red-300"
												weight="duotone"
											/>
											<span>Activer le mode plein écran</span>
										</>
									)}
								</CommandItem>

								<CommandItem onSelect={handleClose}>
									<XCircle
										className="size-4 text-red-600 dark:text-red-300"
										weight="duotone"
									/>
									<span>Fermer cette fenêtre</span>
								</CommandItem>
							</CardContent>
						</Card>
					</CommandGroup>

					<div className="my-4" />

					<CommandGroup>
						<Card>
							<CardHeader className="space-y-1 p-3">
								<CardTitle className="text-pink-600 text-sm dark:text-pink-300">
									Statistiques d'audience de mon site :
								</CardTitle>
								<CardDescription className="text-xs">
									- choisissez un élément dans la liste ci-dessous.
								</CardDescription>
							</CardHeader>

							<CardContent className="px-3 pt-0 pb-3">
								<CommandItem
									onSelect={() => {
										setOpen(false);
										window.open(
											env.NEXT_PUBLIC_UMAMI_PREVIEW_ENDPOINT,
											'_blank',
										);
									}}
								>
									<>
										<ChartBar
											className="size-4 text-pink-600 dark:text-pink-300"
											weight="duotone"
										/>
										<span>Voir les statistiques sur Umami</span>
									</>
								</CommandItem>
							</CardContent>
						</Card>
					</CommandGroup>

					<CommandEmpty>
						<Card>
							<CardHeader className="space-y-1 p-3">
								<CardTitle className="text-base">
									Aucun résultat trouvé pour{' '}
									<span className="text-theme italic">`{query}`</span> :
								</CardTitle>
								<CardDescription className="text-sm">
									- contactez-moi ou trouvez sur Google à la place ?
								</CardDescription>
							</CardHeader>

							<CardContent className="px-3 pt-0 pb-3">
								<div className="flex w-full flex-col justify-start gap-3 sm:flex-row">
									<Button
										className="flex items-center gap-x-2 font-semibold"
										variant="outline"
										onClick={() => {
											setOpen(false);
											window.open('/contact', '_self');
										}}
									>
										<EnvelopeSimple className="size-4 shrink-0" weight="bold" />
										Me contacter
									</Button>
									<Button
										className="flex items-center gap-x-2 font-semibold"
										variant="outline"
										onClick={handleFindGoogle}
									>
										<GoogleLogo className="size-4 shrink-0" weight="bold" />
										Trouver sur Google
									</Button>
								</div>
							</CardContent>
						</Card>

						<p className="mt-3 hidden w-full text-end text-muted-foreground text-xs lg:inline-block">
							Appuyez sur{' '}
							<kbd className="border border-border font-extrabold text-[10px]">
								ESC
							</kbd>{' '}
							pour fermer.
						</p>

						<p className="mt-3 w-full text-end text-muted-foreground text-xs lg:hidden">
							Appuyez <span>n'importe où</span> pour fermer.
						</p>
					</CommandEmpty>
				</CommandList>
			</CommandDialog>
		</>
	);
};
