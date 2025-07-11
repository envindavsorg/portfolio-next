import { ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { Suspense } from 'react';
import {
	type ChannelStarsData,
	channelStarsForDesign,
	channelStarsForFrameworks,
} from '@/actions/channel/stars';
import { ChannelSkeleton } from '@/components/channels/Skeleton';
import { cn } from '@/lib/utils';

interface StarsChannelProps {
	className?: string;
}

export const StarsChannelForFrameworks = async ({
	className,
}: StarsChannelProps): Promise<React.JSX.Element> => {
	const stars: ChannelStarsData[] = await channelStarsForFrameworks();

	return (
		<Suspense
			fallback={
				<div
					className={cn(
						className,
						'flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0',
					)}
				>
					{Array.from({ length: 2 }).map((_, idx: number) => (
						<ChannelSkeleton key={`${idx}-channel-skeleton`} />
					))}
				</div>
			}
		>
			<div
				className={cn(
					className,
					'flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0',
				)}
			>
				{stars.map(({ avatar, name, link, metric }, idx: number) => (
					<div key={`${name}-${idx}`} className="group flex w-full">
						<Link
							href={link}
							aria-label={name}
							target="_blank"
							rel="noreferrer"
							className="flex w-full items-center justify-between rounded-md border border-neutral-200/50 bg-white/20 p-3 no-underline ring-1 ring-black/5 transition-transform duration-300 dark:border-neutral-700/50 dark:bg-white/10"
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
									<div className="-bottom-0.5 -right-1.5 absolute rounded-full bg-foreground p-1 *:size-3 *:text-background">
										<GithubLogoIcon weight="duotone" />
									</div>
								</div>
								<div className="flex flex-col gap-y-0.5">
									<p className="font-extrabold font-geist-sans">{name}</p>
									<p className="text-neutral-600 text-sm dark:text-neutral-400">
										{metric.toLocaleString('fr-FR')} étoiles
									</p>
									<p className="sr-only">{name}</p>
								</div>
							</div>
							<div className="group-hover:-rotate-12 transform text-neutral-700 transition-transform duration-300 dark:text-neutral-300">
								<ArrowUpRightIcon
									weight="duotone"
									className="text-lg group-hover:text-theme"
								/>
							</div>
						</Link>
					</div>
				))}
			</div>
		</Suspense>
	);
};

export const StarsChannelForDesign = async ({
	className,
}: StarsChannelProps): Promise<React.JSX.Element> => {
	const stars: ChannelStarsData[] = await channelStarsForDesign();

	return (
		<Suspense
			fallback={
				<div
					className={cn(
						className,
						'flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0',
					)}
				>
					{Array.from({ length: 2 }).map((_, idx: number) => (
						<ChannelSkeleton key={`${idx}-channel-skeleton`} />
					))}
				</div>
			}
		>
			<div
				className={cn(
					className,
					'flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0',
				)}
			>
				{stars.map(({ avatar, name, link, metric }, idx: number) => (
					<div key={`${name}-${idx}`} className="group flex w-full">
						<Link
							href={link}
							aria-label={name}
							target="_blank"
							rel="noreferrer"
							className="flex w-full items-center justify-between rounded-md border border-neutral-200/50 bg-white/20 p-3 no-underline ring-1 ring-black/5 transition-transform duration-300 dark:border-neutral-700/50 dark:bg-white/10"
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
									<div className="-bottom-0.5 -right-1.5 absolute rounded-full bg-foreground p-1 *:size-3 *:text-background">
										<GithubLogoIcon weight="duotone" />
									</div>
								</div>
								<div className="flex flex-col gap-y-0.5">
									<p className="font-extrabold font-geist-sans">{name}</p>
									<p className="text-neutral-600 text-sm dark:text-neutral-400">
										{metric.toLocaleString('fr-FR')} étoiles
									</p>
									<p className="sr-only">{name}</p>
								</div>
							</div>
							<div className="group-hover:-rotate-12 transform text-neutral-700 transition-transform duration-300 dark:text-neutral-300">
								<ArrowUpRightIcon
									weight="duotone"
									className="text-lg group-hover:text-theme"
								/>
							</div>
						</Link>
					</div>
				))}
			</div>
		</Suspense>
	);
};
