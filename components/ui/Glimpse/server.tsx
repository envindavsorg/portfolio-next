import { unstable_cache } from 'next/cache';

const TITLE_REGEX = /<title[^>]*>([^<]+)<\/title>/i;
const OG_TITLE_REGEX = /<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i;
const DESC_REGEX = /<meta[^>]*name="description"[^>]*content="([^"]+)"/i;
const OG_DESC_REGEX = /<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i;
const OG_IMAGE_REGEX = /<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i;

interface GlimpseData {
	title: string;
	description: string;
	image: string;
}

const fetchGlimpseData = async (url: string): Promise<GlimpseData> => {
	try {
		const response: Response = await fetch(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)',
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch: ${response.status}`);
		}

		const html: string = await response.text();

		const [, title = ''] = TITLE_REGEX.exec(html) || OG_TITLE_REGEX.exec(html) || [];
		const [, description = ''] = DESC_REGEX.exec(html) || OG_DESC_REGEX.exec(html) || [];
		const [, image = ''] = OG_IMAGE_REGEX.exec(html) || [];

		return { title, description, image };
	} catch (error) {
		console.error('Error fetching glimpse data:', error);
		return {
			title: 'Portfolio Site',
			description: 'Modern portfolio website built with Next.js',
			image: '/og-image.png',
		};
	}
};

export const glimpse = unstable_cache(fetchGlimpseData, ['glimpse-data'], {
	revalidate: 3600, // 1 hour
	tags: ['glimpse'],
});
