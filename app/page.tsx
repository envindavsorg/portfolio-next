import Link from 'next/link';
import type React from 'react';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { CV } from '@/components/blocs/CV';
import { Marquee } from '@/components/blocs/Marquee';
import { Cards } from '@/components/cards';
import { BadgeWithIcon } from '@/components/layout/Badges';
import { Counter } from '@/components/text/Counter';
import PageParagraph from '@/components/text/PageParagraph';
import PageTitle from '@/components/text/PageTitle';
import { Separator } from '@/components/ui/Separator';
import { name, title } from '@/resources/config';
import { inverseStackMarqueeRow, type Stack, stackMarqueeRow } from '@/resources/stack';

const firstName = name.trim().split(' ').pop() || 'Florin';
const jobTitle = 'développeur front-end et designer web UX / UI';
const experienceYears = 10;

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name,
	jobTitle,
	description: `Développeur web avec ${experienceYears} ans d'expérience`,
	worksFor: {
		'@type': 'Organization',
		name: 'WeFix',
	},
	knowsAbout: [
		'Développement web',
		'React',
		'Next.js',
		'UX/UI Design',
		'JavaScript',
		'TypeScript',
	],
};

const Home = (): React.JSX.Element => (
	<>
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>

		<section>
			<PageTitle name={name} title={title} isHome>
				- {jobTitle}
			</PageTitle>
			<FadeInStagger className="mt-6 flex flex-col gap-y-2" faster>
				<PageParagraph>
					Bonjour, je suis {firstName} ✌️, développeur web avec{' '}
					<span className="text-foreground">
						<Counter value={experienceYears} /> ans d'expérience
					</span>
					, passionné par la création d'applications fiables, belles et fonctionnelles.
				</PageParagraph>
				<CV className="my-4" />
				<PageParagraph>
					Je travaille actuellement chez{' '}
					<Link href="/work" className="font-medium text-foreground" prefetch={false}>
						<span className="text-theme">/</span>WeFix
					</Link>
					, leader de la réparation, où je développe des solutions web pour améliorer
					l'expérience utilisateur.
				</PageParagraph>
			</FadeInStagger>

			<Cards />

			<Separator className="my-12" />

			<FadeIn>
				<PageParagraph>
					J’ai travaillé sur de nombreux projets mobilisant divers langages et
					technologies. Mes premiers développements portaient sur la création de sites web
					avec <BadgeWithIcon type="html" />, <BadgeWithIcon type="css" /> et{' '}
					<BadgeWithIcon type="js" />.
				</PageParagraph>
			</FadeIn>

			<FadeIn className="mt-6" asChild>
				<div className="flex flex-col">
					<Marquee pauseOnHover className="[--duration:20s]">
						{stackMarqueeRow.map(({ icon: Icon, title }: Stack, idx: number) => (
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
						{inverseStackMarqueeRow.map(({ icon: Icon, title }: Stack, idx: number) => (
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

			<Separator className="my-12" />
		</section>
	</>
);

export default Home;
