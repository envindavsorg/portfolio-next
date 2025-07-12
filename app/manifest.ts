import type { MetadataRoute } from 'next';
import { name } from '@/resources/config';
import { dark } from '@/resources/theme';

const manifest = (): MetadataRoute.Manifest => ({
	name: 'Portfolio - Cuzeac Florin',
	short_name: name,
	description:
		"Développeur web avec 10 ans d'expérience, passionné par la création d'applications belles et fonctionnelles. Portfolio professionnel avec blog technique.",
	start_url: '/',
	scope: '/',
	display: 'standalone',
	orientation: 'portrait-primary',
	background_color: dark,
	theme_color: dark,
	categories: ['productivity', 'developer', 'portfolio'],
	lang: 'fr',
	dir: 'ltr',
	icons: [
		{
			src: '/favicon.ico',
			sizes: '16x16 32x32',
			type: 'image/x-icon',
		},
		{
			src: '/favicon-16x16.png',
			sizes: '16x16',
			type: 'image/png',
		},
		{
			src: '/favicon-32x32.png',
			sizes: '32x32',
			type: 'image/png',
		},
		{
			src: '/apple-touch-icon.png',
			sizes: '180x180',
			type: 'image/png',
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
			purpose: 'maskable',
		},
	],
	shortcuts: [
		{
			name: 'Blog',
			short_name: 'Blog',
			description: 'Articles et tutorials techniques',
			url: '/blog',
			icons: [
				{
					src: '/android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
			],
		},
		{
			name: 'GitHub',
			short_name: 'GitHub',
			description: 'Mes projets open source',
			url: 'https://github.com/envindavsorg',
			icons: [
				{
					src: '/android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
			],
		},
	],
	screenshots: [
		{
			src: '/og.png',
			sizes: '1200x630',
			type: 'image/png',
			form_factor: 'wide',
			label: "Page d'accueil du portfolio",
		},
	],
	prefer_related_applications: false,
	related_applications: [],
});

export default manifest;
