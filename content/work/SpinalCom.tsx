import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { MongoDBIcon } from '@/components/icons/MongoDB';
import { PostgreIcon } from '@/components/icons/Postgre'; // Add the PostgreSQL icon import
import { SassIcon } from '@/components/icons/Sass';
import { StorybookIcon } from '@/components/icons/Storybook'; // Add the Storybook icon import
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue'; // Add the Vue icon import
import { VuetifyIcon } from '@/components/icons/Vuetify'; // Add the Vuetify icon import
import type React from 'react';

export interface SpinalCom {
	icon: React.ReactNode;
	title: string;
}

export const spinalCom: SpinalCom[] = [
	{
		icon: <JavaScriptIcon className="size-7 shrink-0" />,
		title: 'JavaScript',
	},
	{
		icon: <VueIcon className="size-7 shrink-0" />,
		title: 'Vue',
	},
	{
		icon: <VuetifyIcon className="size-7 shrink-0" />,
		title: 'Vuetify',
	},
	{
		icon: <CSSIcon className="size-7 shrink-0" />,
		title: 'CSS',
	},
	{
		icon: <SassIcon className="size-7 shrink-0" />,
		title: 'Sass',
	},
	{
		icon: <HTML5Icon className="size-7 shrink-0" />,
		title: 'HTML5',
	},
	{
		icon: <TypeScriptIcon className="size-7 shrink-0" />,
		title: 'TypeScript',
	},
	{
		icon: <StorybookIcon className="size-7 shrink-0" />,
		title: 'Storybook',
	},
	{
		icon: <MongoDBIcon className="size-7 shrink-0" />,
		title: 'MongoDB',
	},
	{
		icon: <PostgreIcon className="size-7 shrink-0" />,
		title: 'PostgreSQL',
	},
];
