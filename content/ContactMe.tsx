import { env } from '@/env/client';
import {
	ChatCircle,
	ChatsCircle,
	EnvelopeSimple,
	LinkedinLogo,
	Phone,
} from '@phosphor-icons/react/dist/ssr';
import type React from 'react';

export interface ContactMe {
	title: string;
	url: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
export const contactMe: ContactMe[] = [
	{
		title: 'Envoyez-moi un message sur LinkedIn',
		url: `https://www.linkedin.com/in/${env.NEXT_PUBLIC_WEBSITE_PREFIX}`,
		icon: LinkedinLogo,
	},
	{
		title: "N'hésitez pas à m'appeler",
		url: `tel:${env.NEXT_PUBLIC_PHONE}`,
		icon: Phone,
	},
	{
		title: "N'hésitez pas à m'envoyer un SMS",
		url: `sms:${env.NEXT_PUBLIC_PHONE}`,
		icon: ChatCircle,
	},
	{
		title: "N'hésitez pas à m'envoyer un email",
		url: `mailto:${env.NEXT_PUBLIC_EMAIL}`,
		icon: EnvelopeSimple,
	},
	{
		title: "N'hésitez pas à m'envoyer un message",
		url: `/`,
		icon: ChatsCircle,
	},
];
