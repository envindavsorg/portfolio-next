import { AnimatedName } from '@/app/(website)/animated-name';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { CV } from '@/components/blocs/CV';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { type WorkItem, economat, spinalCom, wefix } from '@/resources/work';
import { absoluteUrl } from '@/site/metadata';
import { cookies } from 'next/headers';
import Link from 'next/link';
import type React from 'react';

export const generateMetadata = async () => {
	const cookie = await cookies();
	const type: string = 'image';
	const mode: string | undefined = cookie.get('theme')?.value;

	return {
		title: 'Mes expériences professionnelles',
		description:
			"Mes expériences professionnelles en développement et design web chez WeFix, SpinalCom et L'Économat des Armées",
		image: absoluteUrl(
			`/api/og?heading=Toutes mes expériences professionnelles&type=${type}&mode=${mode}`,
		),
		alternates: {
			canonical: '/work',
		},
	};
};

const WorkPage = (): React.JSX.Element => (
	<>
		<h1 className="fade-in mb-0 pt-6 font-geist-sans font-medium text-lg sm:pt-12">
			Mes expériences professionnelles
		</h1>
		<AnimatedName />

		<FadeInStagger className="mt-10" faster>
			<FadeIn>
				<p className="leading-8">
					Je travaille actuellement chez{' '}
					<span className="font-bold text-theme">WeFix</span>, une entreprise
					leader dans la <span className="font-bold">réparation</span> des
					appareils électroniques, que j’ai rejoint en{' '}
					<span className="font-bold">2020</span> en tant que{' '}
					<span className="font-bold">développeur web</span>. Depuis mon
					arrivée, j’ai participé à de nombreux projets visant à améliorer les{' '}
					<span className="font-bold">plateformes en ligne</span> et les{' '}
					<span className="font-bold">services numériques</span> de
					l’entreprise.
				</p>
				<p className="mt-3 leading-8">
					Au fil de ma <span className="font-bold">carrière</span>, j’ai eu
					l’occasion de collaborer avec des entreprises de tailles variées, des{' '}
					<span className="font-bold text-theme">startups</span> aux{' '}
					<span className="font-bold text-theme">grandes entreprises</span>.
				</p>
			</FadeIn>
			<FadeIn className="mt-6 print:hidden">
				<CV />
			</FadeIn>

			<Separator className="my-12" />

			<FadeIn>
				<Link
					href="https://wefix.net/"
					aria-label="Site web de WeFix"
					target="_blank"
					rel="noreferrer noopener"
					className="no-underline"
				>
					<h2 className="font-bold font-geist-sans text-2xl text-foreground sm:text-3xl">
						WeFix by Fnac
					</h2>
				</Link>
			</FadeIn>
			<FadeIn className="mt-1 flex items-center font-bold text-sm text-theme">
				Développeur web (jan. 2020 - aujourd'hui)
			</FadeIn>
			<FadeIn className="mt-3 flex items-center gap-x-2">
				<Badge>WeFix</Badge>
				<Badge>Entreprise</Badge>
				<Badge>CDI</Badge>
			</FadeIn>
			<FadeIn className="mt-6">
				<p className="leading-8">
					J'ai rejoint{' '}
					<span className="font-bold text-theme">
						WeFix (groupe Fnac & Darty)
					</span>{' '}
					en <span className="font-bold">2020</span>, en tant que développeur
					web. J'ai eu la chance de travailler sur des projets variés, de la
					refonte du site web à la mise en place de nouvelles fonctionnalités,
					en interne comme chez de nouveaux partenaires comme{' '}
					<span className="font-bold">Bouygues Telecom</span>,{' '}
					<span className="font-bold">Garantie Privée</span>,{' '}
					<span className="font-bold">Assurant</span>,{' '}
					<span className="font-bold">Fnac</span>, etc.
				</p>
				<p className="mt-6 text-sm">
					<span className="font-bold text-theme">Technologies utilisées:</span>{' '}
					{`${wefix.map(({ title }: WorkItem) => title).join(', ')}, etc...`}
				</p>
				<div className="mt-3 flex w-full flex-row flex-wrap gap-3 print:hidden">
					{wefix.map(({ icon: Icon, title }: WorkItem, idx: number) => (
						<div
							key={`${title}-${idx}`}
							className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
						>
							<Icon className="size-7 shrink-0 md:size-8" />
							<p className="sr-only">{title}</p>
						</div>
					))}
				</div>
			</FadeIn>

			<Separator className="my-12" />

			<FadeIn>
				<Link
					href="https://www.spinalcom.com/en/"
					aria-label="Site web de SpinalCom"
					target="_blank"
					rel="noreferrer noopener"
					className="no-underline"
				>
					<h2 className="font-bold font-geist-sans text-2xl text-foreground sm:text-3xl">
						SpinalCom
					</h2>
				</Link>
			</FadeIn>
			<FadeIn className="mt-1 flex items-center font-bold text-sm text-theme">
				Designer Web (juil. 2019 - jan. 2020)
			</FadeIn>
			<FadeIn className="mt-3 flex items-center gap-x-2">
				<Badge>SpinalCom</Badge>
				<Badge>Startup</Badge>
				<Badge>Alternance</Badge>
			</FadeIn>
			<FadeIn className="mt-6">
				<p className="leading-8">
					Durant ma{' '}
					<span className="font-bold">dernière année d'alternance</span>, j'ai
					rejoint <span className="font-bold">SpinalCom</span>, une startup
					spécialisée dans le <span className="font-bold">développement</span>{' '}
					de solutions pour le{' '}
					<span className="font-bold">bâtiment connecté</span>. J'ai eu
					l'opportunité de travailler sur un dashboard de gestion des
					équipements connectés, la{' '}
					<span className="font-bold">refonte du site web</span> et la{' '}
					<span className="font-bold">création de maquettes</span> pour de
					nouveaux projets.
				</p>
				<p className="mt-6 text-sm">
					<span className="font-bold text-theme">Technologies utilisées:</span>{' '}
					{`${spinalCom.map(({ title }: WorkItem) => title).join(', ')}, etc...`}
				</p>
				<div className="mt-3 flex w-full flex-row flex-wrap gap-3 print:hidden">
					{spinalCom.map(({ icon: Icon, title }: WorkItem, idx: number) => (
						<div
							key={`${title}-${idx}`}
							className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
						>
							<Icon className="size-7 shrink-0 md:size-8" />
							<p className="sr-only">{title}</p>
						</div>
					))}
				</div>
			</FadeIn>

			<Separator className="my-12" />

			<FadeIn>
				<Link
					href="https://www.economat-armees.com/"
					aria-label="Site web de l'Économat"
					target="_blank"
					rel="noreferrer noopener"
					className="no-underline"
				>
					<h2 className="font-bold font-geist-sans text-2xl text-foreground sm:text-3xl">
						Économat des Armées
					</h2>
				</Link>
			</FadeIn>
			<FadeIn className="mt-1 flex items-center font-bold text-sm text-theme">
				Développeur web (jan. 2018 - juil. 2019)
			</FadeIn>
			<FadeIn className="mt-3 flex items-center gap-x-2">
				<Badge>Économat des Armées</Badge>
				<Badge>Startup</Badge>
				<Badge>Alternance</Badge>
			</FadeIn>
			<FadeIn className="mt-6">
				<p className="leading-8">
					Durant ma{' '}
					<span className="font-bold">première année d'alternance</span>, j'ai
					rejoint <span className="font-bold">l'Économat des Armées</span>, une
					entreprise partenaire du soutien des{' '}
					<span className="font-bold">forces armées</span>. J'ai travaillé sur
					la <span className="font-bold">création d'un site</span> sur
					l'intranet du <span className="font-bold">Ministère des Armées</span>,
					et d'un
					<span className="font-bold">annuaire interne</span> à l'entreprise.
				</p>
				<p className="mt-6 text-sm">
					<span className="font-bold text-theme">Technologies utilisées:</span>{' '}
					{`${economat.map(({ title }: WorkItem) => title).join(', ')}, etc...`}
				</p>
				<div className="mt-3 flex w-full flex-row flex-wrap gap-3 print:hidden">
					{economat.map(({ icon: Icon, title }: WorkItem, idx: number) => (
						<div
							key={`${title}-${idx}`}
							className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
						>
							<Icon className="size-7 shrink-0 md:size-8" />
							<p className="sr-only">{title}</p>
						</div>
					))}
				</div>
			</FadeIn>
		</FadeInStagger>
	</>
);

export default WorkPage;
