'use client';

import { Suspense, lazy, type ComponentType } from 'react';

interface IconProps {
	className?: string;
	'aria-hidden'?: boolean;
}

// Dynamic icon imports for code splitting
const iconComponents: Record<string, () => Promise<{ default: ComponentType<IconProps> }>> = {
	bash: () => import('./Bash').then((mod) => ({ default: mod.BashIcon })),
	bootstrap: () => import('./Bootstrap').then((mod) => ({ default: mod.BootstrapIcon })),
	bun: () => import('./Bun').then((mod) => ({ default: mod.BunIcon })),
	css: () => import('./CSS').then((mod) => ({ default: mod.CSSIcon })),
	express: () => import('./Express').then((mod) => ({ default: mod.ExpressIcon })),
	fastify: () => import('./Fastify').then((mod) => ({ default: mod.FastifyIcon })),
	figma: () => import('./Figma').then((mod) => ({ default: mod.FigmaIcon })),
	flask: () => import('./Flask').then((mod) => ({ default: mod.FlaskIcon })),
	framermotion: () => import('./FramerMotion').then((mod) => ({ default: mod.FramerMotionIcon })),
	git: () => import('./Git').then((mod) => ({ default: mod.GitIcon })),
	github: () => import('./GitHub').then((mod) => ({ default: mod.GitHubIcon })),
	githubtext: () => import('./GitHubText').then((mod) => ({ default: mod.GitHubText })),
	html: () => import('./HTML').then((mod) => ({ default: mod.HTML5Icon })),
	javascript: () => import('./JavaScript').then((mod) => ({ default: mod.JavaScriptIcon })),
	js: () => import('./JavaScript').then((mod) => ({ default: mod.JavaScriptIcon })),
	json: () => import('./Json').then((mod) => ({ default: mod.JsonIcon })),
	markdown: () => import('./Markdown').then((mod) => ({ default: mod.MarkdownIcon })),
	mongodb: () => import('./MongoDB').then((mod) => ({ default: mod.MongoDBIcon })),
	mysql: () => import('./MySQL').then((mod) => ({ default: mod.MySQLIcon })),
	next: () => import('./Next').then((mod) => ({ default: mod.NextJSIcon })),
	node: () => import('./Node').then((mod) => ({ default: mod.NodejsIcon })),
	npm: () => import('./NPM').then((mod) => ({ default: mod.NPMIcon })),
	pnpm: () => import('./PNPM').then((mod) => ({ default: mod.PNPMIcon })),
	postgre: () => import('./Postgre').then((mod) => ({ default: mod.PostgreIcon })),
	pug: () => import('./Pug').then((mod) => ({ default: mod.PugIcon })),
	python: () => import('./Python').then((mod) => ({ default: mod.PythonIcon })),
	react: () => import('./React').then((mod) => ({ default: mod.ReactIcon })),
	sass: () => import('./Sass').then((mod) => ({ default: mod.SassIcon })),
	shadcn: () => import('./Shadcn').then((mod) => ({ default: mod.ShadcnIcon })),
	shell: () => import('./Shell').then((mod) => ({ default: mod.ShellIcon })),
	storybook: () => import('./Storybook').then((mod) => ({ default: mod.StorybookIcon })),
	tailwind: () => import('./Tailwind').then((mod) => ({ default: mod.TailwindIcon })),
	typescript: () => import('./TypeScript').then((mod) => ({ default: mod.TypeScriptIcon })),
	ts: () => import('./TypeScript').then((mod) => ({ default: mod.TypeScriptIcon })),
	v0: () => import('./V0').then((mod) => ({ default: mod.V0Icon })),
	vue: () => import('./Vue').then((mod) => ({ default: mod.VueIcon })),
	vuetify: () => import('./Vuetify').then((mod) => ({ default: mod.VuetifyIcon })),
};

const IconSkeleton = ({ className }: { className?: string }) => (
	<span className={`inline-block animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded ${className}`} />
);

interface DynamicIconProps extends IconProps {
	name: string;
}

export const DynamicIcon = ({ name, className, ...props }: DynamicIconProps) => {
	const iconKey = name.toLowerCase().replace(/\s+/g, '');
	const iconLoader = iconComponents[iconKey];

	if (!iconLoader) {
		console.warn(`Icon "${name}" not found in icon components`);
		return <IconSkeleton className={className} />;
	}

	const LazyIcon = lazy(iconLoader);

	return (
		<Suspense fallback={<IconSkeleton className={className} />}>
			<LazyIcon className={className} {...props} />
		</Suspense>
	);
};

// Export list of available icons
export const availableIcons = Object.keys(iconComponents);