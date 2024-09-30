import { CSSIcon } from '@/components/icons/CSS';
import { ExpressIcon } from '@/components/icons/Express';
import { FastifyIcon } from '@/components/icons/Fastify';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { MarkdownIcon } from '@/components/icons/Markdown';
import { MongoDBIcon } from '@/components/icons/MongoDB';
import { NextJSIcon } from '@/components/icons/Next';
import { ReactIcon } from '@/components/icons/React';
import { SassIcon } from '@/components/icons/Sass';
import { TailwindCSSIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
import type React from 'react';

export interface LanguagesIcons {
	name: string;
	icon: React.ReactNode;
}

export const myLanguagesIcons: LanguagesIcons[] = [
	{
		name: 'HTML5',
		icon: <HTML5Icon className="size-7 shrink-0" />,
	},
	{
		name: 'CSS',
		icon: <CSSIcon className="size-7 shrink-0" />,
	},
	{
		name: 'Sass',
		icon: <SassIcon className="size-7 shrink-0" />,
	},
	{
		name: 'JavaScript',
		icon: <JavaScriptIcon className="size-7 shrink-0" />,
	},
	{
		name: 'TypeScript',
		icon: <TypeScriptIcon className="size-7 shrink-0" />,
	},
	{
		name: 'React',
		icon: <ReactIcon className="size-7 shrink-0" />,
	},
	{
		name: 'Next.js',
		icon: <NextJSIcon className="size-7 shrink-0" />,
	},
	{
		name: 'MongoDB',
		icon: <MongoDBIcon className="size-7 shrink-0" />,
	},
	{
		name: 'Express',
		icon: <ExpressIcon className="size-7 shrink-0" />,
	},
	{
		name: 'Fastify',
		icon: <FastifyIcon className="size-7 shrink-0" />,
	},
	{
		name: 'Markdown',
		icon: <MarkdownIcon className="size-7 shrink-0" />,
	},
	{
		name: 'Tailwind CSS',
		icon: <TailwindCSSIcon className="size-7 shrink-0" />,
	},
	{
		name: 'Vue',
		icon: <VueIcon className="size-7 shrink-0" />,
	},
];
