'use client';

import { EmptyState } from '@/components/pictures/EmptyState';
import { type ChartConfig, ChartContainer } from '@/components/ui/Chart';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Trophy } from '@phosphor-icons/react/dist/ssr';
import React, { memo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

interface CodeTimeWidgetProps {
	content: {
		label: string;
		progress: number;
	}[];
	best?: {
		date: string;
		total_seconds: number;
		text: string;
	};
	className?: string;
}

export const CodeTimeWidget = memo(({ content, best }: CodeTimeWidgetProps) => {
	const hasContent: boolean = content.length > 0;
	const bestDate: string = new Date(best!.date).toLocaleDateString('fr-FR', {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});

	return (
		<WidgetCard column>
			<div className="flex flex-col items-center justify-center">
				<h3 className="font-bold font-geist-sans text-sm sm:text-base">
					Temps de code
				</h3>
				<p className="-mt-1 text-xs sm:text-sm">(cette semaine)</p>
			</div>

			{hasContent ? (
				<>
					<CodeTimeWidgetChart content={content} />

					<div className="inline-flex max-w-fit items-center gap-x-2 text-xs sm:text-sm">
						<Trophy className="size-3.5 text-theme" weight="duotone" />
						<span className="font-extrabold">{bestDate}</span>
					</div>
				</>
			) : (
				<EmptyState />
			)}
		</WidgetCard>
	);
});

const chartConfig = {
	desktop: {
		label: 'Graphique de la semaine sur mon temps de code',
	},
} satisfies ChartConfig;

const CodeTimeWidgetChart = ({ content }: CodeTimeWidgetProps) => {
	const { isMobile } = useMediaQuery();

	// hide console errors from recharts
	const error = console.error;
	console.error = (...args: any) => {
		if (/defaultProps/.test(args[0])) {
			return;
		}

		error(...args);
	};

	type ChartData = {
		label: string;
		progress: number;
	};

	const chartData: ChartData[] = content.map((item: ChartData) => ({
		label: item.label,
		progress: item.progress,
	}));

	return (
		<ChartContainer
			config={chartConfig}
			className="aspect-auto h-[115px] w-full sm:h-[135px]"
		>
			<BarChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 0,
					right: 0,
				}}
			>
				<CartesianGrid vertical={false} className="stroke-2 stroke-border" />
				<XAxis
					className="font-medium text-xs"
					dataKey="label"
					tickLine={false}
					axisLine={false}
					tickMargin={2}
					minTickGap={0}
				/>
				<Bar
					className="fill-theme"
					radius={[5, 5, 0, 0]}
					dataKey="progress"
					barSize={isMobile ? 30 : 40}
				/>
			</BarChart>
		</ChartContainer>
	);
};
