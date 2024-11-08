'use client';

import { ProfileImage } from '@/components/ProfileImage';
import { useCommandContext } from '@/components/command/CommandContext';
import { Button } from '@/components/ui/Button';
import { MagnifyingGlass } from '@phosphor-icons/react';
import Link from 'next/link';
import type React from 'react';

export const NavBarSwap = (): React.JSX.Element => {
	const { toggleTheme, getThemeIcon, setOpen } = useCommandContext();

	return (
		<div className="rounded-md border border-border bg-background px-3 py-2 shadow-surface-glass backdrop-blur [@supports(backdrop-filter:blur(0px))]:bg-white/[3%]">
			<div className="flex items-center justify-between">
				<Link
					href="/"
					title="Retourner sur la page principale"
					className="rounded-full focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70"
				>
					<ProfileImage className="size-9" />
				</Link>

				<div className="flex items-center space-x-6">
					<Button
						onClick={() => setOpen(true)}
						variant="ghost"
						aria-label="Activer ou désactiver le thème clair ou sombre sur le site ..."
						className="p-0"
					>
						<MagnifyingGlass
							weight="duotone"
							className="size-5 shrink-0 text-foreground sm:size-6"
						/>
					</Button>

					<Button
						onClick={toggleTheme}
						variant="ghost"
						aria-label="Activer ou désactiver le thème clair ou sombre sur le site ..."
						className="p-0"
					>
						{getThemeIcon()}
					</Button>
				</div>
			</div>
		</div>
	);
};
