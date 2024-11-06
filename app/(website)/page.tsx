// Copyright Cuzeac Florin 2024. All Rights Reserved.
// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

import { projectStars } from '@/actions/github/stars.action';
import { githubUser } from '@/actions/github/user.action';
import { PreLoader } from '@/components/PreLoader';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { CV } from '@/components/blocs/CV';
import { Channel, ChannelSkeleton } from '@/components/blocs/Channel';
import { Marquee } from '@/components/blocs/Marquee';
import { ArticlesContent } from '@/components/blog/ArticlesContent';
import {
	CSSBadge,
	HTMLBadge,
	JavaScriptBadge,
	ReactBadge,
	TailwindBadge,
	TypeScriptBadge,
	VueBadge,
} from '@/components/layout/Badges';
import { Paragraph } from '@/components/layout/Paragraph';
import { Title } from '@/components/layout/Title';
import { Counter } from '@/components/numbers/Counter';
import { Separator } from '@/components/ui/Separator';
import { Location } from '@/components/widgets/Location';
import { cn } from '@/lib/utils';
import { age, developerSince, name, title } from '@/resources/config';
import {
	type Stack,
	inverseStackMarqueeRow,
	stackMarqueeRow,
} from '@/resources/stack';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import type { StaticImageData } from 'next/image';
import type React from 'react';
import { Suspense } from 'react';

interface StarsProps {
	className?: string;
}

const Stars = async ({ className }: StarsProps): Promise<React.JSX.Element> => {
	const [next, react] = await Promise.all([
		projectStars('vercel', 'next.js'),
		projectStars('facebook', 'react'),
	]);

	type Data = {
		avatar: string;
		name: string;
		link: string;
		stars: number;
	};

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
		<div
			className={cn(
				'flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0',
				className,
			)}
		>
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

interface SubscribersProps {
	className?: string;
}

const Subscribers = async ({
	className,
}: SubscribersProps): Promise<React.JSX.Element> => {
	const { avatar, login, followers, following } = await githubUser(
		process.env.GITHUB_USERNAME!,
	);

	type Data = {
		avatar: string | StaticImageData;
		login: string;
		link: string;
		followers: number;
		following: number;
		icon: React.ReactNode;
	};

	const data: Data[] = [
		{
			avatar,
			login: `@${login}`,
			link: `https://github.com/${login}`,
			followers,
			following,
			icon: <GithubLogo />,
		},
		{
			avatar:
				'https://media.licdn.com/dms/image/v2/D4E03AQGMBLwqpxHRGA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715716598040?e=1733961600&v=beta&t=miUysAuI_Yu1dAeY8ApQVWPiTNt7pclf0c_PqO51yMo',
			login: 'Florin Cuzeac',
			link: 'https://www.linkedin.com/in/cuzeacflorin',
			followers: 2327,
			following: 0,
			icon: <LinkedinLogo />,
		},
	];

	return (
		<div
			className={cn(
				'flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0',
				className,
			)}
		>
			{data.map(
				(
					{ avatar, login, link, followers, following, icon }: Data,
					idx: number,
				) => (
					<Channel
						key={`${login}-${idx}`}
						avatar={avatar}
						name={login}
						link={link}
						subs={Math.round(followers + following)}
						icon={icon}
					/>
				),
			)}
		</div>
	);
};

const Page = (): React.JSX.Element => (
	<>
		<PreLoader />

		<Title name={name} title={title} isHome>
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
					<Marquee pauseOnHover className="[--duration:20s]">
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

			<Paragraph>
				J'ai ensuite{' '}
				<Link
					href="/stack"
					aria-label="Technologies que j'utilise"
					className="font-bold text-theme"
				>
					appris à utiliser
				</Link>{' '}
				des frameworks plus complexes comme{' '}
				<Link
					href="https://react.dev/"
					aria-label="Voir le site de React !"
					target="_blank"
				>
					<ReactBadge />
				</Link>{' '}
				et{' '}
				<Link
					href="https://vuejs.org/"
					aria-label="Voir le site de Vue !"
					target="_blank"
				>
					<VueBadge />
				</Link>
				, avec{' '}
				<Link
					href="https://www.typescriptlang.org/"
					aria-label="Voir le site de TypeScript !"
					target="_blank"
				>
					<TypeScriptBadge />
				</Link>{' '}
				en parallèle, me permettant de développer des applications plus
				robustes, belles et fonctionnelles.
			</Paragraph>
			<Paragraph className="mt-3">
				Pour le <span className="font-bold">design</span> et l'
				<span className="font-bold">UI</span> des mes applications, j'utilise{' '}
				<Link
					href="https://tailwindcss.com/"
					aria-label="Voir le site de Tailwind !"
					target="_blank"
				>
					<TailwindBadge />
				</Link>
				, qui est un framework incroyable de styling, puissant et modulaire.
			</Paragraph>
			<Suspense
				fallback={
					<div className="mt-6 flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
						{Array.from({ length: 2 }).map((_, idx: number) => (
							<ChannelSkeleton key={`${idx}-channel-skeleton`} />
						))}
					</div>
				}
			>
				<Stars className="mt-6" />
			</Suspense>

			<Separator className="my-12" />

			<Paragraph>
				Je suis présent sur{' '}
				<Link href="https://linkedin.com/" className="no-underline">
					LinkedIn
				</Link>{' '}
				et sur{' '}
				<Link href="https://github.com/" className="no-underline">
					GitHub
				</Link>{' '}
				(retrouvez toute{' '}
				<Link
					href="/github"
					aria-label="Activité et statistiques de mon profil GitHub"
					className="font-bold text-theme"
				>
					mon activité
				</Link>{' '}
				et{' '}
				<Link
					href="/github"
					aria-label="Activité et statistiques de mon profil GitHub"
					className="font-bold text-theme"
				>
					mes statistiques
				</Link>
				), n'hésitez pas à me rendre une petite visite sur mes profils et
				pourquoi pas{' '}
				<Link
					href="/contact"
					aria-label="Contactez-moi"
					className="font-bold text-theme"
				>
					me laisser
				</Link>{' '}
				un message 😃
			</Paragraph>
			<Suspense
				fallback={
					<div className="mt-6 flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
						{Array.from({ length: 2 }).map((_, idx: number) => (
							<ChannelSkeleton key={`${idx}-channel-skeleton`} />
						))}
					</div>
				}
			>
				<Subscribers className="mt-6" />
			</Suspense>

			<Separator className="my-12" />

			<ArticlesContent />
		</FadeInStagger>
	</>
);

export default Page;
