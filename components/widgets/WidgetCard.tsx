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
			'relative flex items-center justify-between overflow-hidden rounded-md border border-border bg-background p-2',
			'min-[530px]:aspect-square min-[530px]:h-full min-[530px]:w-56',
			'h-56 w-full',
			row && 'flex-row',
			column && 'flex-col',
			className,
		)}
	>
		{children}
	</div>
);
