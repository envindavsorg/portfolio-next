'use client';

import { Typewriter } from '@/components/text/TypewriterMessage';
import { Input } from '@/components/ui/Input';
import {
	PopoverBody,
	PopoverContent,
	PopoverRoot,
	PopoverTrigger,
} from '@/components/ui/Popover';
import { env } from '@/env/client';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Microphone, Plus } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';

interface IosOgShellCardProps {
	texts: string[];
}

export const IosOgShellCard = ({
	texts,
}: IosOgShellCardProps): React.JSX.Element => {
	const { isMobile } = useMediaQuery();
	console.log(texts);

	return (
		<div className="relative z-20 mx-auto flex max-w-xs flex-col rounded-md border border-neutral-200 bg-background shadow-inner-shadow md:min-w-80 md:max-w-xl md:px-px md:pb-px dark:border-neutral-700">
			<div className="flex flex-col p-4">
				<div className="flex flex-col">
					<span className="flex items-center justify-center font-bold text-neutral-600 text-xs dark:text-neutral-400">
						iMessage
					</span>
					<div className="flex items-center justify-center gap-x-1 text-neutral-600 text-xs dark:text-neutral-400">
						<span className="font-extrabold">
							{new Date().toLocaleDateString('fr-FR', {
								day: 'numeric',
								month: 'short',
								weekday: 'short',
								timeZone: 'UTC',
							})}
						</span>
						<span className="font-normal">à</span>
						<span className="font-normal">
							{new Date(new Date().getTime() - 2 * 60000).toLocaleTimeString(
								'fr-FR',
								{
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
								},
							)}
						</span>
					</div>
				</div>

				<div className="mt-2 flex flex-col gap-y-4">
					<div className="ml-auto">
						<div className="after:-right-2.5 relative w-fit rounded-full bg-blue-500 px-4 py-2 font-medium text-sm text-white before:absolute before:right-[-8px] before:bottom-0 before:z-0 before:size-5 before:rounded-bl-[15px] before:bg-blue-500 before:content-[''] after:absolute after:bottom-0 after:z-[1] after:h-5 after:w-2.5 after:rounded-bl-[10px] after:bg-background after:content-['']">
							<span>
								Bonjour{' '}
								<span className="hidden md:inline-block">et bienvenue !!</span>!
								🤗👋
							</span>
						</div>
						<div className="mt-1 flex items-center justify-end gap-x-1 text-neutral-600 text-xs dark:text-neutral-400">
							<span className="font-extrabold">Lu à</span>
							<span className="font-normal">
								{new Date(new Date().getTime() - 60000).toLocaleTimeString(
									'fr-FR',
									{
										hour: '2-digit',
										minute: '2-digit',
										hour12: false,
									},
								)}
							</span>
						</div>
					</div>

					<div className="after:-left-2.5 relative mr-auto w-fit rounded-full bg-neutral-700 px-4 py-2 font-medium text-sm text-white before:absolute before:bottom-0 before:left-[-7px] before:z-0 before:size-5 before:rounded-br-[15px] before:bg-neutral-700 before:content-[''] after:absolute after:bottom-0 after:z-[1] after:h-5 after:w-2.5 after:rounded-br-[10px] after:bg-background after:content-['']">
						<span>
							Mais où <span className="hidden md:inline-block">est-ce que</span>{' '}
							je suis ? 😲
						</span>
					</div>

					<div className="ml-auto truncate rounded-full bg-blue-500 px-4 py-2">
						<Typewriter
							texts={
								isMobile
									? [
											`Je suis ${env.NEXT_PUBLIC_SURNAME} ! 😎`,
											'Bonne visite,',
											'sur mon portfolio !!! 🚀',
										]
									: [
											`Je m'appelle ${env.NEXT_PUBLIC_SURNAME} ! 😎`,
											'Je suis un développeur web ! 🤓',
											'Bonne visite sur mon portfolio !!! 🚀',
										]
							}
							delay={2}
						/>
					</div>
					<div className="-mt-3 flex items-center justify-end gap-x-1 text-neutral-600 text-xs dark:text-neutral-400">
						<span className="font-extrabold">Lu à</span>
						<span className="font-normal">
							{new Date().toLocaleTimeString('fr-FR', {
								hour: '2-digit',
								minute: '2-digit',
								hour12: false,
							})}
						</span>
					</div>
				</div>

				<div className="relative mt-5 flex items-center gap-x-3">
					<div className="rounded-full bg-neutral-700 p-1.5">
						<Plus className="size-3.5" weight="bold" />
					</div>
					<Input
						placeholder="iMessage"
						className="h-7 rounded-full text-sm sm:h-8"
					/>
					<Microphone className="absolute right-2.5 size-3" weight="fill" />
				</div>
			</div>
		</div>
	);
};
