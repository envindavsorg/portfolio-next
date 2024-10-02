'use client';

import { Motion } from '@/components/motion/Motion';
import {
	defaultVariants,
	variantsFive,
	variantsFour,
	variantsThree,
	variantsTwo,
} from '@/components/motion/variants';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/wakatime/Progress';
import { dayjs } from '@/lib/dayjs';
import { Activity, Ranking } from '@phosphor-icons/react';
import { GitCommit } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'framer-motion';
import type React from 'react';

interface Props {
	stats: any;
}

const sumTotalFromArray = <T extends { hours: number; minutes: number }>(
	data: T[],
	key: keyof T,
) => {
	return (
		data.reduce(
			(previousValue, currentValue) =>
				previousValue + (currentValue[key] as number),
			0,
		) ?? 0
	);
};

export const Wakatime = ({ stats }: Props) => (
	<>
		<Motion className="flex flex-col" asChild variants={defaultVariants}>
			<div className="grid grid-cols-4 gap-3">
				<motion.div
					className="col-span-full min-[530px]:col-span-2"
					variants={variantsTwo}
				>
					<Card
						tag="static"
						icon={<GitCommit className="text-theme" weight="duotone" />}
						title={dayjs(stats.start).format('DD MMM YYYY')}
						comment="Date de début"
						className="flex flex-row-reverse items-center justify-between gap-3"
					/>
				</motion.div>
				<motion.div
					className="col-span-full min-[530px]:col-span-2"
					variants={variantsThree}
				>
					<Card
						tag="static"
						icon={<GitCommit className="text-theme" weight="duotone" />}
						title={dayjs(stats.end).format('DD MMM YYYY')}
						comment="Date de fin"
						className="flex flex-row-reverse items-center justify-between gap-3"
					/>
				</motion.div>
				<motion.div
					className="col-span-full min-[530px]:col-span-2"
					variants={variantsThree}
				>
					<Card
						tag="static"
						icon={<GitCommit className="text-theme" weight="duotone" />}
						title={`${(stats.daily_average / 60 / 60).toFixed(2)} heures`}
						comment="Temps moyen de code"
						className="flex flex-row-reverse items-center justify-between gap-3"
					/>
				</motion.div>
				<motion.div
					className="col-span-full min-[530px]:col-span-2"
					variants={variantsFour}
				>
					<Card
						tag="static"
						icon={<GitCommit className="text-theme" weight="duotone" />}
						title={`${(stats.total_seconds / 60 / 60).toFixed(2)} heures`}
						comment="Temps de code total"
						className="flex flex-row-reverse items-center justify-between gap-3"
					/>
				</motion.div>
				<motion.div className="col-span-full" variants={variantsFive}>
					<Card
						tag="static"
						icon={<GitCommit className="text-theme" weight="duotone" />}
						title={`${(stats.best_day.total_seconds / 60 / 60).toFixed(2)} heures (${dayjs(stats.best_day.date).format('DD MMM YYYY')})`}
						comment="Meilleur jour de code"
						className="flex flex-row-reverse items-center justify-between gap-3"
					/>
				</motion.div>
			</div>
		</Motion>

		<div className="mt-14">
			<p>
				Quelques statistiques supplémentaires, comme les langages les plus
				utilisés et ma principale activité de la semaine.
			</p>
			<CodingActiveList stats={stats} />
		</div>
	</>
);

interface ItemProps {
	name: string;
	hours: number;
	minutes: number;
}

interface CodingActiveListProps {
	stats?: {
		languages?: ItemProps[];
		categories?: ItemProps[];
	};
}

const CodingActiveList = ({ stats }: CodingActiveListProps) => {
	const getLanguagesTotalHours = sumTotalFromArray<ItemProps>(
		stats?.languages || [],
		'hours',
	);
	const getLanguagesTotalMinutes = sumTotalFromArray<ItemProps>(
		stats?.languages || [],
		'minutes',
	);
	const getLanguagesTotalTimeDisplay = `${
		Math.floor((getLanguagesTotalMinutes % 3600) / 60) + getLanguagesTotalHours
	} hrs ${getLanguagesTotalMinutes} mins`;

	const getEditorTotalHours = sumTotalFromArray<ItemProps>(
		stats?.categories || [],
		'hours',
	);
	const getEditorTotalMinutes = sumTotalFromArray<ItemProps>(
		stats?.categories || [],
		'minutes',
	);
	const getEditorTotalTimeDisplay = `${
		Math.floor((getEditorTotalMinutes % 3600) / 60) + getEditorTotalHours
	} hrs ${getEditorTotalMinutes} mins`;

	interface ActiveProps {
		title: string;
		total: string;
		data: ItemProps[] | undefined;
		icon: React.ReactNode;
	}

	const actives: ActiveProps[] = [
		{
			title: 'Languages utilisés :',
			total: getLanguagesTotalTimeDisplay,
			data: stats?.languages?.slice(0, 3),
			icon: <Ranking className="text-lg" weight="bold" />,
		},
		{
			title: 'Activité principale :',
			total: getEditorTotalTimeDisplay,
			data: stats?.categories,
			icon: <Activity className="text-lg" weight="bold" />,
		},
	];

	if (!stats) {
		return null;
	}

	return (
		<div className="mt-6 flex flex-col gap-3">
			{actives.map(({ title, icon, data }: ActiveProps) => (
				<div
					key={title}
					className="flex flex-1 flex-col gap-2 rounded-md border border-neutral-200 bg-white px-3 py-4 dark:border-neutral-700 dark:bg-black"
				>
					<div className="flex items-center gap-x-2">
						{icon}
						<p className="font-bold text-sm leading-snug">{title}</p>
					</div>

					<div className="size-full rounded-lg bg-background">
						<ul className="flex flex-col gap-2 p-2">
							{data?.map((subItem) => (
								<li key={subItem?.name}>
									<Progress data={subItem} className="bg-theme" />
								</li>
							))}
						</ul>
					</div>
				</div>
			))}
		</div>
	);
};
