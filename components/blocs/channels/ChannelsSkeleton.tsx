import { ChannelSkeleton } from '@/components/blocs/channels/ChannelSkeleton';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';

export const ChannelsSkeleton = (): React.JSX.Element => (
	<div className="flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
		<div className="flex w-full flex-col gap-y-2">
			<div className="flex items-center gap-x-2">
				<GithubLogo className="text-lg" weight="bold" />
				<p className="text-sm leading-snug">Sur GitHub :</p>
			</div>
			<ChannelSkeleton />
		</div>
		<div className="group flex w-full flex-col gap-y-2">
			<div className="flex items-center gap-x-2">
				<LinkedinLogo className="text-lg" weight="bold" />
				<p className="text-sm leading-snug">Sur LinkedIn :</p>
			</div>
			<ChannelSkeleton />
		</div>
	</div>
);
