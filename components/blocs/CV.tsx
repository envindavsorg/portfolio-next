import { Button } from '@/components/ui/Button';
import { Download } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import type React from 'react';

interface CVProps {
	className?: string;
}

export const CV = ({ className }: CVProps) => {
	return (
		<Link
			href={'/cv/cv.pdf'}
			target="_blank"
			rel="noopener noreferrer"
			locale={false}
			className={className}
		>
			<Button
				className="flex w-max items-center gap-x-3"
				size="lg"
				variant="outline"
			>
				<span className="font-bold">
					<span className="hidden sm:inline-block">Télécharger</span>
					<span className="sm:hidden">Voir</span>{' '}
					<span className="font-extrabold text-theme">mon CV</span>
				</span>
				<Download className="size-4 shrink-0" weight="duotone" />
			</Button>
		</Link>
	);
};
