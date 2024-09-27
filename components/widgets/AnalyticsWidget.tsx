import type { OpenStatusProps } from '@/actions/status/status.action';
import { Counter } from '@/components/text/Counter';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { cn } from '@/lib/utils';
import { Browsers, Users } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import React, { memo } from 'react';

interface AnalyticsWidgetProps {
	visits: number;
	visitors: number;
	pageViews: number;
	stats: OpenStatusProps;
	className?: string;
}

export const AnalyticsWidget = memo(
	({ visits, visitors, pageViews, stats }: AnalyticsWidgetProps) => (
		<WidgetCard column>
			<h3 className="font-bold font-geist-sans text-sm sm:text-base">
				Statistiques du site
			</h3>

			<div className="flex w-full flex-col gap-y-2">
				<div className="flex w-full items-center justify-center gap-x-3">
					<div className="flex items-center gap-x-2">
						<Counter
							className="font-extrabold text-4xl text-theme sm:text-5xl"
							value={visits}
						/>
						<div className="flex flex-col">
							<p className="font-bold text-sm text-theme sm:text-base">
								visites
							</p>
							<p className="-mt-1 font-normal text-xs sm:text-sm">
								sur mon site
							</p>
						</div>
					</div>
				</div>

				<div className="flex w-full flex-col gap-y-1">
					<div className="flex w-full justify-evenly rounded-md border border-border bg-slate-100 bg-clip-padding py-1 backdrop-blur-lg backdrop-filter sm:py-2 dark:bg-neutral-800">
						<div className="flex items-center gap-2 px-2 font-bold text-base text-orange-600 sm:text-lg dark:text-orange-200">
							<Users className="size-5 shrink-0 sm:size-7" weight="duotone" />{' '}
							{visitors}
						</div>
						<p className="text-switch opacity-50">|</p>
						<div className="flex items-center gap-2 px-2 font-bold text-base text-green-600 sm:text-lg dark:text-green-200">
							{pageViews}{' '}
							<Browsers
								className="size-5 shrink-0 sm:size-7"
								weight="duotone"
							/>
						</div>
					</div>

					<div className="flex justify-between *:font-medium *:text-xs sm:*:text-sm">
						<p>visiteurs</p>
						<p>pages vues</p>
					</div>
				</div>
			</div>

			<div className="inline-flex max-w-fit items-center gap-x-2 sm:gap-x-4">
				<Link
					href={`https://${stats.slug}.openstatus.dev`}
					target="_blank"
					rel="noreferrer"
					className="font-bold text-sm sm:text-base"
					passHref
				>
					{stats.label}
				</Link>
				<span className="relative flex size-2">
					{stats.status === 'operational' ? (
						<span
							className={cn(
								'absolute inline-flex size-full rounded-full',
								'animate-ping opacity-75 duration-1000',
								stats.color,
							)}
						/>
					) : null}
					<span
						className={cn(
							'relative inline-flex size-2 rounded-full',
							stats.color,
						)}
					/>
				</span>
			</div>
		</WidgetCard>
	),
);
