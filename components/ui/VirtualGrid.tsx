'use client';

import type React from 'react';
import { memo, useMemo, useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface VirtualGridProps<T> {
	items: T[];
	itemWidth: number;
	itemHeight: number;
	width: number;
	height: number;
	gap?: number;
	renderItem: (item: T, index: number) => React.ReactNode;
	className?: string;
	overscan?: number;
	getItemKey?: (item: T, index: number) => string | number;
}

function VirtualGridComponent<T>({
	items,
	itemWidth,
	itemHeight,
	width,
	height,
	gap = 0,
	renderItem,
	className,
	overscan = 5,
	getItemKey = (_, index) => index,
}: VirtualGridProps<T>) {
	const [scrollTop, setScrollTop] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const { columnsCount, rowsCount, visibleItems, totalHeight, totalWidth } = useMemo(() => {
		const columnsCount = Math.floor((width + gap) / (itemWidth + gap));
		const rowsCount = Math.ceil(items.length / columnsCount);
		
		const visibleRowsCount = Math.ceil(height / (itemHeight + gap));
		const startRow = Math.floor(scrollTop / (itemHeight + gap));
		const endRow = Math.min(startRow + visibleRowsCount, rowsCount);

		// Add overscan
		const overscanStart = Math.max(0, startRow - overscan);
		const overscanEnd = Math.min(rowsCount, endRow + overscan);

		const visibleItems = [];
		for (let row = overscanStart; row < overscanEnd; row++) {
			for (let col = 0; col < columnsCount; col++) {
				const index = row * columnsCount + col;
				if (index >= items.length) break;

				visibleItems.push({
					index,
					item: items[index],
					style: {
						position: 'absolute' as const,
						left: col * (itemWidth + gap),
						top: row * (itemHeight + gap),
						width: itemWidth,
						height: itemHeight,
					},
				});
			}
		}

		return {
			columnsCount,
			rowsCount,
			visibleItems,
			totalHeight: rowsCount * (itemHeight + gap) - gap,
			totalWidth: columnsCount * (itemWidth + gap) - gap,
		};
	}, [items, itemWidth, itemHeight, width, height, gap, scrollTop, overscan]);

	const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
		setScrollTop(e.currentTarget.scrollTop);
		setScrollLeft(e.currentTarget.scrollLeft);
	}, []);

	return (
		<div
			ref={containerRef}
			className={cn('virtual-grid-container', className)}
			style={{
				width,
				height,
				overflow: 'auto',
				position: 'relative',
			}}
			onScroll={handleScroll}
		>
			<div
				style={{
					width: totalWidth,
					height: totalHeight,
					position: 'relative',
				}}
			>
				{visibleItems.map(({ index, item, style }) => (
					<div
						key={getItemKey(item, index)}
						style={style}
						className="virtual-grid-item"
					>
						{renderItem(item, index)}
					</div>
				))}
			</div>
		</div>
	);
}

export const VirtualGrid = memo(VirtualGridComponent) as typeof VirtualGridComponent;