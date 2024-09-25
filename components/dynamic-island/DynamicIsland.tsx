'use client';

import DynamicIslandBody from '@/components/dynamic-island/DynamicIslandBody';
import { DynamicIslandMusicPlayer } from '@/components/dynamic-island/MusicPlayer';
import type { DynamicIslandSize } from '@/types';
import React, { useState } from 'react';

export const DynamicIsland = () => {
	const [musicPlayerState, setMusicPlayerState] =
		useState<DynamicIslandSize>('compact');

	return (
		<div className="mt-12">
			<DynamicIslandBody
				id="music-player"
				default="compact"
				state={musicPlayerState}
				setState={setMusicPlayerState}
				onClick={
					musicPlayerState === 'compact'
						? () => setMusicPlayerState('ultra')
						: () => setMusicPlayerState('compact')
				}
			>
				<DynamicIslandMusicPlayer size={musicPlayerState} />
			</DynamicIslandBody>
		</div>
	);
};
