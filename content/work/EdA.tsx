import { CSSIcon } from '@/components/icons/CSS';
import { FlaskIcon } from '@/components/icons/Flask'; // Add the Flask icon import
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { ReactIcon } from '@/components/icons/React';
import type React from 'react';

export interface EdA {
	icon: React.ReactNode;
	title: string;
}

export const economat: EdA[] = [
	{
		icon: <FlaskIcon className="size-7 shrink-0" />,
		title: 'Flask',
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
		icon: <HTML5Icon className="size-7 shrink-0" />,
		title: 'HTML5',
	},
	{
		icon: <CSSIcon className="size-7 shrink-0" />,
		title: 'CSS',
	},
];
