import { useCommandContext } from '@/components/command/CommandContext';
import { Button } from '@/components/ui/Button';
import { ChartBar, Printer, ReadCvLogo, XCircle } from '@phosphor-icons/react';
import Link from 'next/link';
import type React from 'react';

export const CommandToolbar = (): React.JSX.Element => {
	const {
		toggleTheme,
		getThemeIcon,
		fullscreen,
		getScreenIcon,
		closeWindow,
		runCommand,
	} = useCommandContext();

	return (
		<div className="mx-2 my-2.5 grid grid-cols-5 gap-3 min-[530px]:grid-cols-6">
			<Button
				onClick={toggleTheme}
				variant="ghost"
				aria-label="Activer ou désactiver le thème clair ou sombre sur le site ..."
				className="mx-auto flex aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 dark:border-neutral-700"
			>
				{getThemeIcon()}
			</Button>

			<Button
				onClick={() => runCommand(() => window.print())}
				aria-label="Imprimer la page"
				className="mx-auto flex aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 dark:border-neutral-700"
			>
				<Printer
					weight="duotone"
					className="size-5 shrink-0 text-foreground sm:size-6"
				/>
			</Button>

			<Button
				onClick={() => runCommand(() => fullscreen())}
				aria-label="Agrandir / réduire la fenêtre"
				className="mx-auto flex aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 dark:border-neutral-700"
			>
				{getScreenIcon()}
			</Button>

			<Button
				onClick={() => runCommand(() => closeWindow())}
				aria-label="Fermer cette fenêtre"
				className="mx-auto hidden aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 min-[530px]:flex dark:border-neutral-700"
			>
				<XCircle
					weight="duotone"
					className="size-5 shrink-0 text-foreground sm:size-6"
				/>
			</Button>

			<Link
				href={process.env.NEXT_PUBLIC_UMAMI_PREVIEW_ENDPOINT!}
				aria-label="Voir les statistiques sur Umami"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Button
					aria-label="Voir les statistiques sur Umami"
					className="mx-auto flex aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 dark:border-neutral-700"
				>
					<ChartBar
						weight="duotone"
						className="size-5 shrink-0 text-foreground sm:size-6"
					/>
				</Button>
			</Link>

			<Link
				href="https://drive.google.com/file/d/1mD3zdZeeg9q4sQooyd8R1bsfZ8Uw_NIt/view?usp=share_link"
				aria-label="Téléchargez mon CV"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Button
					aria-label="Téléchargez mon CV"
					className="mx-auto flex aspect-square rounded-md border border-neutral-200 bg-background p-4 sm:p-6 dark:border-neutral-700"
				>
					<ReadCvLogo
						weight="duotone"
						className="size-5 shrink-0 text-foreground sm:size-6"
					/>
				</Button>
			</Link>
		</div>
	);
};
