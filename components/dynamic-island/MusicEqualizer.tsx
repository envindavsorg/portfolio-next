import type { DynamicIslandSize } from '@/types';
import React from 'react';
import { MotionDiv } from './MotionHtml';
import MusicEqualizerStick from './MusicEqualizerStick';

type Props = {
	size: DynamicIslandSize;
	colors: string[];
	before: DynamicIslandSize;
};

export const MusicEqualizer = ({ size, colors, before }: Props) => {
	return (
		<MotionDiv
			className="grid h-full grid-cols-6 justify-center gap-[1px] bg-transparent"
			size={size}
			before={before}
		>
			<MusicEqualizerStick baseLength={50} colors={colors} />
			<MusicEqualizerStick baseLength={60} colors={colors} />
			<MusicEqualizerStick baseLength={90} colors={colors} />
			<MusicEqualizerStick baseLength={100} colors={colors} />
			<MusicEqualizerStick baseLength={90} colors={colors} />
			<MusicEqualizerStick baseLength={60} colors={colors} />
		</MotionDiv>
	);
};
