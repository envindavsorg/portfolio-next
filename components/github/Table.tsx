import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import { dayjs } from '@/lib/dayjs';
import type React from 'react';

interface Props {
	weeks: {
		contributionDays: {
			color: string;
			contributionCount: number;
			date: string;
		}[];
		firstDay: string;
	}[];
}

export const GitHubTable = async ({ weeks }: Props) => {
	const currentMonthContributions = weeks.flatMap(
		(week) => week.contributionDays,
	);

	const sortedCurrentMonthContributions = currentMonthContributions.sort(
		(a, b) => {
			const dateA: Date = new Date(a.date);
			const dateB: Date = new Date(b.date);
			return dateB.getTime() - dateA.getTime();
		},
	);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Date</TableHead>
					<TableHead className="text-right">Nombre de commits</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="border-x">
				{sortedCurrentMonthContributions
					.slice(0, 7)
					.map(({ date, contributionCount }, idx: number) => (
						<TableRow key={`${date}-${idx}`}>
							<TableCell className="font-medium">
								<span className="hidden sm:inline-block">
									{dayjs(date).format('dddd DD MMM YYYY')}
								</span>
								<span className="sm:hidden">
									{dayjs(date).format('ddd DD/MM')}
								</span>
							</TableCell>
							<TableCell className="text-right font-bold text-sm text-theme">
								{contributionCount} commit{contributionCount > 1 ? 's' : ''}
							</TableCell>
						</TableRow>
					))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell className="font-medium text-neutral-600 dark:text-neutral-400">
						Total
					</TableCell>
					<TableCell className="text-right font-bold text-base text-foreground">
						{sortedCurrentMonthContributions
							.slice(0, 7)
							.reduce((prev, curr) => prev + curr.contributionCount, 0)}{' '}
						commits
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};
