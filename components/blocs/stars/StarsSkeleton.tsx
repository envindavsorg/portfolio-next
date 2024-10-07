import { ChannelSkeleton } from '@/components/blocs/channels/ChannelSkeleton';
import type React from 'react';

export const StarsSkeleton = (): React.JSX.Element => (
	<div className="flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
		<div className="w-full">
			<ChannelSkeleton />
		</div>
		<div className="w-full">
			<ChannelSkeleton />
		</div>
	</div>
);
