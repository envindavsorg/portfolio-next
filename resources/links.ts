import { env } from '@/env/client';
import {
	GithubLogo,
	LinkedinLogo,
	ReadCvLogo,
	SquaresFour,
} from '@phosphor-icons/react/dist/ssr';
import type { ComponentType, SVGProps } from 'react';

export interface Links {
	name: string;
	description: string;
	url: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const links: Links[] = [
	{
		name: 'linkedin',
		description: 'Voir mon profil LinkedIn',
		url: `https://fr.linkedin.com/in/${env.NEXT_PUBLIC_WEBSITE_PREFIX}`,
		icon: LinkedinLogo,
	},
	{
		name: 'github',
		description: 'Voir mon compte et projets sur GitHub',
		url: `https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`,
		icon: GithubLogo,
	},
	{
		name: 'CV',
		description: 'Télécharger / visualiser mon CV',
		url: 'https://drive.google.com/file/d/1mD3zdZeeg9q4sQooyd8R1bsfZ8Uw_NIt/view?usp=share_link',
		icon: ReadCvLogo,
	},
	{
		name: 'Bento',
		description: 'Voir mon profil sur Bento.me',
		url: 'https://bento.me/florin-cuzeac',
		icon: SquaresFour,
	},
];
