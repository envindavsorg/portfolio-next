import { cn } from '@/lib/utils';
import type React from 'react';
import {
	type TdHTMLAttributes,
	type ThHTMLAttributes,
	forwardRef,
} from 'react';

const Table = forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement>
>(
	(
		{ className, ...props }: React.HTMLAttributes<HTMLTableElement>,
		ref,
	): React.JSX.Element => (
		<div className="relative w-full overflow-auto">
			<table
				ref={ref}
				className={cn('w-full caption-bottom text-sm', className)}
				{...props}
			/>
		</div>
	),
);
Table.displayName = 'Table';

const TableHeader = forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(
	(
		{ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>,
		ref,
	): React.JSX.Element => (
		<thead
			ref={ref}
			className={cn(
				'border-neutral-200 dark:border-neutral-700 [&_tr]:border-b',
				className,
			)}
			{...props}
		/>
	),
);
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(
	(
		{ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>,
		ref,
	): React.JSX.Element => (
		<tbody
			ref={ref}
			className={cn(
				'border-neutral-200 dark:border-neutral-700 [&_tr:last-child]:border-0',
				className,
			)}
			{...props}
		/>
	),
);
TableBody.displayName = 'TableBody';

const TableFooter = forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(
	(
		{ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>,
		ref,
	): React.JSX.Element => (
		<tfoot
			ref={ref}
			className={cn(
				'border-neutral-200 border-t bg-muted/50 font-medium dark:border-neutral-700 [&>tr]:last:border-b-0',
				className,
			)}
			{...props}
		/>
	),
);
TableFooter.displayName = 'TableFooter';

const TableRow = forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(
	(
		{ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>,
		ref,
	): React.JSX.Element => (
		<tr
			ref={ref}
			className={cn(
				'border-neutral-200 border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted dark:border-neutral-700',
				className,
			)}
			{...props}
		/>
	),
);
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(
	(
		{ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>,
		ref,
	): React.JSX.Element => (
		<th
			ref={ref}
			className={cn(
				'h-12 px-4 text-left align-middle font-medium text-neutral-600 dark:text-neutral-400 [&:has([role=checkbox])]:pr-0',
				className,
			)}
			{...props}
		/>
	),
);
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(
	(
		{ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>,
		ref,
	): React.JSX.Element => (
		<td
			ref={ref}
			className={cn(
				'p-4 align-middle [&:has([role=checkbox])]:pr-0',
				className,
			)}
			{...props}
		/>
	),
);
TableCell.displayName = 'TableCell';

const TableCaption = forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(
	(
		{ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>,
		ref,
	): React.JSX.Element => (
		<caption
			ref={ref}
			className={cn(
				'mt-4 text-neutral-600 text-sm dark:text-neutral-400',
				className,
			)}
			{...props}
		/>
	),
);
TableCaption.displayName = 'TableCaption';

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
};
