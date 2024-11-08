import { Counter } from '@/components/numbers/Counter';
import { getDistanceFromLatLonInKm } from '@/lib/distance';
import { fetcher } from '@/lib/fetcher';
import { myLatitude, myLongitude } from '@/lib/globe';
import { cn } from '@/lib/utils';
import { Caveat } from 'next/font/google';
import type React from 'react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const caveat = Caveat({
	weight: '700',
	style: 'normal',
	subsets: ['latin'],
	display: 'swap',
});

interface LocationData {
	latitude: number;
	longitude: number;
}

export const DistanceFromUser = (): React.JSX.Element => {
	const [distance, setDistance] = useState<number | null>(null);

	const { data, error } = useSWR<LocationData>(
		'https://ipapi.co/json/',
		fetcher,
	);

	useEffect(() => {
		if (data?.latitude && data.longitude) {
			const distance = getDistanceFromLatLonInKm(
				myLatitude,
				myLongitude,
				data.latitude,
				data.longitude,
			);
			setDistance(distance);
		}
	}, [data]);

	return (
		<>
			<h2 className="absolute top-10 left-4 z-30 font-extrabold font-hubot text-3xl md:text-4xl min-[530px]:top-4 min-[530px]:left-4">
				Paris
			</h2>
			<p
				className={cn(
					'absolute top-20 left-4 z-30 text-lg min-[530px]:top-14',
					caveat.className,
				)}
			>
				{error || distance === null ? (
					<span>
						- ma <span className="font-bold text-theme">localisation</span>{' '}
						actuelle :
					</span>
				) : (
					<span>
						- je suis à{' '}
						<span className="font-bold text-theme">
							<Counter value={Math.round(distance)} /> km
						</span>{' '}
						de vous !
					</span>
				)}
			</p>
		</>
	);
};
