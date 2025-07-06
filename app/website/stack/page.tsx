import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type React from 'react';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { Do } from '@/components/blocs/DoAndDont';
import { Marquee } from '@/components/blocs/Marquee';
import { BackAccordion } from '@/components/stack/back/Accordion';
import { FrontAccordion } from '@/components/stack/front/Accordion';
import { ProjectStack } from '@/components/stack/ProjectStack';
import { UsedLanguages } from '@/components/stack/UsedLanguages';
import PageParagraph from '@/components/text/PageParagraph';
import PageTitle from '@/components/text/PageTitle';
import { Separator } from '@/components/ui/Separator';
import { name, title } from '@/resources/config';
import { preferred, type Stack } from '@/resources/stack';
import { absoluteUrl } from '@/site/metadata';

export const generateMetadata = async (): Promise<Metadata> => {
	const cookie = await cookies();
	const type: string = 'image';
	const mode: string | undefined = cookie.get('theme')?.value;
	const title: string = "Toutes les technologies que j'utilise";

	return {
		title,
		description:
			'Voici les technologies avec lesquelles je suis le plus productif, et avec lesquelles je démarre chaque projet',
		openGraph: {
			images: [absoluteUrl(`/api/og?heading=${title}&type=${type}&mode=${mode}`)],
		},
		alternates: {
			canonical: '/stack',
		},
	};
};

type MarqueeRowProps = {
	data: Stack[];
	duration: string;
	className?: string;
};

