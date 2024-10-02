import { Channels } from '@/components/blocs/Channels';
import { HowToScroll } from '@/components/blocs/HowToScroll';
import { LocationWidget } from '@/components/blocs/LocationWidget';
import { Stars } from '@/components/blocs/Stars';
import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { ReactIcon } from '@/components/icons/React';
import { TailwindCSSIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
import { SocialLink } from '@/components/links/SocialLink';
import { Map } from '@/components/map/Map';
import { Motion } from '@/components/motion/Motion';
import {
	variantsFive,
	variantsFour,
	variantsOne,
	variantsSeven,
	variantsSix,
	variantsThree,
	variantsTwo,
} from '@/components/motion/variants';
import { AnimatedName } from '@/components/text/AnimatedName';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { type ContactMe, contactMe } from '@/content/ContactMe';
import {
	type LanguagesIcons,
	myLanguagesIcons,
} from '@/content/LanguagesIcons';
import { env } from '@/env/client';
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles';
import { formatDate } from '@/lib/formatDate';
import { ArrowRight, Book, Calendar } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import type React from 'react';

const age: number = new Date().getFullYear() - 1994;
const experience: number = new Date().getFullYear() - 2018;

// coordinates (of Paris)
const latitude: number = 48.858093;
const longitude: number = 2.294694;

const WeFixIcon = (props: React.SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg
		viewBox="0 0 1018.5 1018.5"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		{...props}
	>
		<g className="fill-[#FF6900]">
			<path d="m213.93 723.61 81 81a16 16 0 0 0 22.61 0l487.05-487a16 16 0 0 0 0-22.6l-81-81a16 16 0 0 0 -22.62 0l-487.04 486.99a16 16 0 0 0 0 22.6" />
			<path d="m317.52 213.91a16 16 0 0 0 -22.61 0l-81 81a16 16 0 0 0 0 22.6l163.3 163.3 103.57-103.56z" />
			<path d="m804.57 701-163.39-163.43-103.57 103.64 163.39 163.38a16 16 0 0 0 22.62 0l81-81a16 16 0 0 0 0-22.61" />
		</g>
	</svg>
);

const Home = async (): Promise<React.JSX.Element> => {
	const articles: Awaited<ArticleWithSlug>[] = await getAllArticles();

	return (
		<>
			<AnimatedName />
			<p className="mt-1 font-bold text-sm text-theme sm:text-base">
				- bienvenue sur mon portfolio !
			</p>

			<div className="mt-10">
				<Motion variants={variantsOne} asChild>
					<div className="flex flex-col items-center gap-6 min-[530px]:flex-row">
						<div className="flex flex-col gap-y-3">
							<p className="leading-8">
								Bonjour, je m'appelle{' '}
								<span className="font-bold text-theme">
									{env.NEXT_PUBLIC_SURNAME}
								</span>
								, j'ai <span className="font-bold">{age} ans</span> et j'habite
								et travaille actuellement à{' '}
								<span className="font-bold">Paris</span>.
							</p>
							<p className="leading-8">
								J'ai commencé à travailler sur le web en{' '}
								<span className="font-bold">2014</span> et je n'ai jamais arrêté
								depuis.
							</p>
						</div>
						<LocationWidget latitude={latitude} longitude={longitude} />
					</div>
				</Motion>
			</div>

			<Accordion
				type="single"
				collapsible
				className="mt-3 w-full min-[530px]:mt-6"
			>
				<AccordionItem value="map">
					<AccordionTrigger className="text-theme">
						Voir sur la carte :)
					</AccordionTrigger>
					<AccordionContent>
						<Map longitude={longitude} latitude={latitude} />
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<div className="mt-12 space-y-4 leading-snug">
				<Motion variants={variantsTwo} asChild>
					<p className="leading-8">
						Je suis un <span className="font-bold">développeur</span> et{' '}
						<span className="font-bold">designer web</span> depuis{' '}
						<span className="font-bold">{experience} ans</span>, passionné par
						la création d’applications <span>belles</span> et{' '}
						<span>fonctionnelles</span>, le design et le développement web.
					</p>
				</Motion>

				<Motion variants={variantsTwo} asChild>
					<p className="leading-8">
						Je{' '}
						<Link
							href="/work"
							aria-label="Entreprises pour lesquelles j'ai travaillé"
							className="font-bold text-theme underline"
						>
							travaille
						</Link>{' '}
						actuellement chez{' '}
						<Link
							href="https://wefix.net/"
							aria-label="Voir le site WeFix !"
							target="_blank"
						>
							<Badge>
								<WeFixIcon className="me-0.5 size-4 shrink-0 pb-0.5" />
								<span>WeFix</span>
							</Badge>
						</Link>{' '}
						une <span className="font-bold">entreprise leader</span> dans la
						réparation de smartphones, tablettes, ordinateurs portables et
						consoles de jeux.
					</p>
				</Motion>
			</div>

			<Motion className="mt-12" variants={variantsThree} asChild>
				<div className="flex gap-6">
					{contactMe
						.filter((_, idx) => idx !== 3)
						.map(({ description, url, icon }: ContactMe, idx: number) => (
							<SocialLink
								key={`${idx}-contact`}
								href={url}
								aria-label={description}
								icon={icon}
								iconProps={{ weight: 'regular' }}
							/>
						))}
				</div>
			</Motion>

			<Motion className="mt-12" variants={variantsFour} asChild>
				<div className="space-y-4 leading-snug">
					<p className="leading-8">
						En{' '}
						<span className="font-semibold">{experience} ans d'expérience</span>
						, j'ai eu l'occasion de{' '}
						<Link
							href="/stack"
							aria-label="Technologies que j'utilise"
							className="font-bold text-theme underline"
						>
							travailler avec de nombreux langages et technologies
						</Link>
						, sur beaucoup de projets différents. J'ai commencé par le
						développement web avec{' '}
						<Badge>
							<HTML5Icon className="me-1 size-4 shrink-0 pb-0.5" />
							<span>HTML</span>
						</Badge>
						,{' '}
						<Badge>
							<CSSIcon className="me-1 size-4 shrink-0 pb-0.5" />
							<span>CSS</span>
						</Badge>{' '}
						et{' '}
						<Badge>
							<JavaScriptIcon className="me-1 size-4 shrink-0 pb-0.5" />
							<span>JavaScript</span>
						</Badge>
						, bien évidemment.
					</p>
				</div>
			</Motion>

			<Motion className="mt-3" variants={variantsFour} asChild>
				<div className="scrollbar-hide flex h-14 w-full flex-row space-x-2 overflow-x-auto">
					{myLanguagesIcons.map(
						({ icon, name }: LanguagesIcons, idx: number) => (
							<div
								key={`${idx}-languages`}
								className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
							>
								{icon}
								<p className="sr-only">{name}</p>
							</div>
						),
					)}
				</div>
			</Motion>
			<Motion className="mt-3" variants={variantsFour} asChild>
				<HowToScroll>
					<p>
						Vous pouvez scroller de{' '}
						<span className="font-medium text-theme">gauche</span> à{' '}
						<span className="font-medium text-theme">droite</span> pour voir
						toutes les technologies et langages que j'utilise et que je
						maîtrise.
					</p>
				</HowToScroll>
			</Motion>

			<Motion className="mt-12" variants={variantsFive} asChild>
				<div className="space-y-4 leading-snug">
					<p className="leading-8">
						J'ai ensuite{' '}
						<Link
							href="/stack"
							aria-label="Technologies que j'utilise"
							className="font-bold text-theme underline"
						>
							appris à utiliser
						</Link>{' '}
						des frameworks plus complexes comme{' '}
						<Link
							href="https://react.dev/"
							aria-label="Voir le site de React !"
							target="_blank"
						>
							<Badge>
								<ReactIcon className="me-1 size-4 shrink-0 pb-0.5" />
								<span>React</span>
							</Badge>
						</Link>{' '}
						et{' '}
						<Link
							href="https://vuejs.org/"
							aria-label="Voir le site de Vue !"
							target="_blank"
						>
							<Badge>
								<VueIcon className="me-1 size-4 shrink-0 pb-0.5" />
								<span>Vue.js</span>
							</Badge>
						</Link>
						, avec{' '}
						<Link
							href="https://www.typescriptlang.org/"
							aria-label="Voir le site de Vue !"
							target="_blank"
						>
							<Badge>
								<TypeScriptIcon className="me-1 size-4 shrink-0 pb-0.5" />
								<span>TypeScript</span>
							</Badge>
						</Link>{' '}
						en parallèle, me permettant de développer des applications plus
						robustes, belles et fonctionnelles. Pour le{' '}
						<span className="font-bold">design</span> et l'
						<span className="font-bold">UI</span> des mes applications,
						j'utilise{' '}
						<Link
							href="https://tailwindcss.com/"
							aria-label="Voir le site de Tailwind !"
							target="_blank"
						>
							<Badge>
								<TailwindCSSIcon className="me-1 size-4 shrink-0 pb-0.5" />
								<span>Tailwind CSS</span>
							</Badge>
						</Link>
						, qui est un framework incroyable de styling, puissant et modulaire.
					</p>

					<div className="mt-2">
						<Stars />
					</div>
				</div>
			</Motion>

			<Motion className="mt-12" variants={variantsSix} asChild>
				<div className="space-y-4 leading-snug">
					<p className="leading-8">
						Je suis présent sur{' '}
						<Link
							href="https://linkedin.com/"
							className="font-medium underline hover:text-theme"
						>
							LinkedIn
						</Link>{' '}
						et sur{' '}
						<Link
							href="https://github.com/"
							className="font-medium underline hover:text-theme"
						>
							GitHub
						</Link>{' '}
						<Link
							href="/github"
							aria-label="Activité et statistiques de mon profil GitHub"
							className="font-bold text-theme underline"
						>
							(retrouvez toute mon activité et mes statistiques)
						</Link>
						, n'hésitez pas à me rendre une petite visite sur mes profils et
						pourquoi pas{' '}
						<Link
							href="/contact"
							aria-label="Contactez-moi"
							className="font-bold text-theme underline"
						>
							me laisser un message
						</Link>{' '}
						:)
					</p>

					<div className="mt-2">
						<Channels />
					</div>
				</div>
			</Motion>

			<Motion className="my-12" variants={variantsSeven} asChild>
				<Separator />
			</Motion>

			<Motion variants={variantsSeven} asChild>
				<div className="flex flex-col">
					<h2 className="font-bold font-geist-sans text-foreground text-xl sm:text-2xl">
						Mes derniers articles :
					</h2>
					<p className="mt-1 text-sm sm:text-base">
						Découvrez les derniers articles de{' '}
						<Link
							href="/blog"
							aria-label="Voir mon blog"
							className="font-bold text-theme underline"
						>
							mon blog
						</Link>{' '}
						!
					</p>

					<div className="mt-6 flex flex-col gap-y-10">
						{articles
							.slice(0, 3)
							.map(({ slug, date, title, description, readingTime }) => (
								<article
									key={slug}
									className="group flex max-w-xl flex-col items-start justify-between"
								>
									<h2 className="font-bold font-geist-sans text-foreground text-lg sm:text-xl">
										<Link href={`/articles/${slug}`} aria-label={description}>
											{title}
										</Link>
									</h2>

									<div className="mt-2 flex flex-col gap-x-12 gap-y-1 text-sm sm:flex-row sm:items-center">
										<div className="flex items-center gap-x-2">
											<Calendar className="size-4 shrink-0" weight="regular" />
											<time dateTime={date}>{formatDate(date)}</time>
										</div>
										<div className="flex items-center gap-x-2">
											<Book className="size-4 shrink-0" weight="regular" />
											<p>{readingTime}</p>
										</div>
									</div>

									<p className="mt-4 line-clamp-3 text-foreground leading-6">
										{description}
									</p>

									<Link
										className="mt-5 flex items-center gap-x-2 font-bold text-sm transition-colors duration-200 group-hover:text-theme"
										href={`/articles/${slug}`}
										aria-label={description}
									>
										Lire l'article{' '}
										<ArrowRight className="size-4 shrink-0" weight="bold" />
									</Link>
								</article>
							))}
					</div>
				</div>
			</Motion>
		</>
	);
};

export default Home;
