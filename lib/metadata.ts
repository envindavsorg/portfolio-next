import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/utils';
import { baseURL, fullName, genId, keywords } from '@/resources/config';

interface MetadataOptions {
	title?: string;
	description?: string;
	image?: string;
	noIndex?: boolean;
	canonicalUrl?: string;
	tags?: string[];
	publishedTime?: string;
	modifiedTime?: string;
	type?: 'website' | 'article';
}

const defaultDescription =
	"Florin, développeur web avec 10 ans d'expérience, passionné par la création d'applications fiables, belles et fonctionnelles. Actuellement chez WeFix.";

export const constructMetadata = (options: MetadataOptions = {}): Metadata => {
	const {
		title = fullName,
		description = defaultDescription,
		image = absoluteUrl(`/api/og?heading=${fullName}&type=image&mode=dark`),
		noIndex = false,
		canonicalUrl,
		tags,
		publishedTime,
		modifiedTime,
		type = 'website',
	} = options;

	return {
		title: {
			default: title,
			template: `%s | ${fullName}`,
		},
		description,
		metadataBase: new URL(`https://${baseURL}`),
		applicationName: fullName,
		keywords: tags ? [...keywords, ...tags] : [...keywords],
		openGraph: {
			title,
			description,
			type,
			...(type === 'article' && {
				article: {
					publishedTime,
					modifiedTime,
					authors: [fullName],
					tags,
				},
			}),
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
			siteName: fullName,
		},
		alternates: {
			canonical: canonicalUrl || '/',
		},
		appleWebApp: {
			capable: true,
			statusBarStyle: 'default',
			title: 'Portfolio',
		},
		formatDetection: {
			telephone: false,
		},
		authors: [
			{
				name: fullName,
				url: `https://${baseURL}`,
			},
		],
		creator: fullName,
		generator: 'Next.js',
		referrer: 'origin-when-cross-origin',
		publisher: fullName,
		icons: {
			icon: '/favicon.ico',
			shortcut: '/favicon-16x16.png',
			apple: '/icon.png',
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
			creator: genId,
		},
		manifest: '/site.webmanifest',
	};
};
