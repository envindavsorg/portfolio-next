import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/utils';
import { baseURL, id, keywords, name } from '@/resources/config';

interface MetadataOptions {
	title?: string;
	description?: string;
	image?: string;
	noIndex?: boolean;
}

const defaultDescription =
	"Florin, développeur web avec 10 ans d'expérience, passionné par la création d'applications fiables, belles et fonctionnelles. Actuellement chez WeFix.";

export const constructMetadata = (options: MetadataOptions = {}): Metadata => {
	const {
		title = name,
		description = defaultDescription,
		image = absoluteUrl(`/api/og?heading=${name}&type=image&mode=dark`),
		noIndex = false,
	} = options;

	return {
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
			title,
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
			index: !noIndex,
			follow: !noIndex,
			googleBot: {
				index: !noIndex,
				follow: !noIndex,
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
	};
};
