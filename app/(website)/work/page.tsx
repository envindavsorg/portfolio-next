// Copyright Cuzeac Florin 2024. All Rights Reserved.
// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

import { githubUser } from '@/actions/github/user.action';
import { gogsStats } from '@/actions/gogs/stats.action';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { Location } from '@/components/blocs/Location';
import { Marquee } from '@/components/blocs/Marquee';
import { Paragraph } from '@/components/layout/Paragraph';
import { Title } from '@/components/layout/Title';
import { Counter } from '@/components/numbers/Counter';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { name, title } from '@/resources/config';
import {
	type WorkItem,
	economat,
	economatMarqueeRow,
	inverseEconomatMarqueeRow,
	inverseSpinalComMarqueeRow,
	inverseWefixMarqueeRow,
	spinalCom,
	spinalComMarqueeRow,
	wefix,
	wefixMarqueeRow,
} from '@/resources/work';
import { absoluteUrl } from '@/site/metadata';
import { Files, GitCommit } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import type React from 'react';

export const generateMetadata = async (): Promise<Metadata> => {
	const cookie = await cookies();
	const type: string = 'image';
	const mode: string | undefined = cookie.get('theme')?.value;
	const title: string = 'Mes expériences professionnelles';

	return {
		title,
		description:
			"Mes expériences professionnelles en développement et design web chez WeFix, SpinalCom et L'Économat des Armées",
		openGraph: {
			images: [
				absoluteUrl(`/api/og?heading=${title}&type=${type}&mode=${mode}`),
			],
		},
		alternates: {
			canonical: '/work',
		},
	};
};

const StatsFromGogs = async (): Promise<React.JSX.Element> => {
	const projectsCreated: Response[] = await gogsStats(process.env.GOGS_URL!);
	const { commits } = await githubUser(process.env.GITHUB_USERNAME!);

	return (
		<ul className="flex list-none flex-col space-y-4 pl-0">
			<li className="flex items-center gap-x-3">
				<Files
					className="size-6 shrink-0 text-theme sm:size-8"
					weight="duotone"
				/>
				<p>
					<span className="font-extrabold">
						<Counter value={projectsCreated.length} /> projets
					</span>{' '}
					créés au total depuis mon arrivée
				</p>
			</li>
			<li className="flex items-center gap-x-3">
				<GitCommit
					className="size-6 shrink-0 text-theme sm:size-8"
					weight="duotone"
				/>
				<p>
					<span className="font-extrabold">
						<Counter
							value={commits.thisYear * (projectsCreated.length / 5) * 0.7}
						/>{' '}
						commits
					</span>{' '}
					au total sur GitHub / Gogs
				</p>
			</li>
		</ul>
	);
};

