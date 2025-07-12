import { RocketLaunchIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import Script from 'next/script';
import type React from 'react';
import { memo } from 'react';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { CV } from '@/components/blocs/CV';
import { Cards } from '@/components/blocs/cards';
import {
	StarsChannelForDesign,
	StarsChannelForFrameworks,
} from '@/components/channels/Stars';
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
import {
	Marquee,
	MarqueeContent,
	MarqueeFade,
	MarqueeItem,
} from '@/components/ui/Marquee';
import { Separator } from '@/components/ui/Separator';
import { Status, StatusIndicator, StatusLabel } from '@/components/ui/Status';
import { name, title } from '@/resources/config';
import { type Stack, stack } from '@/resources/stack';

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

const Home = async (): Promise<React.JSX.Element> => {
	const portfolioGitHubUrl = 'https://github.com/envindavsorg/portfolio-next/';
	const portfolioData = await glimpse(portfolioGitHubUrl);

	// Pre-rendered stack items for server component
	const stackItemsMemo = stack.map(({ icon: Icon, title }: Stack, index) => (
		<MarqueeItem key={`${title}-${index}`}>
			<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800">
				<Icon className="size-7 shrink-0 md:size-8" />
				<p className="sr-only">{title}</p>
			</div>
		</MarqueeItem>
	));

	// Pre-formatted date for server component
	const formattedDateMemo = new Date().toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	return (
		<>
			<Script
				id="structured-data"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			<section className="relative">
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
						Développeur web full-stack avec{' '}
						<span className="text-foreground">
							<Counter value={experienceYears} /> ans d'expérience
						</span>
						. Je conçois et développe des solutions digitales innovantes, alliant
						excellence technique et design soigné.
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
					<div className="flex flex-col gap-y-4">
						<Marquee>
							<MarqueeFade side="left" />
							<MarqueeFade side="right" />
							<MarqueeContent direction="left">
								{stackItemsMemo}
							</MarqueeContent>
						</Marquee>
						<Marquee>
							<MarqueeFade side="left" />
							<MarqueeFade side="right" />
							<MarqueeContent direction="right">
								{stackItemsMemo}
							</MarqueeContent>
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

				<FadeIn className="my-12 flex flex-col gap-y-4">
					<PageParagraph>
						Mes deux frameworks favoris, qui sont aussi très populaires, sont :
					</PageParagraph>
					<StarsChannelForFrameworks />
				</FadeIn>

				<FadeIn className="flex flex-col gap-y-4">
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
						évolutives. J'intègre ensuite{' '}
						<Link
							href="https://ui.shadcn.com/"
							aria-label="Voir le site de shadcn/ui !"
							target="_blank"
							rel="noopener noreferrer"
						>
							<BadgeWithIcon type="shadcn" />
						</Link>
						, une bibliothèque de composants React flexible et accessible.
					</PageParagraph>
					<StarsChannelForDesign />
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
					, n'hésitez pas à me rendre une petite visite sur mes profils et pourquoi pas me
					laisser un message 😃
				</PageParagraph>
				<SubscribersChannel />

				<Separator className="my-12" />

				<FadeIn className="flex flex-col gap-y-3">
					<Status status="online">
						<StatusIndicator />
						<StatusLabel>en cours d'évolution</StatusLabel>
					</Status>
					<h3 className="mt-3 font-semibold text-foreground text-xl">
						Portfolio en perpétuelle évolution
					</h3>
					<PageParagraph>
						Ce portfolio est bien plus qu'une simple vitrine : c'est un écosystème vivant
						qui grandit avec moi. Chaque nouveau projet, chaque compétence acquise, chaque
						expérience vécue vient enrichir cet espace numérique. Comme un jardin digital,
						il fleurit continuellement avec mes découvertes, mes créations et mes
						aventures dans le monde du développement.
						<span className="mt-2 block font-medium text-foreground">
							Revenez régulièrement pour découvrir les nouveautés ! 🌱
						</span>
					</PageParagraph>
					<div className="mt-6 flex items-center gap-2 text-muted-foreground text-sm">
						<span>Dernière mise à jour :</span>
						<time className="font-medium text-foreground">
							{formattedDateMemo}
						</time>
					</div>
				</FadeIn>

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
