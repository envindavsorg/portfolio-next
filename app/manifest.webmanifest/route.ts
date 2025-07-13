import { NextResponse } from 'next/server';

export const GET = async () => {
	const manifest = {
		name: 'Cuzeac Florin - Portfolio',
		short_name: 'Portfolio',
		description:
			'Mon nouveau site web personnel, construit avec Next.js, Tailwind CSS, et MDX.',
		start_url: '/',
		display: 'standalone',
		orientation: 'portrait',
		theme_color: '#000000',
		background_color: '#000000',
		scope: '/',
		lang: 'fr',
		dir: 'ltr',
		categories: ['portfolio', 'developer', 'personal'],
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any',
			},
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
				purpose: 'any',
			},
		],
	};

	return NextResponse.json(manifest, {
		headers: {
			'Content-Type': 'application/manifest+json',
		},
	});
};
