import { AnimatedName } from '@/app/(website)/animated-name';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { ChatGPTIcon } from '@/components/icons/ChatGPT';
import { GitHubCopilotIcon } from '@/components/icons/GitHubCopilot';
import { MongoDBIcon } from '@/components/icons/MongoDB';
import { PostgreIcon } from '@/components/icons/Postgre';
import { V0Icon } from '@/components/icons/V0';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/Accordion';
import { Separator } from '@/components/ui/Separator';
import { ProjectStack } from '@/elements/stack/ProjectStack';
import { Tailwind } from '@/elements/stack/Tailwind';
import { UsedLanguages } from '@/elements/stack/UsedLanguages';
import { DataFetching } from '@/elements/stack/front/DataFetching';
import { ImageOptimization } from '@/elements/stack/front/ImageOptimization';
import { Rendering } from '@/elements/stack/front/Rendering';
import { type Stack, preferred } from '@/resources/stack';
import { absoluteUrl } from '@/site/metadata';
import Express from '@/snippets/frameworks/express.mdx';
import Fastify from '@/snippets/frameworks/fastify.mdx';
import { cookies } from 'next/headers';
import type React from 'react';

export const generateMetadata = async () => {
	const cookie = await cookies();
	const type: string = 'image';
	const mode: string | undefined = cookie.get('theme')?.value;

	return {
		title: "Toutes les technologies que j'utilise quotidiennement",
		description:
			'Voici les technologies avec lesquelles je suis le plus productif, et avec lesquelles je démarre chaque projet',
		image: absoluteUrl(
			`/api/og?heading=Toutes mes expériences professionnelles&type=${type}&mode=${mode}`,
		),
		alternates: {
			canonical: '/stack',
		},
	};
};

