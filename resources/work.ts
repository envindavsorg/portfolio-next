import { BootstrapIcon } from '@/components/icons/Bootstrap';
import { BunIcon } from '@/components/icons/Bun';
import { CSSIcon } from '@/components/icons/CSS';
import { ExpressIcon } from '@/components/icons/Express';
import { FastifyIcon } from '@/components/icons/Fastify';
import { FigmaIcon } from '@/components/icons/Figma';
import { FlaskIcon } from '@/components/icons/Flask';
import { FramerMotionIcon } from '@/components/icons/FramerMotion';
import { GitIcon } from '@/components/icons/Git';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { MarkdownIcon } from '@/components/icons/Markdown';
import { MongoDBIcon } from '@/components/icons/MongoDB';
import { MySQLIcon } from '@/components/icons/MySQL';
import { NPMIcon } from '@/components/icons/NPM';
import { NextJSIcon } from '@/components/icons/Next';
import { NodejsIcon } from '@/components/icons/Node';
import { PNPMIcon } from '@/components/icons/PNPM';
import { PostgreIcon } from '@/components/icons/Postgre';
import { PugIcon } from '@/components/icons/Pug';
import { PythonIcon } from '@/components/icons/Python';
import { ReactIcon } from '@/components/icons/React';
import { SassIcon } from '@/components/icons/Sass';
import { StorybookIcon } from '@/components/icons/Storybook';
import { TailwindIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
import { VuetifyIcon } from '@/components/icons/Vuetify';
import type { ComponentType, SVGProps } from 'react';

export interface WorkItem {
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	title: string;
}

export const wefix: WorkItem[] = [
	{ icon: TypeScriptIcon, title: 'TypeScript' },
	{ icon: JavaScriptIcon, title: 'JavaScript' },
	{ icon: ReactIcon, title: 'React' },
	{ icon: NextJSIcon, title: 'Next.js' },
	{ icon: MongoDBIcon, title: 'MongoDB' },
	{ icon: CSSIcon, title: 'CSS' },
	{ icon: SassIcon, title: 'Sass' },
	{ icon: TailwindIcon, title: 'Tailwind CSS' },
	{ icon: MarkdownIcon, title: 'Markdown' },
	{ icon: HTML5Icon, title: 'HTML5' },
	{ icon: FastifyIcon, title: 'Fastify' },
	{ icon: ExpressIcon, title: 'Express' },
	{ icon: PugIcon, title: 'Pug' },
	{ icon: GitIcon, title: 'Git' },
	{ icon: NodejsIcon, title: 'Node.js' },
	{ icon: BunIcon, title: 'Bun' },
	{ icon: NPMIcon, title: 'npm' },
	{ icon: PNPMIcon, title: 'pnpm' },
	{ icon: FigmaIcon, title: 'Figma' },
	{ icon: FramerMotionIcon, title: 'Framer Motion' },
];

export const wefixMarqueeRow: WorkItem[] = wefix.slice(0, wefix.length / 2);
export const inverseWefixMarqueeRow: WorkItem[] = wefix.slice(wefix.length / 2);

export const spinalCom: WorkItem[] = [
	{ icon: JavaScriptIcon, title: 'JavaScript' },
	{ icon: VueIcon, title: 'Vue' },
	{ icon: VuetifyIcon, title: 'Vuetify' },
	{ icon: CSSIcon, title: 'CSS' },
	{ icon: SassIcon, title: 'Sass' },
	{ icon: HTML5Icon, title: 'HTML5' },
	{ icon: TypeScriptIcon, title: 'TypeScript' },
	{ icon: StorybookIcon, title: 'Storybook' },
	{ icon: MongoDBIcon, title: 'MongoDB' },
	{ icon: PostgreIcon, title: 'PostgreSQL' },
	{ icon: GitIcon, title: 'Git' },
	{ icon: NodejsIcon, title: 'Node.js' },
	{ icon: NPMIcon, title: 'npm' },
];

export const spinalComMarqueeRow: WorkItem[] = spinalCom.slice(
	0,
	spinalCom.length / 2,
);
export const inverseSpinalComMarqueeRow: WorkItem[] = spinalCom.slice(
	spinalCom.length / 2,
);

export const economat: WorkItem[] = [
	{ icon: PythonIcon, title: 'Python' },
	{ icon: FlaskIcon, title: 'Flask' },
	{ icon: JavaScriptIcon, title: 'JavaScript' },
	{ icon: SassIcon, title: 'Sass' },
	{ icon: ReactIcon, title: 'React' },
	{ icon: HTML5Icon, title: 'HTML5' },
	{ icon: CSSIcon, title: 'CSS' },
	{ icon: GitIcon, title: 'Git' },
	{ icon: NodejsIcon, title: 'Node.js' },
	{ icon: NPMIcon, title: 'npm' },
	{ icon: MongoDBIcon, title: 'MongoDB' },
	{ icon: BootstrapIcon, title: 'Bootstrap' },
	{ icon: MySQLIcon, title: 'MySQL' },
];

export const economatMarqueeRow: WorkItem[] = economat.slice(
	0,
	economat.length / 2,
);
export const inverseEconomatMarqueeRow: WorkItem[] = economat.slice(
	economat.length / 2,
);
