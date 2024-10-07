import { Counter } from '@/components/numbers/Counter';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import type React from 'react';

interface StarProps {
	img: string;
	link: string;
	name: string;
	subs: number;
}

export const Star = ({
	img,
	link,
	name,
	subs,
}: StarProps): React.JSX.Element => (
	<div className="group flex w-full">
		<a
			href={link}
			target="_blank"
			rel="noreferrer"
			className="flex w-full items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 p-3 transition-transform duration-300 group-hover:border-theme dark:border-neutral-700 dark:bg-neutral-800"
		>
			<div className="flex items-center space-x-4">
				<Image
					alt={name}
					src={img}
					height={64}
					width={64}
					className="size-14 rounded-full border border-neutral-200 dark:border-neutral-700"
					priority
				/>
				<div className="flex flex-col gap-y-0.5">
					<p className="font-extrabold">{name}</p>
					<p className="text-neutral-600 text-sm dark:text-neutral-400">
						<Counter value={subs} className="font-semibold" /> étoiles
					</p>
					<p className="sr-only">{name}</p>
				</div>
			</div>
			<div className="group-hover:-rotate-12 transform text-neutral-700 transition-transform duration-300 dark:text-neutral-300">
				<ArrowUpRight
					weight="regular"
					className="text-lg group-hover:text-theme"
				/>
			</div>
		</a>
	</div>
);