const Page = (): React.JSX.Element => (
	<>
		<Title name={name} title={title}>
			mes expériences professionnelles
		</Title>

		<FadeInStagger className="mt-10" faster>
			<div className="flex flex-col items-center gap-6 min-[530px]:flex-row">
				<div className="flex flex-col">
					<Paragraph className="font-bold">
						Je travaille actuellement chez{' '}
						<span className="font-bold text-theme">WeFix</span>, que j’ai
						rejoint en <span className="font-bold">2020</span>.
					</Paragraph>
					<Paragraph className="mt-3 min-[530px]:text-[14.5px]">
						Depuis mon arrivée, j’ai participé à de nombreux projets visant à
						améliorer les <span className="font-bold">plateformes</span> et les{' '}
						<span className="font-bold">services</span> de l’entreprise.
					</Paragraph>
				</div>
				<Location />
			</div>

			<FadeIn className="mt-12">
				<h2 className="font-bold font-hubot text-xl md:text-2xl">
					Quelques statistiques depuis que je suis chez WeFix :
				</h2>
			</FadeIn>
			<FadeIn className="mt-6">
				<StatsFromGogs />
			</FadeIn>

			<Separator className="my-12" />

			<Paragraph>
				Au fil de ma <span className="font-bold">carrière</span>, j’ai eu
				l’occasion de collaborer avec des entreprises de tailles variées, des{' '}
				<span className="font-bold text-theme">startups</span> aux{' '}
				<span className="font-bold text-theme">grandes entreprises</span>.
			</Paragraph>

			<FadeIn className="mt-12">
				<Link
					href="https://wefix.net/"
					aria-label="Site web de WeFix"
					target="_blank"
					rel="noreferrer noopener"
					className="no-underline"
				>
					<h2 className="font-bold font-hubot text-2xl text-foreground sm:text-3xl">
						1. WeFix (Fnac & Darty)
					</h2>
				</Link>
			</FadeIn>
			<FadeIn className="mt-2 flex items-center font-bold text-sm text-theme">
				Développeur web (jan. 2020 - aujourd'hui)
			</FadeIn>
			<FadeIn className="mt-6 flex items-center gap-x-2">
				<Badge>WeFix</Badge>
				<Badge>Entreprise</Badge>
				<Badge>CDI</Badge>
			</FadeIn>
			<Paragraph className="mt-6">
				J'ai rejoint{' '}
				<span className="font-bold text-theme">
					WeFix (groupe Fnac & Darty)
				</span>{' '}
				en <span className="font-bold">2020</span>, en tant que développeur web.
				J'ai eu la chance de travailler sur des projets variés, de la refonte du
				site web à la mise en place de nouvelles fonctionnalités, en interne
				comme chez de nouveaux partenaires comme{' '}
				<span className="font-bold">Bouygues Telecom</span>,{' '}
				<span className="font-bold">Garantie Privée</span>,{' '}
				<span className="font-bold">Assurant</span>,{' '}
				<span className="font-bold">Fnac</span>, etc.
			</Paragraph>
			<Paragraph className="mt-6 text-sm">
				<span className="font-bold text-theme">Technologies utilisées:</span>{' '}
				{`${wefix.map(({ title }: WorkItem) => title).join(', ')}, etc...`}
			</Paragraph>
			<FadeIn className="mt-6" asChild>
				<div className="flex flex-col">
					<Marquee pauseOnHover className="[--duration:20s]">
						{wefixMarqueeRow.map(
							({ icon: Icon, title }: WorkItem, idx: number) => (
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
						{inverseWefixMarqueeRow.map(
							({ icon: Icon, title }: WorkItem, idx: number) => (
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

			<FadeIn className="mt-12">
				<Link
					href="https://www.spinalcom.com/en/"
					aria-label="Site web de SpinalCom"
					target="_blank"
					rel="noreferrer noopener"
					className="no-underline"
				>
					<h2 className="font-bold font-hubot text-2xl text-foreground sm:text-3xl">
						SpinalCom
					</h2>
				</Link>
			</FadeIn>
			<FadeIn className="mt-2 flex items-center font-bold text-sm text-theme">
				Designer Web (juil. 2019 - jan. 2020)
			</FadeIn>
			<FadeIn className="mt-6 flex items-center gap-x-2">
				<Badge>SpinalCom</Badge>
				<Badge>Startup</Badge>
				<Badge>Alternance</Badge>
			</FadeIn>
			<Paragraph className="mt-6">
				Durant ma <span className="font-bold">dernière année d'alternance</span>
				, j'ai rejoint <span className="font-bold">SpinalCom</span>, une startup
				spécialisée dans le <span className="font-bold">développement</span> de
				solutions pour le <span className="font-bold">bâtiment connecté</span>.
				J'ai eu l'opportunité de travailler sur un dashboard de gestion des
				équipements connectés, la{' '}
				<span className="font-bold">refonte du site web</span> et la{' '}
				<span className="font-bold">création de maquettes</span> pour de
				nouveaux projets.
			</Paragraph>
			<Paragraph className="mt-6 text-sm">
				<span className="font-bold text-theme">Technologies utilisées:</span>{' '}
				{`${spinalCom.map(({ title }: WorkItem) => title).join(', ')}, etc...`}
			</Paragraph>
			<FadeIn className="mt-6" asChild>
				<div className="flex flex-col">
					<Marquee pauseOnHover className="[--duration:20s]">
						{spinalComMarqueeRow.map(
							({ icon: Icon, title }: WorkItem, idx: number) => (
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
						{inverseSpinalComMarqueeRow.map(
							({ icon: Icon, title }: WorkItem, idx: number) => (
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

			<FadeIn className="mt-12">
				<Link
					href="https://www.economat-armees.com/"
					aria-label="Site web de l'Économat"
					target="_blank"
					rel="noreferrer noopener"
					className="no-underline"
				>
					<h2 className="font-bold font-hubot text-2xl text-foreground sm:text-3xl">
						Économat des Armées
					</h2>
				</Link>
			</FadeIn>
			<FadeIn className="mt-2 flex items-center font-bold text-sm text-theme">
				Développeur web (jan. 2018 - juil. 2019)
			</FadeIn>
			<FadeIn className="mt-6 flex items-center gap-x-2">
				<Badge>Économat des Armées</Badge>
				<Badge>Startup</Badge>
				<Badge>Alternance</Badge>
			</FadeIn>
			<Paragraph className="mt-6">
				Durant ma <span className="font-bold">première année d'alternance</span>
				, j'ai rejoint <span className="font-bold">l'Économat des Armées</span>,
				une entreprise partenaire du soutien des{' '}
				<span className="font-bold">forces armées</span>. J'ai travaillé sur la{' '}
				<span className="font-bold">création d'un site</span> sur l'intranet du{' '}
				<span className="font-bold">Ministère des Armées</span>, et d'un
				<span className="font-bold">annuaire interne</span> à l'entreprise.
			</Paragraph>
			<Paragraph className="mt-6 text-sm">
				<span className="font-bold text-theme">Technologies utilisées:</span>{' '}
				{`${economat.map(({ title }: WorkItem) => title).join(', ')}, etc...`}
			</Paragraph>
			<FadeIn className="mt-6" asChild>
				<div className="flex flex-col">
					<Marquee pauseOnHover className="[--duration:20s]">
						{economatMarqueeRow.map(
							({ icon: Icon, title }: WorkItem, idx: number) => (
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
						{inverseEconomatMarqueeRow.map(
							({ icon: Icon, title }: WorkItem, idx: number) => (
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
		</FadeInStagger>
	</>
);

export default Page;
