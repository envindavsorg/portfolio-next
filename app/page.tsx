import { RocketLaunchIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import Script from 'next/script';
import type React from 'react';
import { memo, useMemo } from 'react';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { CV } from '@/components/blocs/CV';
import { Cards } from '@/components/blocs/cards';
import { Marquee } from '@/components/blocs/Marquee';
import { StarsChannel } from '@/components/channels/Stars';
import { SubscribersChannel } from '@/components/channels/Subscribers';
import { Counter } from '@/components/text/Counter';
import PageParagraph from '@/components/text/PageParagraph';
import PageTitle from '@/components/text/PageTitle';
import { TextHoverEffect } from '@/components/text/TextHover';
import {
	Announcement,
	AnnouncementTag,
	AnnouncementTitle,
} from '@/components/ui/Announcement';
import { BadgeWithIcon } from '@/components/ui/Badge';
import {
	Glimpse,
	GlimpseContent,
	GlimpseDescription,
	GlimpseImage,
	GlimpseTitle,
	GlimpseTrigger,
} from '@/components/ui/Glimpse';
import { glimpse } from '@/components/ui/Glimpse/server';
import { Separator } from '@/components/ui/Separator';
import { name, title } from '@/resources/config';
import { inverseStackMarqueeRow, type Stack, stackMarqueeRow } from '@/resources/stack';

const firstName = name.trim().split(' ').pop() || 'Florin';
const jobTitle = 'développeur front-end et designer UX / UI';
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

const StackMarqueeItem = memo(
	({ icon: Icon, title, index }: Stack & { index: number }) => (
		<div
			key={`${title}-${index}`}
			className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
		>
			<Icon className="size-7 shrink-0 md:size-8" />
			<p className="sr-only">{title}</p>
		</div>
	),
);

StackMarqueeItem.displayName = 'StackMarqueeItem';

const Home = async (): Promise<React.JSX.Element> => {
	const stackMarqueeItems = useMemo(
		() =>
			stackMarqueeRow.map((stack, idx) => (
				<StackMarqueeItem key={`${stack.title}-${idx}`} {...stack} index={idx} />
			)),
		[],
	);

	const inverseStackMarqueeItems = useMemo(
		() =>
			inverseStackMarqueeRow.map((stack, idx) => (
				<StackMarqueeItem key={`${stack.title}-${idx}`} {...stack} index={idx} />
			)),
		[],
	);

	// glimpse
	const portfolioGitHubUrl = 'https://github.com/envindavsorg/portfolio-next/';
	const portfolioData = await glimpse(portfolioGitHubUrl);

	return (
		<>
			<Script
				id="structured-data"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			<section>
				<Glimpse closeDelay={0} openDelay={0}>
					<GlimpseTrigger asChild>
						<Link
							href="https://wefix.net"
							aria-label="Voir le site de WeFix !"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-foreground"
							prefetch={false}
						>
							<Announcement className="mb-6">
								<AnnouncementTag>Mise à jour 2.0</AnnouncementTag>
								<AnnouncementTitle>
									Mon nouveau portfolio !
									<RocketLaunchIcon className="size-4 shrink-0 text-muted-foreground" />
								</AnnouncementTitle>
							</Announcement>
						</Link>
					</GlimpseTrigger>
					<GlimpseContent className="mt-3 w-80">
						<GlimpseImage src={portfolioData.image ?? ''} />
						<GlimpseTitle>{portfolioData.title}</GlimpseTitle>
						<GlimpseDescription>{portfolioData.description}</GlimpseDescription>
					</GlimpseContent>
				</Glimpse>
				<PageTitle name={name} title={title} isHome>
					- {jobTitle}
				</PageTitle>
				<FadeInStagger className="mt-6 flex flex-col gap-y-2" faster>
					<PageParagraph>
						Je suis {firstName} ✌️, développeur web avec une forte appétence pour le
						design, avec{' '}
						<span className="text-foreground">
							<Counter value={experienceYears} /> ans d'expérience
						</span>
						, passionné par la création d'applications fiables, belles et fonctionnelles.
					</PageParagraph>
					<CV className="my-4" />
					<PageParagraph>
						Je travaille actuellement chez{' '}
						<Link
							href="https://wefix.net/"
							aria-label="Voir le site de WeFix !"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-foreground"
							prefetch={false}
						>
							<span className="text-theme">/</span>WeFix
						</Link>
						, leader de la réparation, où je développe des solutions web pour améliorer
						l'expérience utilisateur.
					</PageParagraph>
				</FadeInStagger>

				<Cards />

				<Separator className="my-12" />

				<FadeIn asChild>
					<PageParagraph>
						J’ai travaillé sur de nombreux projets mobilisant divers langages et
						technologies. Mes premiers développements portaient sur la création de sites
						web avec <BadgeWithIcon type="html" />, <BadgeWithIcon type="css" /> et{' '}
						<BadgeWithIcon type="js" />.
					</PageParagraph>
				</FadeIn>

				<FadeIn className="my-12" asChild>
					<div className="flex flex-col">
						<Marquee pauseOnHover className="[--duration:20s]">
							{stackMarqueeItems}
						</Marquee>
						<Marquee reverse pauseOnHover className="[--duration:20s]">
							{inverseStackMarqueeItems}
						</Marquee>
					</div>
				</FadeIn>

				<FadeIn asChild>
					<PageParagraph>
						J'ai ensuite maîtrisé des frameworks tels que{' '}
						<Link
							href="https://react.dev/"
							aria-label="Voir le site de React !"
							target="_blank"
							rel="noopener noreferrer"
						>
							<BadgeWithIcon type="react" />
						</Link>{' '}
						<Link
							href="https://nextjs.org/"
							aria-label="Voir le site de Next.js !"
							target="_blank"
							rel="noopener noreferrer"
						>
							<BadgeWithIcon type="next" />
						</Link>{' '}
						et{' '}
						<Link
							href="https://vuejs.org/"
							aria-label="Voir le site de Vue !"
							target="_blank"
							rel="noopener noreferrer"
						>
							<BadgeWithIcon type="vue" />
						</Link>{' '}
						tout en adoptant{' '}
						<Link
							href="https://www.typescriptlang.org/"
							aria-label="Voir le site de TypeScript !"
							target="_blank"
							rel="noopener noreferrer"
						>
							<BadgeWithIcon type="ts" />
						</Link>
						, ce qui m'a permis de concevoir des applications performantes et
						maintenables.
					</PageParagraph>
				</FadeIn>

				<StarsChannel className="my-12" />

				<FadeIn asChild>
					<PageParagraph>
						Pour le design de mes applications, je commence par maîtriser{' '}
						<BadgeWithIcon type="css" /> avant d'adopter{' '}
						<Link
							href="https://tailwindcss.com/"
							aria-label="Voir le site de Tailwind !"
							target="_blank"
							rel="noopener noreferrer"
						>
							<BadgeWithIcon type="tailwind" />
						</Link>
						, un framework de styling modulaire et performant. Tailwind accélère le
						développement grâce à sa vaste collection de classes utilitaires et sa
						personnalisation simple, tout en garantissant des interfaces cohérentes et
						évolutives.
					</PageParagraph>
				</FadeIn>

				<Separator className="my-12" />

				<PageParagraph>
					Je suis présent sur{' '}
					<Link
						href="https://linkedin.com/"
						className="no-underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</Link>{' '}
					et sur{' '}
					<Link
						href="https://github.com/"
						className="no-underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</Link>
					, n'hésitez pas à me rendre une petite visite sur mes profils et pourquoi pas{' '}
					<Link
						href="/contact"
						aria-label="Contactez-moi"
						className="font-bold text-theme"
					>
						me laisser
					</Link>{' '}
					un message 😃
				</PageParagraph>
				<SubscribersChannel />

				{/*<Separator className="my-12" />

				<ArticlesContent />*/}

				<div className="mt-20 flex items-center justify-center">
					<TextHoverEffect text={firstName.toUpperCase()} />
				</div>
			</section>
		</>
	);
};

export default memo(Home);
