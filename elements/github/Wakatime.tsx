import { wakatimeStats } from '@/actions/wakatime/stats.action';
import { PatternCard } from '@/components/ui/PatternCard';
import { env } from '@/env/server';
import { dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { GitCommit } from '@phosphor-icons/react/dist/ssr';
import { unstable_noStore as noStore } from 'next/cache';
import type React from 'react';
import { Fragment } from 'react';

interface WakatimeProps {
	className?: string;
}

export const WakatimeStats = async ({
	className,
}: WakatimeProps): Promise<React.JSX.Element> => {
	noStore();
	const stats = await wakatimeStats(env.WAKATIME_DATA_URL);
	const { data } = stats;
	const { start, end, daily_average, best_day, total_seconds } = data;

	return (
		<Fragment>
			<div className={cn('flex flex-col', className)}>
				<div className="grid grid-cols-4 gap-3">
					<div className="col-span-full min-[530px]:col-span-2">
						<PatternCard
							tag="static"
							icon={<GitCommit className="text-theme" weight="duotone" />}
							title={dayjs(start).format('DD MMM YYYY')}
							comment="Date de début"
							className="flex flex-row-reverse items-center justify-between gap-3"
						/>
					</div>
					<div className="col-span-full min-[530px]:col-span-2">
						<PatternCard
							tag="static"
							icon={<GitCommit className="text-theme" weight="duotone" />}
							title={dayjs(end).format('DD MMM YYYY')}
							comment="Date de fin"
							className="flex flex-row-reverse items-center justify-between gap-3"
						/>
					</div>
					<div className="col-span-full min-[530px]:col-span-2">
						<PatternCard
							tag="static"
							icon={<GitCommit className="text-theme" weight="duotone" />}
							title={`${(daily_average / 60 / 60).toFixed(2)} heures`}
							comment="Temps moyen de code"
							className="flex flex-row-reverse items-center justify-between gap-3"
						/>
					</div>
					<div className="col-span-full min-[530px]:col-span-2">
						<PatternCard
							tag="static"
							icon={<GitCommit className="text-theme" weight="duotone" />}
							title={`${(total_seconds / 60 / 60).toFixed(2)} heures`}
							comment="Temps de code total"
							className="flex flex-row-reverse items-center justify-between gap-3"
						/>
					</div>
					<div className="col-span-full">
						<PatternCard
							tag="static"
							icon={<GitCommit className="text-theme" weight="duotone" />}
							title={`${(best_day.total_seconds / 60 / 60).toFixed(2)} heures (${dayjs(best_day.date).format('DD MMM YYYY')})`}
							comment="Meilleur jour de code"
							className="flex flex-row-reverse items-center justify-between gap-3"
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
