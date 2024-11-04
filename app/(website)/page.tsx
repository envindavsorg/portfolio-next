// Copyright Cuzeac Florin 2024. All Rights Reserved.
// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { CV } from '@/components/blocs/CV';
import { Location } from '@/components/blocs/Location';
import { Marquee } from '@/components/blocs/Marquee';
import {
	CSSBadge,
	HTMLBadge,
	JavaScriptBadge,
} from '@/components/layout/Badges';
import { Paragraph } from '@/components/layout/Paragraph';
import { Title } from '@/components/layout/Title';
import { Counter } from '@/components/numbers/Counter';
import { Separator } from '@/components/ui/Separator';
import { BlogArticles, ProjectStars, SocialSubs } from '@/elements/home';
import { age, developerSince, name, title } from '@/resources/config';
import {
	type Stack,
	inverseStackMarqueeRow,
	stackMarqueeRow,
} from '@/resources/stack';
import { Link } from 'next-view-transitions';
import type React from 'react';

const Home = (): React.JSX.Element => (
	<>
		<Title name={name} title={title}>
			bienvenue sur mon portfolio !
		</Title>

		<FadeInStagger className="mt-10" faster>
			<div className="flex flex-col items-center gap-6 min-[530px]:flex-row">
				<div className="flex flex-col">
					<Paragraph className="font-bold">
						Bonjour, je m'appelle{' '}
						<span className="text-theme">{name.trim().split(' ').pop()}</span>.
					</Paragraph>
					<Paragraph className="mt-3 min-[530px]:text-[14.5px]">
						J'habite à <span className="font-bold">Paris</span>, j'ai{' '}
						<span className="font-bold">
							<Counter value={age} /> ans
						</span>{' '}
						et j'ai commencé à travailler sur le web en{' '}
						<span className="font-bold">2014</span> et je n'ai jamais arrêté
						depuis.
					</Paragraph>
					<CV className="mt-6" />
				</div>
				<Location />
			</div>
			<Paragraph className="mt-12">
				Je suis un <span className="font-bold text-theme">développeur</span> et{' '}
				<span className="font-bold text-theme">designer web</span> depuis{' '}
				<span className="font-bold">{developerSince} ans</span>, passionné par
				la création d’applications <span>belles</span> et{' '}
				<span>fonctionnelles</span>, le design et le développement web.
			</Paragraph>
			<Paragraph className="mt-3">
				J'ai décidé de créer ce site pour{' '}
				<span className="font-bold">partager mes expériences</span> et{' '}
				<span className="font-bold">mes compétences</span> avec tout le monde.
			</Paragraph>

			<Separator className="my-12" />

			<Paragraph>
				Je travaille actuellement chez{' '}
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
			</Paragraph>
			<Paragraph className="mt-6">
				En{' '}
				<span className="font-semibold">{developerSince} ans d'expérience</span>
				, j'ai eu l'occasion de{' '}
				<Link
					href="/stack"
					aria-label="Technologies que j'utilise"
					className="font-bold text-theme"
				>
					travailler
				</Link>{' '}
				avec de nombreux langages et technologies, sur beaucoup de projets
				différents. J'ai commencé par le développement web avec <HTMLBadge />,{' '}
				<CSSBadge /> et <JavaScriptBadge />, bien évidemment.
			</Paragraph>
			<FadeIn className="mt-6" asChild>
				<div className="flex flex-col">
					<Marquee pauseOnHover className="mt-3 [--duration:20s]">
						{stackMarqueeRow.map(
							({ icon: Icon, title }: Stack, idx: number) => (
								<div
									key={`${title}-${idx}`}
									className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
								>
									<Icon className="size-7 shrink-0 md:size-8" />
									<p className="sr-only">{title}</p>
								</div>
							),
						)}
					</Marquee>
					<Marquee reverse pauseOnHover className="[--duration:20s]">
						{inverseStackMarqueeRow.map(
							({ icon: Icon, title }: Stack, idx: number) => (
								<div
									key={`${title}-${idx}`}
									className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
								>
									<Icon className="size-7 shrink-0 md:size-8" />
									<p className="sr-only">{title}</p>
								</div>
							),
						)}
					</Marquee>
				</div>
			</FadeIn>

			<Separator className="my-12" />

			<ProjectStars />
			<Separator className="my-12" />
			<SocialSubs />
			<Separator className="my-12" />
			<BlogArticles />
		</FadeInStagger>
	</>
);

export default Home;
