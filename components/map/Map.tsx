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
	zoom = 7,
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
				minZoom: 7,
				zoom: zoom,
				maxZoom: 15,
				pitch: pitch,
				language: 'fr',
			});

			map.on('style.load', () => {
				map.setConfigProperty('basemap', 'lightPreset', mapTheme);

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
		<div className="w-56 overflow-clip min-[530px]:aspect-square min-[530px]:h-full min-[375px]:w-72 min-[440px]:w-96 min-[530px]:w-56">
			<div
				ref={mapContainer}
				id="map-container"
				className="h-56 w-56 rounded-md min-[375px]:w-72 min-[440px]:w-96 min-[530px]:w-56"
			/>
		</div>
	);
};
