import clsx from 'clsx';
import type React from 'react';
import Halo from './Halo';

interface CardTemplateProps {
	children: React.ReactNode;
	className: string;
	disableHalo?: boolean;
	noPadding?: boolean;
}

export const CardTemplate = ({
	children,
	className,
	disableHalo,
	noPadding,
}: CardTemplateProps) => (
	<Halo
		strength={disableHalo ? 0 : 5}
		className={clsx(
			'size-full overflow-clip text-sm',
			'rounded-md border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black',
			className,
			noPadding ? 'p-0' : 'p-4 md:p-6',
		)}
	>
		{children}
	</Halo>
);
