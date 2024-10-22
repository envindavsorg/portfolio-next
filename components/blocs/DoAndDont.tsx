import { Check, X } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';

interface DoAndDontProps {
	text: string;
}

export const Do = ({ text }: DoAndDontProps): React.JSX.Element => (
	<div className="my-6 flex items-start space-x-4">
		<div className="relative mt-1 ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-white ring-2 ring-green-600">
			<Check className="size-3 overflow-visible text-white" weight="bold" />
			<div className="absolute top-full left-[0.46875rem] mt-1 h-[1.375rem] w-px rounded-full bg-green-600" />
		</div>
		<p className="m-0 flex-1 font-bold text-base text-green-600 dark:text-green-300">
			{text}
		</p>
	</div>
);

export const Dont = ({ text }: DoAndDontProps): React.JSX.Element => (
	<div className="my-6 flex items-start space-x-4">
		<div className="relative mt-1 ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white ring-2 ring-red-600">
			<X className="size-3 overflow-visible text-white" weight="bold" />
			<div className="absolute top-full left-[0.46875rem] mt-1 h-[1.375rem] w-px rounded-full bg-red-600" />
		</div>
		<p className="m-0 flex-1 font-bold text-base text-red-600 dark:text-red-300">
			{text}
		</p>
	</div>
);
