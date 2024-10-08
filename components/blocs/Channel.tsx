import { Counter } from '@/components/numbers/Counter';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import type React from 'react';

interface ChannelProps {
	avatar: string | StaticImageData;
	link: string;
	name: string;
	subs?: number;
	stars?: number;
	icon?: React.ReactNode;
}

export const Channel = ({
	avatar,
	link,
	name,
	subs,
	stars,
	icon,
}: ChannelProps): React.JSX.Element => (
	<div className="group flex w-full">
		<Link
			href={link}
			aria-label={name}
			target="_blank"
			rel="noreferrer"
			className="flex w-full items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 p-3 no-underline transition-transform duration-300 dark:border-neutral-700 dark:bg-neutral-800"
		>
			<div className="flex items-center space-x-4">
				<div className="relative">
					<Image
						alt={name}
						src={avatar}
						className="size-14 rounded-full border border-neutral-200 dark:border-neutral-700"
						width={64}
						height={64}
						sizes="33vw"
						priority
					/>
					{icon && (
						<div className="-bottom-0.5 -right-1.5 absolute rounded-full bg-foreground p-1 *:size-3 *:text-background">
							{icon}
						</div>
					)}
				</div>
				<div className="flex flex-col gap-y-0.5">
					<p className="font-extrabold font-geist-sans">{name}</p>
					<p className="text-neutral-600 text-sm dark:text-neutral-400">
						{subs && <Counter value={subs} className="font-semibold" />}{' '}
						{stars && <Counter value={stars} className="font-semibold" />}{' '}
						{subs ? 'abonnés' : 'étoiles'}
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
		</Link>
	</div>
);

export const ChannelSkeleton = (): React.JSX.Element => (
	<Skeleton className="w-full">
		<div className="flex w-full items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 p-3 transition-transform duration-300 group-hover:border-theme dark:border-neutral-700 dark:bg-neutral-800">
			<div className="flex items-center space-x-4">
				<div className="size-14 rounded-full border border-neutral-200 bg-neutral-300 dark:border-neutral-700 dark:bg-black" />
				<div className="flex flex-col gap-y-1.5">
					<div className="h-4 w-32 rounded-md border border-neutral-200 bg-neutral-300 dark:border-neutral-700 dark:bg-black" />
					<div className="h-3 w-20 rounded-md border border-neutral-200 bg-neutral-300 dark:border-neutral-700 dark:bg-black" />
				</div>
			</div>
			<div className="aspect-square size-4 rounded-md border border-neutral-200 bg-neutral-300 dark:border-neutral-700 dark:bg-black" />
		</div>
	</Skeleton>
);
