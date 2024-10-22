import { githubUsername, mail, name, phone } from '@/resources/config';
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
		url: `https://www.linkedin.com/in/${name.replace(/ /g, '').toLowerCase()}`,
		icon: LinkedinLogo,
	},
	{
		name: 'github',
		description: 'Voir mon profil sur GitHub',
		url: `https://github.com/${githubUsername}`,
		icon: GithubLogo,
	},
	{
		name: 'e-mail',
		description: "N'hésitez pas à m'envoyer un email",
		url: `mailto:${mail}`,
		icon: EnvelopeSimple,
	},
	{
		name: 'téléphone',
		description: "N'hésitez pas à m'appeler",
		url: `tel:${phone}`,
		icon: Phone,
	},
	{
		name: 'SMS',
		description: "N'hésitez pas à m'envoyer un SMS",
		url: `sms:${phone}`,
		icon: ChatCircle,
	},
];
