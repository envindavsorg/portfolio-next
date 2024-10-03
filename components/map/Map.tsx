'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { env } from '@/env/client';
import mapboxgl from 'mapbox-gl';
import { useTheme } from 'next-themes';
import type React from 'react';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

interface MapProps {
	longitude: number;
	latitude: number;
	zoom?: number;
	pitch?: number;
	width: number | null;
}

export const Map = ({
	longitude,
	latitude,
	zoom = 7,
	pitch = 25,
	width,
}: MapProps) => {
	const { resolvedTheme } = useTheme();

	let mapTheme = 'light';
	if (resolvedTheme === 'dark') {
		mapTheme = 'night';
	} else if (resolvedTheme === 'light') {
		mapTheme = 'light';
	}

	const mapContainer = useRef<HTMLDivElement>(null);

	const [mapWidth, setMapWidth] = useState<number | null>(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setMapWidth(
				width === null && window.innerWidth < 530 ? window.innerWidth : width,
			);
		}
	}, [width]);

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
		<div
			className="overflow-clip min-[530px]:aspect-square min-[530px]:h-full min-[530px]:w-56"
			style={{ width: mapWidth } as React.CSSProperties}
		>
			<div
				ref={mapContainer}
				id="map-container"
				className="h-56 w-[100vw] rounded-md min-[530px]:w-56"
				style={{ width: mapWidth } as React.CSSProperties}
			/>
		</div>
	);
};
