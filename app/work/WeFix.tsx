import { CSSIcon } from '@/components/icons/CSS';
import { ExpressIcon } from '@/components/icons/Express';
import { FastifyIcon } from '@/components/icons/Fastify';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { MarkdownIcon } from '@/components/icons/Markdown';
import { MongoDBIcon } from '@/components/icons/MongoDB';
import { NextJSIcon } from '@/components/icons/Next';
import { PugIcon } from '@/components/icons/Pug';
import { ReactIcon } from '@/components/icons/React';
import { SassIcon } from '@/components/icons/Sass';
import { TailwindCSSIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import type React from 'react';

export interface WeFix {
	icon: React.ReactNode;
	title: string;
}

export const wefix: WeFix[] = [
	{
		icon: <TypeScriptIcon className="size-7 shrink-0" />,
		title: 'TypeScript',
	},
	{
		icon: <JavaScriptIcon className="size-7 shrink-0" />,
		title: 'JavaScript',
	},
	{
		icon: <ReactIcon className="size-7 shrink-0" />,
		title: 'React',
	},
	{
		icon: <NextJSIcon className="size-7 shrink-0" />,
		title: 'Next.js',
	},
	{
		icon: <MongoDBIcon className="size-7 shrink-0" />,
		title: 'MongoDB',
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
		icon: <TailwindCSSIcon className="size-7 shrink-0" />,
		title: 'Tailwind CSS',
	},
	{
		icon: <MarkdownIcon className="size-7 shrink-0" />,
		title: 'Markdown',
	},
	{
		icon: <HTML5Icon className="size-7 shrink-0" />,
		title: 'HTML5',
	},
	{
		icon: <FastifyIcon className="size-7 shrink-0" />,
		title: 'Fastify',
	},
	{
		icon: <ExpressIcon className="size-7 shrink-0" />,
		title: 'Express',
	},
	{
		icon: <PugIcon className="size-7 shrink-0" />,
		title: 'Pug',
	},
];
