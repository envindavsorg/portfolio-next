import { Skeleton } from '@/components/ui/Skeleton';
import type React from 'react';

export const StarSkeleton = (): React.JSX.Element => (
	<Skeleton>
		<div className="flex w-full">
			<div className="flex w-full items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 p-3 transition-transform duration-300 group-hover:border-theme dark:border-neutral-700 dark:bg-neutral-800">
				<div className="flex items-center space-x-4">
					<div className="size-14 rounded-full border border-neutral-200 bg-neutral-300 dark:border-neutral-700 dark:bg-black" />
					<div className="flex flex-col gap-y-1.5">
						<div className="h-4 w-32 rounded-md border border-neutral-200 bg-neutral-300 dark:border-neutral-700 dark:bg-black" />
						<div className="h-3 w-20 rounded-md border border-neutral-200 bg-neutral-300 dark:border-neutral-700 dark:bg-black" />
					</div>
				</div>
				<div className="aspect-square size-4 rounded-md border border-neutral-200 bg-neutral-300 dark:border-neutral-700 dark:bg-black" />
			</div>
		</div>
	</Skeleton>
);
