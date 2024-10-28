import { FadeIn } from '@/components/animations/FadeIn';
import { Marquee } from '@/components/blocs/Marquee';
import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { Badge } from '@/components/ui/Badge';
import { type Stack, stack } from '@/resources/stack';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { Fragment } from 'react';

const firstMarqueeRow: Stack[] = stack.slice(0, stack.length / 2);
const secondMarqueeRow: Stack[] = stack.slice(stack.length / 2);
const experienceYears: number = new Date().getFullYear() - 2018;

export const TechStack = (): React.JSX.Element => (
	<Fragment>
		<FadeIn>
			<p className="leading-8">
				Je{' '}
				<Link
					href="/work"
					aria-label="Entreprises pour lesquelles j'ai travaillé"
					className="font-bold text-theme"
				>
					travaille
				</Link>{' '}
				actuellement chez{' '}
				<Link
					href="https://wefix.net/"
					aria-label="Voir le site WeFix !"
					target="_blank"
					className="font-extrabold text-theme"
				>
					WeFix
				</Link>{' '}
				une <span className="font-bold">entreprise leader</span> dans la
				réparation de smartphones, tablettes, ordinateurs portables et consoles
				de jeux.
			</p>
		</FadeIn>

		<FadeIn className="mt-6" asChild>
			<div className="flex flex-col">
				<p className="leading-8">
					En{' '}
					<span className="font-semibold">
						{experienceYears} ans d'expérience
					</span>
					, j'ai eu l'occasion de{' '}
					<Link
						href="/stack"
						aria-label="Technologies que j'utilise"
						className="font-bold text-theme"
					>
						travailler
					</Link>{' '}
					avec de nombreux langages et technologies, sur beaucoup de projets
					différents. J'ai commencé par le développement web avec{' '}
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

				<Marquee pauseOnHover className="mt-3 [--duration:20s]">
					{firstMarqueeRow.map(({ icon: Icon, title }: Stack, idx: number) => (
						<div
							key={`${title}-${idx}`}
							className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
						>
							<Icon className="size-7 shrink-0 md:size-8" />
							<p className="sr-only">{title}</p>
						</div>
					))}
				</Marquee>
				<Marquee reverse pauseOnHover className="[--duration:20s]">
					{secondMarqueeRow.map(({ icon: Icon, title }: Stack, idx: number) => (
						<div
							key={`${title}-${idx}`}
							className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
						>
							<Icon className="size-7 shrink-0 md:size-8" />
							<p className="sr-only">{title}</p>
						</div>
					))}
				</Marquee>
			</div>
		</FadeIn>
	</Fragment>
);
