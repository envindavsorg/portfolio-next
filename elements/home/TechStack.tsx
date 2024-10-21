import { FadeIn } from '@/components/animations/FadeIn';
import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { Badge } from '@/components/ui/Badge';
import { type Stack, stack } from '@/resources/stack';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { Fragment } from 'react';

export const TechStack = (): React.JSX.Element => (
	<Fragment>
		<FadeIn>
			<p className="leading-8">
				En{' '}
				<span className="font-semibold">
					{new Date().getFullYear() - 2018} ans d'expérience
				</span>
				, j'ai eu l'occasion de{' '}
				<Link
					href="/stack"
					aria-label="Technologies que j'utilise"
					className="font-bold text-theme"
				>
					travailler avec de nombreux langages et technologies
				</Link>
				, sur beaucoup de projets différents. J'ai commencé par le développement
				web avec{' '}
				<Badge>
					<HTML5Icon />
					&nbsp;HTML
				</Badge>
				,{' '}
				<Badge>
					<CSSIcon />
					&nbsp;CSS
				</Badge>{' '}
				et{' '}
				<Badge>
					<JavaScriptIcon />
					&nbsp;JavaScript
				</Badge>
				, bien évidemment.
			</p>
		</FadeIn>

		<FadeIn className="mt-6" asChild>
			<div className="flex w-full flex-row flex-wrap gap-3">
				{stack.map(({ icon: Icon, title }: Stack, idx: number) => (
					<div
						key={`${title}-${idx}`}
						className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
					>
						<Icon className="size-7 shrink-0 md:size-8" />
						<p className="sr-only">{title}</p>
					</div>
				))}
			</div>
		</FadeIn>
	</Fragment>
);
