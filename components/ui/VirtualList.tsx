'use client';

import type React from 'react';
import { memo } from 'react';
import useVirtualList from '@/hooks/useVirtualList';
import { cn } from '@/lib/utils';

interface VirtualListProps<T> {
	items: T[];
	itemHeight: number;
	height: number;
	renderItem: (item: T, index: number) => React.ReactNode;
	className?: string;
	overscan?: number;
	getItemKey?: (item: T, index: number) => string | number;
}

const VirtualListComponent = <T,>({
	items,
	itemHeight,
	height,
	renderItem,
	className,
	overscan = 5,
	getItemKey = (_, index) => index,
}: VirtualListProps<T>) => {
	const {
		containerProps,
		innerProps,
		items: virtualItems,
	} = useVirtualList({
		itemHeight,
		containerHeight: height,
		itemCount: items.length,
		overscan,
	});

	return (
		<div {...containerProps} className={cn('virtual-list-container', className)}>
			<div {...innerProps}>
				{virtualItems.map(({ index, style }) => {
					const item = items[index];
					if (!item) return null;

					return (
						<div
							key={getItemKey(item, index)}
							style={style}
							className="virtual-list-item"
						>
							{renderItem(item, index)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const VirtualList = memo(VirtualListComponent) as typeof VirtualListComponent;
