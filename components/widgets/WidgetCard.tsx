import { cn } from '@/lib/utils';
import type React from 'react';

interface WidgetCardProps {
	children: React.ReactNode;
	row?: boolean;
	column?: boolean;
	className?: string;
}

export const WidgetCard = ({
	children,
	row,
	column,
	className,
}: WidgetCardProps) => (
	<div
		className={cn(
			'relative flex aspect-square w-56 items-center justify-between overflow-hidden rounded-md border border-border bg-background p-2',
			row && 'flex-row',
			column && 'flex-col',
			className,
		)}
	>
		{children}
	</div>
);
