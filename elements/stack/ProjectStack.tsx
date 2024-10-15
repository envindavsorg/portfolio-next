import { projectInfo } from '@/actions/github/project.action';
import { FadeIn } from '@/components/animations/FadeIn';
import { ChannelSkeleton } from '@/components/blocs/Channel';
import { CSSIcon } from '@/components/icons/CSS';
import { GitIcon } from '@/components/icons/Git';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { MarkdownIcon } from '@/components/icons/Markdown';
import { ShellIcon } from '@/components/icons/Shell';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { PatternCard } from '@/components/ui/PatternCard';
import { env } from '@/env/server';
import { cn } from '@/lib/utils';
import { unstable_noStore as noStore } from 'next/cache';
import type React from 'react';
import { Fragment } from 'react';
import { Suspense } from 'react';

type Icons = {
	[key: string]: React.ReactNode;
};

type Languages = {
	name: string;
	percentage: number;
};

const icons: Icons = {
	Contributions: <GitIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
	TypeScript: <TypeScriptIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
	JavaScript: <JavaScriptIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
	MDX: <MarkdownIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
	CSS: <CSSIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
	Shell: <ShellIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
};

interface LanguagesProps {
	className?: string;
}

export const Languages = async ({ className }: LanguagesProps) => {
	noStore();
	const { languages, commits } = await projectInfo(env.GITHUB_REPO);
	languages.unshift({ name: 'Contributions', percentage: commits });

	return (
		<div className={cn('grid gap-3 sm:grid-cols-2', className)}>
			{languages.map(({ name, percentage }: Languages, idx: number) => (
				<PatternCard
					key={`${name}-${idx}`}
					tag="static"
					icon={icons[name]}
					title={
						name.toLowerCase() === 'contributions'
							? `${percentage} au total`
							: `Environ ${percentage.toFixed(2)}%`
					}
					comment={
						name.toLowerCase() === 'contributions'
							? '(nombre de commits)'
							: `en ${name}`
					}
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			))}
		</div>
	);
};

interface ProjectStackProps {
	className?: string;
}

export const ProjectStack = ({
	className,
}: ProjectStackProps): React.JSX.Element => (
	<Fragment>
		<FadeIn>
			<p className="leading-8">
				Les principales technologies que j'ai utilisées sur ce projet sont les
				suivantes :
			</p>
		</FadeIn>
		<Suspense
			fallback={
				<div className={cn('mt-6 grid w-full gap-3 sm:grid-cols-2', className)}>
					{Array.from({ length: 6 }).map((_, idx: number) => (
						<ChannelSkeleton key={`${idx}-channel-skeleton`} />
					))}
				</div>
			}
		>
			<Languages className={className} />
		</Suspense>
	</Fragment>
);
