import { name } from '@/resources/config';
import { dark } from '@/resources/theme';
import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
	name: 'Mon portfolio personnel',
	short_name: name,
	description:
		"Développeur web, passionné par la création d'applications belles et fonctionnelles, et de nouvelles technologies.",
	start_url: '/',
	display: 'standalone',
	background_color: dark,
	theme_color: dark,
	icons: [
		{
			src: '/favicon.ico',
			sizes: 'any',
			type: 'image/x-icon',
		},
	],
});

export default manifest;
