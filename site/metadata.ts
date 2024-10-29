import { baseURL, id, keywords, name } from '@/resources/config';
import type { Metadata } from 'next';

export const absoluteUrl = (path: string): string =>
	`https://${baseURL}${path}`;

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
		template: `%s | ${name}`,
	},
	description,
	metadataBase: new URL(`https://${baseURL}`),
	applicationName: name,
	keywords,
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
		url: `https://${baseURL}`,
		siteName: name,
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
			name,
			url: `https://${baseURL}`,
		},
	],
	creator: name,
	generator: 'Next.js',
	referrer: 'origin-when-cross-origin',
	publisher: name,
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
		creator: id,
	},
	...props,
});
