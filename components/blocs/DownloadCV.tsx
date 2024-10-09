import { CV } from '@/components/blocs/CV';
import Halo from '@/components/status/Halo';
import { cn } from '@/lib/utils';
import { ArrowRight, Download, FileDoc } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';

interface CardProps {
	children: React.ReactNode;
	className?: string;
}

const Card = ({ children, className }: CardProps): React.JSX.Element => (
	<Halo strength={5}>
		<div
			className={cn(
				'flex flex-col items-center justify-center gap-y-3',
				'rounded-md p-6 text-center sm:p-8',
				'border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800',
				className,
			)}
		>
			{children}
		</div>
	</Halo>
);

interface DownloadCVProps {
	className?: string;
}

export const DownloadCV = ({
	className,
}: DownloadCVProps): React.JSX.Element => (
	<Card className={className}>
		<div className="flex items-center gap-x-6 sm:mb-3 sm:gap-x-6">
			<FileDoc className="size-8 shrink-0" weight="bold" />
			<ArrowRight className="size-4 shrink-0" weight="regular" />
			<Download className="size-8 shrink-0" weight="bold" />
		</div>
		<h2 className="mt-3 font-bold font-geist-sans text-lg sm:mt-0 sm:text-xl">
			Télécharger mon <span className="font-bold text-theme">CV</span>
		</h2>
		<p className="-mt-2 max-w-md text-sm">au format PDF.</p>
		<div className="mt-3 flex w-full max-w-md items-center justify-center">
			<CV />
		</div>
	</Card>
);
