// Copyright Cuzeac Florin 2024. All Rights Reserved.
// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

import { gogsStats } from '@/actions/gogs/stats.action';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { CV } from '@/components/blocs/CV';
import { Marquee } from '@/components/blocs/Marquee';
import { ArticlesContent } from '@/components/blog/ArticlesContent';
import { Paragraph } from '@/components/layout/Paragraph';
import { ScrollTypeWriter } from '@/components/layout/ScrollTypeWriter';
import { Title } from '@/components/layout/Title';
import { Counter } from '@/components/numbers/Counter';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { name, title } from '@/resources/config';
import { type WorkItem, economat, spinalCom, wefix } from '@/resources/work';
import { absoluteUrl } from '@/site/metadata';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
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

type MarqueeRowProps = {
	data: WorkItem[];
	duration: string;
	className?: string;
};

const MarqueeRow = ({
	data,
	duration,
	className,
}: MarqueeRowProps): React.JSX.Element => {
	const content: WorkItem[] = data.slice(0, data.length / 2);

	return (
		<FadeIn className={className} asChild>
			<Marquee pauseOnHover className={duration}>
				{content.map(({ icon: Icon, title }: WorkItem, idx: number) => (
					<div
						key={`${title}-${idx}`}
						className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
					>
						<Icon className="size-7 shrink-0 md:size-8" />
						<p className="sr-only">{title}</p>
					</div>
				))}
			</Marquee>
		</FadeIn>
	);
};

const Page = async (): Promise<React.JSX.Element> => {
	const { projectsCreated, wefixCommits } = await gogsStats(
		process.env.GOGS_URL!,
	);

	return (
		<>
			<Title name={name} title={title}>
				mes expériences professionnelles
			</Title>

			<FadeInStagger className="mt-10" faster>
				<Paragraph className="font-bold">
					Je travaille actuellement chez{' '}
					<span className="font-bold text-theme">WeFix</span>, une entreprise
					leader dans la <span className="font-bold">réparation</span> des
					appareils électroniques, que j’ai rejoint en{' '}
					<span className="font-bold">2020</span> en tant que{' '}
					<span className="font-bold">développeur web</span>.
				</Paragraph>
				<Paragraph className="mt-6">
					Depuis mon arrivée, j’ai participé à de nombreux projets visant à
					améliorer les <span className="font-bold">plateformes en ligne</span>{' '}
					et les <span className="font-bold">services numériques</span> de
					l’entreprise. En tout, j'ai crée{' '}
					<span className="font-bold text-theme">
						<Counter value={projectsCreated} /> projets
					</span>
					, et j'ai effectué{' '}
					<span className="font-bold text-theme">
						<Counter value={wefixCommits} /> commits
					</span>{' '}
					sur les plateformes Git de WeFix.
				</Paragraph>
				<CV className="mt-6" />

				<Separator className="my-12" />

				<Paragraph>
					Au fil de ma <span className="font-bold">carrière</span>, j’ai eu
					l’occasion de collaborer avec des entreprises de tailles variées, des{' '}
					<span className="font-bold text-theme">startups</span> aux{' '}
					<span className="font-bold text-theme">grandes entreprises</span>.
				</Paragraph>

				<FadeIn className="mt-12">
					<ScrollTypeWriter text="1. WeFix (Fnac & Darty)" />
					<div className="mt-3 font-bold">
						Développeur web (jan. 2020 - aujourd'hui)
					</div>
					<div className="mt-3 flex items-center gap-x-2">
						<Badge>WeFix</Badge>
						<Badge>Entreprise</Badge>
						<Badge>CDI</Badge>
					</div>
				</FadeIn>
				<Paragraph className="mt-6">
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
				</Paragraph>
				<Paragraph className="mt-6 text-sm">
					<span className="font-bold text-theme">Technologies utilisées:</span>{' '}
					{`${wefix.map(({ title }: WorkItem) => title).join(', ')}, etc...`}
				</Paragraph>
				<MarqueeRow
					data={wefix}
					duration={'[--duration:20s]'}
					className="mt-3"
				/>

				<Separator className="my-12" />

				<FadeIn className="mt-12">
					<ScrollTypeWriter text="2. SpinalCom" />
					<div className="mt-3 font-bold">
						Designer Web (juil. 2019 - jan. 2020)
					</div>
					<div className="mt-3 flex items-center gap-x-2">
						<Badge>SpinalCom</Badge>
						<Badge>Startup</Badge>
						<Badge>Alternance</Badge>
					</div>
				</FadeIn>
				<Paragraph className="mt-6">
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
				</Paragraph>
				<Paragraph className="mt-6 text-sm">
					<span className="font-bold text-theme">Technologies utilisées:</span>{' '}
					{`${spinalCom.map(({ title }: WorkItem) => title).join(', ')}, etc...`}
				</Paragraph>
				<MarqueeRow
					data={spinalCom}
					duration={'[--duration:25s]'}
					className="mt-3"
				/>

				<Separator className="my-12" />

				<FadeIn className="mt-12">
					<ScrollTypeWriter text="3. Économat des Armées" />
					<div className="mt-3 font-bold">
						Développeur web (jan. 2018 - juil. 2019)
					</div>
					<div className="mt-3 flex items-center gap-x-2">
						<Badge>Économat des Armées</Badge>
						<Badge>Startup</Badge>
						<Badge>Alternance</Badge>
					</div>
				</FadeIn>
				<Paragraph className="mt-6">
					Durant ma{' '}
					<span className="font-bold">première année d'alternance</span>, j'ai
					rejoint <span className="font-bold">l'Économat des Armées</span>, une
					entreprise partenaire du soutien des{' '}
					<span className="font-bold">forces armées</span>. J'ai travaillé sur
					la <span className="font-bold">création d'un site</span> sur
					l'intranet du <span className="font-bold">Ministère des Armées</span>,
					et d'un
					<span className="font-bold">annuaire interne</span> à l'entreprise.
				</Paragraph>
				<Paragraph className="mt-6 text-sm">
					<span className="font-bold text-theme">Technologies utilisées:</span>{' '}
					{`${economat.map(({ title }: WorkItem) => title).join(', ')}, etc...`}
				</Paragraph>
				<MarqueeRow
					data={economat}
					duration={'[--duration:30s]'}
					className="mt-3"
				/>

				<Separator className="my-12" />

				<ArticlesContent />
			</FadeInStagger>
		</>
	);
};

export default Page;
