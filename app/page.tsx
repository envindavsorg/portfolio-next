import { projectStars } from '@/actions/github/stars.action';
import { githubUser } from '@/actions/github/user.action';
import { CV } from '@/components/blocs/CV';
import { Channel, ChannelSkeleton } from '@/components/blocs/Channel';
import { FlipCard } from '@/components/blocs/FlipCard';
import { HowToScroll } from '@/components/blocs/HowToScroll';
import { Articles } from '@/components/blog/Articles';
import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { ReactIcon } from '@/components/icons/React';
import { TailwindCSSIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
import { SocialLink } from '@/components/links/SocialLink';
import { Motion } from '@/components/motion/Motion';
import {
	variantsFive,
	variantsFour,
	variantsOne,
	variantsSix,
	variantsThree,
	variantsTwo,
} from '@/components/motion/variants';
import { Status } from '@/components/status/Status';
import { AnimatedName } from '@/components/text/AnimatedName';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { type ContactMe, contactMe } from '@/content/ContactMe';
import {
	type LanguagesIcons,
	myLanguagesIcons,
} from '@/content/LanguagesIcons';
import { env as client } from '@/env/client';
import { env as server } from '@/env/server';
import avatarLinkedin from '@/images/avatar.webp';
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles';
import {
	ArrowUpRight,
	GithubLogo,
	LinkedinLogo,
} from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import type { StaticImageData } from 'next/image';
import type React from 'react';
import { Suspense } from 'react';

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

const Subscribers = async (): Promise<React.JSX.Element> => {
	const { avatar, login, followers, following } = await githubUser(
		server.GITHUB_USERNAME,
	);

	interface Data {
		avatar: string | StaticImageData;
		login: string;
		followers: number;
		following: number;
		icon: React.ReactNode;
	}

	const data: Data[] = [
		{
			avatar,
			login: `@${login}`,
			followers,
			following,
			icon: <GithubLogo />,
		},
		{
			avatar: avatarLinkedin,
			login: 'Florin Cuzeac',
			followers: 2312,
			following: 0,
			icon: <LinkedinLogo />,
		},
	];

	return (
		<div className="flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
			{data.map(
				({ avatar, login, followers, following, icon }: Data, idx: number) => (
					<Channel
						key={`${login}-${idx}`}
						avatar={avatar}
						name={login}
						link={`https://github.com/${login}`}
						subs={Math.round(followers + following)}
						icon={icon}
					/>
				),
			)}
		</div>
	);
};

const Stars = async (): Promise<React.JSX.Element> => {
	const [next, react] = await Promise.all([
		projectStars('vercel', 'next.js'),
		projectStars('facebook', 'react'),
	]);

	interface Data {
		avatar: string;
		name: string;
		link: string;
		stars: number;
	}

	const data: Data[] = [
		{
			avatar: next.avatar,
			name: next.name,
			link: `https://github.com/${next.owner}/${next.name}`,
			stars: next.stars,
		},
		{
			avatar: react.avatar,
			name: react.name,
			link: `https://github.com/${react.owner}/${react.name}`,
			stars: react.stars,
		},
	];

	return (
		<div className="flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
			{data.map(({ avatar, name, link, stars }: Data, idx: number) => (
				<Channel
					key={`${name}-${idx}`}
					avatar={avatar}
					name={`@${name}`}
					link={link}
					stars={Math.round(stars)}
					icon={<GithubLogo />}
				/>
			))}
		</div>
	);
};

const Home = async (): Promise<React.JSX.Element> => {
	const articles: Awaited<ArticleWithSlug>[] = await getAllArticles();

	return (
		<>
			<AnimatedName />
			<p className="mt-1 font-bold text-sm text-theme sm:text-base">
				- bienvenue sur mon portfolio !
			</p>

			<Motion className="mt-10" variants={variantsOne} asChild>
				<div className="flex flex-col items-center gap-6 min-[530px]:flex-row">
					<div className="flex flex-col gap-y-3">
						<p className="leading-8">
							Bonjour, je m'appelle{' '}
							<span className="font-bold text-theme">
								{client.NEXT_PUBLIC_SURNAME}
							</span>
							, j'ai <span className="font-bold">{age} ans</span> et j'ai
							commencé à travailler sur le web en{' '}
							<span className="font-bold">2014</span> et je n'ai jamais arrêté
							depuis.
						</p>

						<CV className="mt-6 sm:mt-3" />

						<div className="mt-6 flex gap-6 sm:mt-3">
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
					</div>

					<div className="mt-3 flex flex-col gap-y-2 sm:mt-0">
						<FlipCard latitude={latitude} longitude={longitude} />
						<HowToScroll>
							<p>Cliquer sur la carte :)</p>
						</HowToScroll>
					</div>
				</div>
			</Motion>

			<Motion variants={variantsOne}>
				<Separator className="my-14" />
			</Motion>

			<Motion variants={variantsTwo} asChild>
				<p className="leading-8">
					Je suis un <span className="font-bold text-theme">développeur</span>{' '}
					et <span className="font-bold text-theme">designer web</span> depuis{' '}
					<span className="font-bold">{experience} ans</span>, passionné par la
					création d’applications <span>belles</span> et{' '}
					<span>fonctionnelles</span>, le design et le développement web.
				</p>
			</Motion>
			<Motion className="mt-3" variants={variantsTwo} asChild>
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
			<Motion className="mt-6" variants={variantsTwo} asChild>
				<p className="leading-8">
					J'ai décidé de créer ce site pour{' '}
					<span className="font-bold">partager mes expériences</span> et{' '}
					<span className="font-bold">mes compétences</span> avec tout le monde.
				</p>
			</Motion>
			<Motion className="mt-3" variants={variantsTwo}>
				<Status />
			</Motion>

			<Motion variants={variantsTwo}>
				<Separator className="my-14" />
			</Motion>

			<Motion variants={variantsThree} asChild>
				<p className="leading-8">
					En{' '}
					<span className="font-semibold">{experience} ans d'expérience</span>,
					j'ai eu l'occasion de{' '}
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
			</Motion>
			<Motion className="mt-6" variants={variantsThree} asChild>
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
			<Motion className="mt-3" variants={variantsThree} asChild>
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

			<Motion variants={variantsThree}>
				<Separator className="my-14" />
			</Motion>

			<Motion className="mt-12" variants={variantsFour} asChild>
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
					<span className="font-bold">UI</span> des mes applications, j'utilise{' '}
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
			</Motion>
			<Motion className="mt-6" variants={variantsFour}>
				<Suspense
					fallback={
						<div className="flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
							{Array.from({ length: 2 }).map((_, idx: number) => (
								<ChannelSkeleton key={`${idx}-channel-skeleton`} />
							))}
						</div>
					}
				>
					<Stars />
				</Suspense>
			</Motion>

			<Motion variants={variantsFour}>
				<Separator className="my-14" />
			</Motion>

			<Motion variants={variantsFive} asChild>
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
					😃
				</p>
			</Motion>
			<Motion className="mt-6" variants={variantsFive}>
				<Suspense
					fallback={
						<div className="flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
							{Array.from({ length: 2 }).map((_, idx: number) => (
								<ChannelSkeleton key={`${idx}-channel-skeleton`} />
							))}
						</div>
					}
				>
					<Subscribers />
				</Suspense>
			</Motion>

			<Motion variants={variantsFive}>
				<Separator className="my-14" />
			</Motion>

			<Motion variants={variantsSix} asChild>
				<div className="space-y-3">
					<Link
						className="group flex items-center gap-2 font-bold tracking-tight"
						href="/blog"
					>
						<h2 className="font-bold font-geist-sans text-xl md:text-2xl">
							Mes derniers articles
						</h2>
						<ArrowUpRight
							className="text-xl transition-all group-hover:text-theme md:text-2xl"
							weight="bold"
						/>
					</Link>
					<p>
						J'écris occasionnellement des{' '}
						<span className="font-bold text-theme">articles</span> sur des
						sujets variés, comme le{' '}
						<span className="font-bold">développement web</span>, le{' '}
						<span className="font-bold">design</span>, la{' '}
						<span className="font-bold">programmation</span>, le{' '}
						<span className="font-bold">marketing</span>, etc.
					</p>
				</div>
			</Motion>
			<Motion variants={variantsSix}>
				<Articles articles={articles.slice(0, 3)} isLanding />
			</Motion>
		</>
	);
};

export default Home;
