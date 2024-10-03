import Image, { type StaticImageData } from 'next/image';
import type React from 'react';

interface FiltersProps {
	image: StaticImageData;
	data: {
		filter: string;
		label: string;
	}[];
}

export const Filters = ({ image, data }: FiltersProps) => (
	<div className="mt-6 grid grid-cols-3 gap-x-6">
		{data.map((item, index) => (
			<div key={index} className="flex flex-col items-center justify-center">
				<Image
					src={image}
					alt="Un petit chat tout mignon !"
					className="my-0"
					style={{ filter: item.filter }}
					loading="lazy"
					priority={false}
				/>
				<p className="mb-0 font-bold text-black text-sm sm:text-lg dark:text-white">
					{item.label}
				</p>
			</div>
		))}
	</div>
);
