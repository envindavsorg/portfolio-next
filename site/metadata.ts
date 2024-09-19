import { env } from '@/env/client';
import type { Metadata } from 'next';

export const absoluteUrl = (path: string): string =>
	`${env.NEXT_PUBLIC_WEBSITE_URL}${path}`;

interface ConstructMetadataProps {
	title: string;
	description: string;
	image: string;
}

export const constructMetadata = ({
	title,
	description,
	image,
	...props
}: ConstructMetadataProps): Metadata => ({
	title: {
		default: title,
		template: '%s | Cuzeac Florin',
	},
	description,
	metadataBase: new URL('https://cuzeac-florin.app'),
	applicationName: 'Cuzeac Florin',
	keywords: [
		'next.js',
		'framer motion',
		'react',
		'javascript',
		'typescript',
		'tailwind css',
		'front-end development',
		'web development',
		'responsive ui',
		'portfolio',
	],
	openGraph: {
		title,
		description,
		type: 'website',
		images: [
			{
				url: image,
				width: 1200,
				height: 630,
				alt: title,
			},
		],
		locale: 'fr_FR',
		url: 'https://cuzeac-florin.app',
		siteName: 'Cuzeac Florin',
	},
	alternates: {
		canonical: '/',
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: 'black-translucent',
		startupImage: '/og.png',
		title: title,
	},
	formatDetection: {
		telephone: false,
	},
	authors: [
		{
			name: 'Cuzeac Florin',
			url: 'https://cuzeac-florin.app',
		},
	],
	creator: 'Cuzeac Florin',
	generator: 'Next.js',
	referrer: 'origin-when-cross-origin',
	publisher: 'Cuzeac Florin',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		card: 'summary_large_image',
		title,
		description,
		images: [image],
		creator: '@cuzeacflorin',
	},
	...props,
});
