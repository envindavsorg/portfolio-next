import { FadeIn } from '@/components/animations/FadeIn';
import { HowToScroll } from '@/components/blocs/HowToScroll';
import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { Badge } from '@/components/ui/Badge';
import {
	type LanguagesIcons,
	myLanguagesIcons,
} from '@/content/LanguagesIcons';
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
			<div className="scrollbar-hide flex h-14 w-full flex-row space-x-2 overflow-x-auto">
				{myLanguagesIcons.map(({ icon, name }: LanguagesIcons, idx: number) => (
					<div
						key={`${idx}-languages`}
						className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
					>
						{icon}
						<p className="sr-only">{name}</p>
					</div>
				))}
			</div>
		</FadeIn>

		<FadeIn className="mt-3">
			<HowToScroll>
				<p>
					Vous pouvez scroller de{' '}
					<span className="font-medium text-theme">gauche</span> à{' '}
					<span className="font-medium text-theme">droite</span> pour voir
					toutes les technologies et langages que j'utilise et que je maîtrise.
				</p>
			</HowToScroll>
		</FadeIn>
	</Fragment>
);