const MarqueeRow = ({
	data,
	duration,
	className,
}: MarqueeRowProps): React.JSX.Element => {
	const content: Stack[] = data.slice(0, data.length / 2);

	return (
		<FadeIn className={className} asChild>
			<Marquee pauseOnHover className={duration}>
				{content.map(({ icon: Icon, title }: Stack, idx: number) => (
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

const StackPage = (): React.JSX.Element => (
	<>
		<PageTitle name={name} title={title}>
			les technologies que j'utilise
		</PageTitle>

		<FadeInStagger className="mt-10" faster>
			<PageParagraph>
				Voici les <span className="font-bold text-theme">technologies</span> avec
				lesquelles je suis le plus <span className="font-bold">productif</span>, et avec
				lesquelles je
				<span className="font-bold">démarre</span> chaque projet, sans me poser des
				questions.
			</PageParagraph>
			<MarqueeRow data={preferred} duration={'[--duration:20s]'} className="mt-6" />

			<Separator className="my-12" />

			<ProjectStack />

			<Separator className="my-12" />

			<UsedLanguages />

			<Separator className="my-12" />

			<FrontAccordion />
			<BackAccordion />
			<FadeIn>
				<h2 className="font-bold font-geist-sans text-xl sm:text-2xl">
					3. <span className="text-theme">Design</span> et{' '}
					<span className="text-theme">interfaces</span> (Tailwind CSS et shadcn/ui)
				</h2>
				<p className="mt-6 leading-8">
					Construire des composants flexibles et accessibles est un défi. On peut soit
					utiliser (et étendre) une bibliothèque de composants, soit créer ses propres
					composants. C’est pour cette raison que j’utilise désormais{' '}
					<span className="font-bold text-theme">shadcn/ui</span>.
				</p>
				<p className="mt-3 leading-8">
					Cette bibliothèque propose des composants bien conçus et extensibles, basés sur
					des primitives accessibles et non stylées. Cela inclut des éléments de base
					comme des boutons et des champs de saisie, mais aussi des icônes, des
					graphiques, et même des thèmes personnalisés.
				</p>
				<Do text="Pourquoi utiliser Tailwind CSS ?" />
				<div className="rounded-md border border-neutral-200 bg-neutral-50 p-3 *:text-sm dark:border-neutral-700 dark:bg-neutral-800">
					<p className="leading-8">
						<span className="font-bold text-theme">Tailwind CSS</span> est un excellent
						outil pour accélérer la création de sites web grâce à ses classes prêtes à
						l’emploi, permettant d’éviter d’écrire du CSS personnalisé.
					</p>
					<p className="mt-3 leading-8">
						On applique directement des classes aux éléments{' '}
						<span className="font-bold text-theme">HTML</span>, ce qui simplifie le design
						tout en assurant un style cohérent et un code plus lisible. Sa grande
						flexibilité permet de personnaliser facilement les styles via un fichier de
						configuration, d’ajuster les points de rupture pour le responsive et
						d’optimiser les performances en supprimant les classes inutilisées.
					</p>
					<p className="mt-3 leading-8">
						De plus, avec une large communauté et des outils comme{' '}
						<span className="font-bold text-theme">Tailwind UI</span>, il est facile de
						profiter de ressources supplémentaires, ce qui fait de Tailwind un choix
						populaire pour des interfaces modernes et efficaces.
					</p>
				</div>
			</FadeIn>
			<Separator className="my-12" />
			<FadeIn>
				<h2 className="font-bold font-geist-sans text-xl sm:text-2xl">
					4. Base de données (<span className="text-theme">MongoDB</span> ou{' '}
					<span className="text-theme">Postgres</span>)
				</h2>
				<p className="mt-6 leading-8">
					Pour la gestion des bases de données, j'utilise principalement{' '}
					<span className="font-bold">MongoDB</span>
					et <span className="font-bold">Postgres</span>.{' '}
					<span className="font-bold">MongoDB</span> est une base de données
					<span className="font-bold">NoSQL</span> qui offre une grande flexibilité grâce
					à son modèle de documents, ce qui est idéal pour les applications nécessitant
					une structure de données dynamique.
				</p>
				<p className="mt-3 leading-8">
					D'autre part, <span className="font-bold">Postgres</span> est une base de
					données relationnelle robuste et riche en fonctionnalités, parfaite pour les
					applications nécessitant des transactions complexes et une intégrité des données
					stricte. Ces deux bases de données me permettent de choisir la solution la plus
					adaptée en fonction des besoins spécifiques de chaque projet.
				</p>
			</FadeIn>
			<Separator className="my-12" />
			<FadeIn>
				<h2 className="font-bold font-geist-sans text-xl sm:text-2xl">
					5. IA (<span className="text-theme">v0</span>,{' '}
					<span className="text-theme">GitHub Copilot</span> et{' '}
					<span className="text-theme">ChatGPT</span>)
				</h2>
				<p className="mt-6 leading-8">
					Pour améliorer ma productivité et la qualité de mon code, j'utilise plusieurs
					outils d'intelligence artificielle comme <span className="font-bold">v0</span>,{' '}
					<span className="font-bold">GitHub Copilot</span>
					et <span className="font-bold">ChatGPT</span>.
				</p>
				<p className="mt-3 leading-8">
					<span className="font-bold">v0</span> m'aide à générer des snippets de code en
					Front. <span className="font-bold">GitHub Copilot</span> fournit des suggestions
					de code en temps réel directement dans mon IDE, ce qui accélère le développement
					et réduit les erreurs. <span className="font-bold">ChatGPT</span> est utile pour
					obtenir des explications détaillées, des exemples de code et des solutions à des
					problèmes complexes.
				</p>
				<p className="mt-3 leading-8">
					Ces outils ne sont pas parfaits, mais ils représentent un gain de temps
					considérable et améliorent la qualité globale de mes projets.
				</p>
			</FadeIn>
			<Separator className="my-12" />
			<FadeIn>
				<h2 className="font-bold font-geist-sans text-xl sm:text-2xl">
					6. Matériel que j'utilise (écosystème <span className="text-theme">Apple</span>)
				</h2>
				<p className="mt-6 font-bold leading-8">
					Pourquoi j’utilise du Apple pour le développement web ?
				</p>
				<p className="mt-3 leading-8">
					En tant que développeur web, j’ai choisi l’écosystème Apple pour les avantages
					significatifs qu’il apporte à mon travail au quotidien.
				</p>
				<ul className="mt-3 list-disc space-y-3">
					<li>
						<span className="font-bold text-theme">MacOS basé sur Unix :</span> MacOS
						repose sur un noyau Unix, ce qui est proche de l’environnement des serveurs
						web. Cela simplifie l’utilisation du terminal et des outils essentiels comme
						Git, SSH, et Homebrew, que j’utilise régulièrement pour gérer mes projets.
					</li>
					<li>
						<span className="font-bold text-theme">
							Compatibilité avec les outils de développement :
						</span>{' '}
						Les environnements et frameworks populaires, tels que Node.js et Docker,
						fonctionnent de manière fluide sur MacOS. Cela me permet de tester mes
						applications web dans des environnements similaires aux serveurs de
						production.
					</li>
					<li>
						<span className="font-bold text-theme">
							Optimisation matérielle et logicielle :
						</span>{' '}
						Les Mac sont réputés pour leur stabilité et leur performance, des qualités
						essentielles pour un travail de développement sans interruptions. Avec la puce
						Apple Silicon, je profite d’une performance accrue pour le multitâche et le
						traitement de fichiers lourds.
					</li>
					<li>
						<span className="font-bold text-theme">Support des outils de design :</span>{' '}
						Travaillant souvent en collaboration avec des designers, j’utilise des outils
						comme Sketch, Figma, et Adobe XD, qui sont parfaitement optimisés pour MacOS.
						Cela facilite l’intégration des éléments visuels dans mes projets de
						développement web.
					</li>
					<li>
						<span className="font-bold text-theme">
							Écosystème unifié pour la productivité :
						</span>
						L’intégration avec d’autres produits Apple comme l’iPhone et l’iPad me permet
						de synchroniser mes tâches sur tous mes appareils. Par exemple, Handoff et
						Airdrop facilitent le transfert de fichiers, et iCloud me garantit un accès
						rapide à mes fichiers essentiels, où que je sois.
					</li>
				</ul>
			</FadeIn>
		</FadeInStagger>
	</>
);

export default StackPage;
