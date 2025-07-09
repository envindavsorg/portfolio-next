import Image from 'next/image';
import type React from 'react';
import cat from '../differents-filtres-css-pour-enrichir-toutes-vos-images/cat.webp';

type Filter = {
	filter: string;
	label: string;
};

interface FiltersProps {
	filters: Filter[];
}

export const ImagesFilters = ({ filters }: FiltersProps): React.JSX.Element => (
	<div className="mt-6 grid grid-cols-3 gap-x-6">
		{filters.map(({ filter, label }: Filter, idx: number) => (
			<div
				key={`${label}-${idx}`}
				className="flex flex-col items-center justify-center gap-y-3"
			>
				<Image
					src={cat}
					alt="Un petit chat tout mignon !"
					className="my-0"
					style={{ filter }}
					loading="lazy"
					priority={false}
				/>
				<p className="mb-0 font-bold text-black text-sm sm:text-base dark:text-white">
					{label}
				</p>
			</div>
		))}
	</div>
);
