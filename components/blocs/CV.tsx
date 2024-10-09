import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Download } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import type React from 'react';

interface CVProps {
	className?: string;
}

export const CV = ({ className }: CVProps) => {
	return (
		<Link
			href="https://drive.google.com/file/d/1mD3zdZeeg9q4sQooyd8R1bsfZ8Uw_NIt/view?usp=share_link"
			target="_blank"
			rel="noopener noreferrer"
			className={cn(className, 'no-underline')}
		>
			<Button
				className="flex w-max items-center gap-x-3"
				size="lg"
				variant="outline"
			>
				<span className="font-bold">
					<span className="inline-block sm:inline-block min-[530px]:hidden">
						Télécharger
					</span>
					<span className="max-[530px]:hidden sm:hidden">Voir</span>{' '}
					<span className="font-extrabold text-theme">mon CV</span>
				</span>
				<Download className="size-4 shrink-0" weight="duotone" />
			</Button>
		</Link>
	);
};
