'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { env } from '@/env/client';
import mapboxgl from 'mapbox-gl';
import { useTheme } from 'next-themes';
import type React from 'react';
import { useEffect, useRef } from 'react';

interface MapProps {
	longitude: number;
	latitude: number;
	zoom?: number;
	pitch?: number;
}

export const Map = ({
	longitude,
	latitude,
	zoom = 15,
	pitch = 25,
}: MapProps) => {
	const { resolvedTheme } = useTheme();

	let mapTheme = 'light';
	if (resolvedTheme === 'dark') {
		mapTheme = 'night';
	} else if (resolvedTheme === 'light') {
		mapTheme = 'light';
	}

	const mapContainer = useRef<HTMLDivElement>(null);

	useEffect(() => {
		mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

		if (mapContainer.current) {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				center: [longitude, latitude],
				minZoom: 13,
				zoom: zoom,
				maxZoom: 15,
				pitch: pitch,
				language: 'fr',
			});

			map.on('style.load', () => {
				map.setConfigProperty('basemap', 'lightPreset', mapTheme);
				map.setPadding({ left: 150 });

				const el: HTMLSpanElement = document.createElement('span');
				el.className =
					'pointer-events-none absolute size-6 rounded-full bg-theme transform translate-x-1/2 translate-y-1/2 border-[3px] border-white';

				new mapboxgl.Marker({ element: el })
					.setLngLat([longitude, latitude])
					.addTo(map);
			});

			return () => map.remove();
		}
	}, [mapTheme, resolvedTheme]);

	return (
		<div className="relative rounded-md border border-neutral-200 dark:border-neutral-700">
			<div
				className="overflow-clip"
				style={{ height: '400px' } as React.CSSProperties}
			>
				<div
					ref={mapContainer}
					id="map-container"
					className="size-full rounded-md"
				/>
			</div>
			<div className="absolute bottom-3 left-3 flex flex-col gap-y-0.5 rounded-md border border-neutral-200 bg-white px-4 py-2 leading-none dark:border-neutral-700 dark:bg-black">
				<p className="font-medium text-xs">Localisation</p>
				<p className="font-bold text-xl">
					Paris,<span className="ms-1 font-semibold text-sm">France</span>
				</p>
			</div>
		</div>
	);
};
