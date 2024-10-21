import { BunIcon } from '@/components/icons/Bun';
import { CSSIcon } from '@/components/icons/CSS';
import { ExpressIcon } from '@/components/icons/Express';
import { FastifyIcon } from '@/components/icons/Fastify';
import { FigmaIcon } from '@/components/icons/Figma';
import { FramerMotionIcon } from '@/components/icons/FramerMotion';
import { GitIcon } from '@/components/icons/Git';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { MarkdownIcon } from '@/components/icons/Markdown';
import { MongoDBIcon } from '@/components/icons/MongoDB';
import { NPMIcon } from '@/components/icons/NPM';
import { NextJSIcon } from '@/components/icons/Next';
import { NodejsIcon } from '@/components/icons/Node';
import { PNPMIcon } from '@/components/icons/PNPM';
import { PugIcon } from '@/components/icons/Pug';
import { ReactIcon } from '@/components/icons/React';
import { SassIcon } from '@/components/icons/Sass';
import { TailwindIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
import type { ComponentType, SVGProps } from 'react';

export interface Stack {
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	title: string;
}

export const stack: Stack[] = [
	{ icon: HTML5Icon, title: 'HTML5' },
	{ icon: CSSIcon, title: 'CSS' },
	{ icon: SassIcon, title: 'Sass' },
	{ icon: JavaScriptIcon, title: 'JavaScript' },
	{ icon: TypeScriptIcon, title: 'TypeScript' },
	{ icon: ReactIcon, title: 'React' },
	{ icon: NextJSIcon, title: 'Next.js' },
	{ icon: MongoDBIcon, title: 'MongoDB' },
	{ icon: ExpressIcon, title: 'Express' },
	{ icon: FastifyIcon, title: 'Fastify' },
	{ icon: MarkdownIcon, title: 'Markdown' },
	{ icon: TailwindIcon, title: 'Tailwind CSS' },
	{ icon: VueIcon, title: 'Vue' },
	{ icon: PugIcon, title: 'Pug' },
	{ icon: GitIcon, title: 'Git' },
	{ icon: NodejsIcon, title: 'Node.js' },
	{ icon: BunIcon, title: 'Bun' },
	{ icon: NPMIcon, title: 'npm' },
	{ icon: PNPMIcon, title: 'pnpm' },
	{ icon: FigmaIcon, title: 'Figma' },
	{ icon: FramerMotionIcon, title: 'Framer Motion' },
];