const StackPage = (): React.JSX.Element => (
	<>
		<h1 className="fade-in mb-0 pt-6 font-geist-sans font-medium text-lg sm:pt-12">
			Les technologies que j'utilise
		</h1>
		<AnimatedName />

		<FadeInStagger className="mt-10" faster>
			<FadeIn>
				<p className="leading-8">
					Voici les <span className="font-bold text-theme">technologies</span>{' '}
					avec lesquelles je suis le plus{' '}
					<span className="font-bold">productif</span>, et avec lesquelles je
					<span className="font-bold">démarre</span> chaque projet, sans me
					poser des questions.
				</p>

				<div className="mt-6 flex w-full flex-row flex-wrap gap-3">
					{preferred.map(({ icon: Icon, title }: Stack, idx: number) => (
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

			<ProjectStack />

			<Separator className="my-12" />

			<UsedLanguages />

			<Separator className="my-12" />

			<FadeIn>
				<h2 className="font-bold font-geist-sans text-xl sm:text-2xl">
					1. Avec un framework plus orienté{' '}
					<span className="text-theme">front</span> (React et Next.js)
				</h2>
				<p className="mt-6 leading-8">
					J'ai commencé à travailler avec{' '}
					<span className="font-bold text-theme">React</span> et{' '}
					<span className="font-bold text-theme">Next.js</span> en{' '}
					<span className="font-bold">2020</span>, à la fin de mes études.
					Depuis, j'ai eu l'occasion de développer plusieurs projets{' '}
					<span className="font-bold">professionnels</span> et{' '}
					<span className="font-bold">personnels</span> en utilisant ces
					technologies.
				</p>
				<p className="mt-3 leading-8">
					Leur <span className="font-bold">flexibilité</span> et leur{' '}
					<span className="font-bold">puissance</span> m'ont permis de créer des
					applications web performantes et évolutives. Grâce à{' '}
					<span className="font-bold text-theme">Next.js</span>, j'ai pu tirer
					parti du rendu pu tirer parti du rendu côté serveur{' '}
					<span className="font-bold text-theme">(SSR)</span> et de la
					génération de sites statiques sites statiques{' '}
					<span className="font-bold text-theme">(SSG)</span>, ce qui a
					considérablement amélioré les{' '}
					<span className="font-bold">performances</span> et le{' '}
					<span className="font-bold">SEO</span> de mes projets.
				</p>

				<p className="mt-12 leading-8">
					Quelques patterns super utiles et efficaces que j'utilise souvent avec{' '}
					<span className="font-bold text-theme">Next.js</span>, dans tous mes
					projets :
				</p>
				<Accordion className="mt-6" type="single" collapsible>
					<AccordionItem value="fetching-data">
						<AccordionTrigger className="font-bold text-foreground text-lg">
							1. Récupérer les données efficacement avec Next.js
						</AccordionTrigger>
						<AccordionContent>
							<DataFetching />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="components-client-server">
						<AccordionTrigger className="font-bold text-foreground text-lg">
							2. Utiliser les composants client et serveur
						</AccordionTrigger>
						<AccordionContent>
							<Rendering />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="static-generation">
						<AccordionTrigger className="font-bold text-foreground text-lg">
							3. Optimisation des images avec next/image
						</AccordionTrigger>
						<AccordionContent>
							<ImageOptimization />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</FadeIn>

			<Separator className="my-12" />

			<FadeIn>
				<h2 className="font-bold font-geist-sans text-xl sm:text-2xl">
					2. Avec un framework plus orienté{' '}
					<span className="text-theme">back</span> (Express ou Fastify)
				</h2>
				<p className="mt-6 leading-8">
					Pour les projets nécessitant un backend robuste, j'utilise des
					frameworks comme <span className="font-bold text-theme">Express</span>{' '}
					ou <span className="font-bold text-theme">Fastify</span>. Express est
					un choix populaire grâce à sa{' '}
					<span className="font-bold">simplicité</span> et sa{' '}
					<span className="font-bold">flexibilité</span>, tandis que Fastify se
					distingue par ses{' '}
					<span className="font-bold">performances élevées</span> et son{' '}
					<span className="font-bold">faible overhead</span>.
				</p>
				<p className="mt-3 leading-8">
					Ces frameworks me permettent de créer des API rapides et scalables,
					tout en offrant une grande liberté dans la structuration du code et
					l'intégration de middlewares.
				</p>
				<Accordion className="mt-6" type="single" collapsible>
					<AccordionItem value="express">
						<AccordionTrigger className="font-bold text-foreground text-lg">
							1. Un petit exemple avec Express
						</AccordionTrigger>
						<AccordionContent>
							<p className="leading-8">
								Dans cet exemple, nous importons{' '}
								<span className="font-bold text-theme">express</span> et les
								types <span className="font-bold text-theme">Request</span> et{' '}
								<span className="font-bold text-theme">Response</span>. Nous
								créons une application Express. Nous définissons une{' '}
								<span className="font-bold text-theme">route GET</span> pour la
								racine (/) qui renvoie{' '}
								<span className="font-bold">"Hello, world!"</span>. Nous
								démarrons le serveur sur le port 3000 et affichons un message
								dans la console.
							</p>
							<Express />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="fastify">
						<AccordionTrigger className="font-bold text-foreground text-lg">
							2. Un petit exemple avec Fastify
						</AccordionTrigger>
						<AccordionContent>
							<p className="leading-8">
								Dans cet exemple, nous importons{' '}
								<span className="font-bold text-theme">fastify</span> et créons
								une instance de serveur. Nous définissons une{' '}
								<span className="font-bold text-theme">route GET</span> pour la
								racine (/) qui renvoie un objet JSON avec le message{' '}
								<span className="font-bold">"Hello, world!"</span>. Nous
								démarrons le serveur sur le port 3000 et affichons un message
								dans la console.
							</p>
							<Fastify />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</FadeIn>

			<Separator className="my-12" />

			<FadeIn>
				<h2 className="font-bold font-geist-sans text-xl sm:text-2xl">
					3. <span className="text-theme">Design</span> et{' '}
					<span className="text-theme">interfaces</span> (Tailwind CSS et
					shadcn/ui)
				</h2>
				<p className="mt-6 leading-8">
					Construire des composants flexibles et accessibles est un défi. On
					peut soit utiliser (et étendre) une bibliothèque de composants, soit
					créer ses propres composants. C’est pour cette raison que j’utilise
					désormais <span className="font-bold text-theme">shadcn/ui</span>.
				</p>
				<p className="mt-3 leading-8">
					Cette bibliothèque propose des composants bien conçus et extensibles,
					basés sur des primitives accessibles et non stylées. Cela inclut des
					éléments de base comme des boutons et des champs de saisie, mais aussi
					des icônes, des graphiques, et même des thèmes personnalisés.
				</p>
				<Tailwind />
			</FadeIn>

			<Separator className="my-12" />

			<FadeIn>
				<h2 className="font-bold font-geist-sans text-xl sm:text-2xl">
					4. Base de données (<span className="text-theme">MongoDB</span> ou{' '}
					<span className="text-theme">Postgres</span>)
				</h2>
				<p className="mt-6 leading-8">
					Pour la gestion des bases de données, j'utilise principalement MongoDB
					et Postgres. MongoDB est une base de données NoSQL qui offre une
					grande flexibilité grâce à son modèle de documents, ce qui est idéal
					pour les applications nécessitant une structure de données dynamique.
				</p>
				<p className="mt-3 leading-8">
					D'autre part, Postgres est une base de données relationnelle robuste
					et riche en fonctionnalités, parfaite pour les applications
					nécessitant des transactions complexes et une intégrité des données
					stricte. Ces deux bases de données me permettent de choisir la
					solution la plus adaptée en fonction des besoins spécifiques de chaque
					projet.
				</p>
				<div className="mt-6 flex w-full flex-row flex-wrap gap-3 print:hidden">
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800">
						<MongoDBIcon className="size-7 shrink-0 md:size-8" />
						<p className="sr-only">MongoDB</p>
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800">
						<PostgreIcon className="size-7 shrink-0 md:size-8" />
						<p className="sr-only">PostgreSQL</p>
					</div>
				</div>
			</FadeIn>

			<Separator className="my-12" />

			<FadeIn>
				<h2 className="font-bold font-geist-sans text-xl sm:text-2xl">
					5. IA (<span className="text-theme">v0</span>,{' '}
					<span className="text-theme">GitHub Copilot</span> et{' '}
					<span className="text-theme">ChatGPT</span>)
				</h2>
				<p className="mt-6 leading-8">
					Pour améliorer ma productivité et la qualité de mon code, j'utilise
					plusieurs outils d'intelligence artificielle comme v0, GitHub Copilot
					et ChatGPT.
				</p>
				<p className="mt-3 leading-8">
					v0 m'aide à générer des snippets de code en Front. GitHub Copilot
					fournit des suggestions de code en temps réel directement dans mon
					IDE, ce qui accélère le développement et réduit les erreurs.
				</p>
				<p className="mt-3 leading-8">
					ChatGPT est utile pour obtenir des explications détaillées, des
					exemples de code et des solutions à des problèmes complexes.
				</p>
				<p className="mt-3 leading-8">
					Ces outils ne sont pas parfaits, mais ils représentent un gain de
					temps considérable et améliorent la qualité globale de mes projets.
				</p>
				<div className="mt-6 flex w-full flex-row flex-wrap gap-3 print:hidden">
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800">
						<V0Icon className="size-7 shrink-0 md:size-8" />
						<p className="sr-only">V0</p>
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800">
						<GitHubCopilotIcon className="size-7 shrink-0 md:size-8" />
						<p className="sr-only">GitHub Copilot</p>
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800">
						<ChatGPTIcon className="size-7 shrink-0 md:size-8" />
						<p className="sr-only">ChatGPT</p>
					</div>
				</div>
			</FadeIn>
		</FadeInStagger>
	</>
);

export default StackPage;
