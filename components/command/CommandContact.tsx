import { env } from '@/env/client';
import {
	ChatCircle,
	ChatText,
	EnvelopeSimple,
	GithubLogo,
	LinkedinLogo,
	Phone,
	ReadCvLogo,
	SquaresFour,
} from '@phosphor-icons/react/dist/ssr';
import type React from 'react';

export interface ContactItems {
	title: string;
	url: string;
	icon: React.ReactNode;
	description: string;
}

export const contactItems: ContactItems[] = [
	{
		title: 'Formulaire',
		url: '/contact',
		icon: <ChatText weight="duotone" />,
		description: 'Envoyez-moi un message',
	},
	{
		title: 'Adresse e-mail',
		url: `mailto:${env.NEXT_PUBLIC_EMAIL}`,
		icon: <EnvelopeSimple weight="duotone" />,
		description: 'Envoyez-moi un e-mail',
	},
	{
		title: 'Téléphone',
		url: `tel:${env.NEXT_PUBLIC_PHONE}`,
		icon: <Phone weight="duotone" />,
		description: 'Appelez-moi',
	},
	{
		title: 'SMS',
		url: `sms:${env.NEXT_PUBLIC_PHONE}`,
		icon: <ChatCircle weight="duotone" />,
		description: 'Envoyez-moi un SMS',
	},
	{
		title: 'LinkedIn',
		url: `https://www.linkedin.com/in/${env.NEXT_PUBLIC_WEBSITE_PREFIX}`,
		icon: <LinkedinLogo weight="duotone" />,
		description: 'Envoyez-moi un message sur LinkedIn',
	},
];

export interface LinksItems {
	[key: string]: {
		link: string;
		icon: React.ReactNode;
		text: string;
		style: string;
	};
}

export const linksItems: LinksItems = {
	LinkedIn: {
		link: `https://fr.linkedin.com/in/${env.NEXT_PUBLIC_WEBSITE_PREFIX}`,
		icon: <LinkedinLogo weight="duotone" />,
		text: 'Voir mon profil LinkedIn',
		style: 'rotate-6',
	},
	GitHub: {
		link: `https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`,
		icon: <GithubLogo weight="duotone" />,
		text: 'Voir mon compte et projets sur GitHub',
		style: '-rotate-6',
	},
	CV: {
		link: '#',
		icon: <ReadCvLogo weight="duotone" />,
		text: 'Télécharger / visualiser mon CV',
		style: 'rotate-6',
	},
	Bento: {
		link: 'https://bento.me/florin-cuzeac',
		icon: <SquaresFour weight="duotone" />,
		text: 'Voir mon profil sur Bento.me',
		style: '-rotate-6',
	},
};
