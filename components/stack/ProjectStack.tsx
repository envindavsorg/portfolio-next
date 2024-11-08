import { projectInfo } from '@/actions/github/project.action';
import { ChannelSkeleton } from '@/components/channels/Skeleton';
import { CSSIcon } from '@/components/icons/CSS';
import { GitIcon } from '@/components/icons/Git';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { MarkdownIcon } from '@/components/icons/Markdown';
import { ShellIcon } from '@/components/icons/Shell';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { Paragraph } from '@/components/layout/Paragraph';
import { PatternCard } from '@/components/ui/PatternCard';
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

export const Languages = async () => {
	const { languages, commits } = await projectInfo(process.env.GITHUB_REPO!);
	languages.unshift({ name: 'Contributions', percentage: commits });

	return (
		<div className="mt-6 grid gap-3 sm:grid-cols-2">
			{languages.map(({ name, percentage }: Languages, idx: number) => (
				<PatternCard
					key={`${name}-${idx}`}
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

export const ProjectStack = (): React.JSX.Element => (
	<Fragment>
		<Paragraph>
			Les principales technologies que j'ai utilisées sur ce projet sont les
			suivantes :
		</Paragraph>
		<Suspense
			fallback={
				<div className="mt-6 grid w-full gap-3 sm:grid-cols-2">
					{Array.from({ length: 6 }).map((_, idx: number) => (
						<ChannelSkeleton key={`${idx}-channel-skeleton`} />
					))}
				</div>
			}
		>
			<Languages />
		</Suspense>
	</Fragment>
);
