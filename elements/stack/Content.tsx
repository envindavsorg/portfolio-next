import { ExpressIcon } from '@/components/icons/Express';
import { FastifyIcon } from '@/components/icons/Fastify';
import { MongoDBIcon } from '@/components/icons/MongoDB';
import { NextJSIcon } from '@/components/icons/Next';
import { PostgreIcon } from '@/components/icons/Postgre';
import { ReactIcon } from '@/components/icons/React';
import { TailwindCSSIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import React from 'react';

export const PreferredStack = [
	{
		name: 'React',
		icon: <ReactIcon className="size-7 shrink-0" />,
	},
	{
		name: 'Next.js',
		icon: <NextJSIcon className="size-7 shrink-0" />,
	},
	{
		name: 'TypeScript',
		icon: <TypeScriptIcon className="size-7 shrink-0" />,
	},
	{
		name: 'Tailwind CSS',
		icon: <TailwindCSSIcon className="size-7 shrink-0" />,
	},
	{
		name: 'MongoDB',
		icon: <MongoDBIcon className="size-7 shrink-0" />,
	},
	{
		name: 'PostgreSQL',
		icon: <PostgreIcon className="size-7 shrink-0" />,
	},
	{
		name: 'Express',
		icon: <ExpressIcon className="size-7 shrink-0" />,
	},
	{
		name: 'Fastify',
		icon: <FastifyIcon className="size-7 shrink-0" />,
	},
];
