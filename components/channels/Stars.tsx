import { type ChannelStarsData, channelStars } from '@/actions/channel/stars';
import { ChannelSkeleton } from '@/components/channels/Skeleton';
import { Counter } from '@/components/numbers/Counter';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { GithubLogo } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { Suspense } from 'react';

export const StarsChannel = async (): Promise<React.JSX.Element> => {
	const subscribers: ChannelStarsData[] = await channelStars();

	return (
		<Suspense
			fallback={
				<div className="mt-6 flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
					{Array.from({ length: 2 }).map((_, idx: number) => (
						<ChannelSkeleton key={`${idx}-channel-skeleton`} />
					))}
				</div>
			}
		>
			<div className="mt-6 flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
				{subscribers.map(({ avatar, name, link, metric }, idx: number) => (
					<div key={`${name}-${idx}`} className="group flex w-full">
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
									<div className="-bottom-0.5 -right-1.5 absolute rounded-full bg-foreground p-1 *:size-3 *:text-background">
										<GithubLogo />
									</div>
								</div>
								<div className="flex flex-col gap-y-0.5">
									<p className="font-extrabold font-geist-sans">{name}</p>
									<p className="text-neutral-600 text-sm dark:text-neutral-400">
										<Counter value={metric} className="font-semibold" /> étoiles
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
				))}
			</div>
		</Suspense>
	);
};
