'use client';

import type React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

interface VirtualListOptions {
	itemHeight: number;
	containerHeight: number;
	overscan?: number;
	itemCount: number;
}

interface VirtualListReturn {
	containerProps: {
		ref: React.RefObject<HTMLDivElement | null>;
		style: React.CSSProperties;
		onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
	};
	innerProps: {
		style: React.CSSProperties;
	};
	items: Array<{
		index: number;
		style: React.CSSProperties;
	}>;
}

const useVirtualList = ({
	itemHeight,
	containerHeight,
	overscan = 5,
	itemCount,
}: VirtualListOptions): VirtualListReturn => {
	const [scrollTop, setScrollTop] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const totalHeight = itemCount * itemHeight;

	const visibleItems = useMemo(() => {
		const visibleCount = Math.ceil(containerHeight / itemHeight);
		const startIndex = Math.floor(scrollTop / itemHeight);
		const endIndex = Math.min(startIndex + visibleCount, itemCount);

		// Add overscan items
		const overscanStart = Math.max(0, startIndex - overscan);
		const overscanEnd = Math.min(itemCount, endIndex + overscan);

		const items = [];
		for (let i = overscanStart; i < overscanEnd; i++) {
			items.push({
				index: i,
				style: {
					position: 'absolute' as const,
					top: i * itemHeight,
					left: 0,
					right: 0,
					height: itemHeight,
				},
			});
		}

		return items;
	}, [scrollTop, itemHeight, containerHeight, overscan, itemCount]);

	const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
		setScrollTop(e.currentTarget.scrollTop);
	}, []);

	return {
		containerProps: {
			ref: containerRef,
			style: {
				height: containerHeight,
				overflow: 'auto',
				position: 'relative',
			},
			onScroll: handleScroll,
		},
		innerProps: {
			style: {
				height: totalHeight,
				position: 'relative',
			},
		},
		items: visibleItems,
	};
};

export default useVirtualList;
