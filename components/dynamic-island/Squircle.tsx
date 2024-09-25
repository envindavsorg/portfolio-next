import type { DynamicIslandSize } from '@/types';
import { getSvgPath } from 'figma-squircle';
import React from 'react';
import { DynamicIslandSizePresets } from './DynamicIslandSizePresets';

const Squircle = ({ size }: { size: DynamicIslandSize }) => {
	const width = DynamicIslandSizePresets[size].width;
	const height = DynamicIslandSizePresets[size].aspectRatio * width;
	const cornerRadius = DynamicIslandSizePresets[size].borderRadius;

	const svgPath = getSvgPath({
		width: width,
		height: height,
		cornerRadius: cornerRadius,
		cornerSmoothing: 0.6,
	});
	return (
		<svg
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
		>
			<clipPath id={`squircle-${size}`}>
				<path fill="red" stroke="none" d={svgPath} />
			</clipPath>
		</svg>
	);
};

export default Squircle;
