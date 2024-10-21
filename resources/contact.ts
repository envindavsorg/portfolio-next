import { env } from '@/env/client';
import {
	ChatCircle,
	ChatsCircle,
	EnvelopeSimple,
	GithubLogo,
	LinkedinLogo,
	Phone,
} from '@phosphor-icons/react/dist/ssr';
import type { ComponentType, SVGProps } from 'react';

export interface Contact {
	name: string;
	description: string;
	url: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const contact: Contact[] = [
	{
		name: 'contact',
		description: "N'hésitez pas à m'envoyer un message",
		url: '/contact',
		icon: ChatsCircle,
	},
	{
		name: 'linkedin',
		description: 'Envoyez-moi un message sur LinkedIn',
		url: `https://www.linkedin.com/in/${env.NEXT_PUBLIC_WEBSITE_PREFIX}`,
		icon: LinkedinLogo,
	},
	{
		name: 'github',
		description: 'Voir mon profil sur GitHub',
		url: `https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`,
		icon: GithubLogo,
	},
	{
		name: 'e-mail',
		description: "N'hésitez pas à m'envoyer un email",
		url: `mailto:${env.NEXT_PUBLIC_EMAIL}`,
		icon: EnvelopeSimple,
	},
	{
		name: 'téléphone',
		description: "N'hésitez pas à m'appeler",
		url: `tel:${env.NEXT_PUBLIC_PHONE}`,
		icon: Phone,
	},
	{
		name: 'SMS',
		description: "N'hésitez pas à m'envoyer un SMS",
		url: `sms:${env.NEXT_PUBLIC_PHONE}`,
		icon: ChatCircle,
	},
];
