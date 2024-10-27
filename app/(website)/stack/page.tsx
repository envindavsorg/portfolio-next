import { AnimatedName } from '@/app/(website)/animated-name';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { Title } from '@/components/blocs/Typography';
import { Separator } from '@/components/ui/Separator';
import { Tailwind } from '@/elements/stack/Tailwind';
import { BackAccordion } from '@/elements/stack/back/Accordion';
import { FrontAccordion } from '@/elements/stack/front/Accordion';
import { ProjectStack } from '@/elements/stack/stats/ProjectStack';
import { TechStart } from '@/elements/stack/stats/TechStart';
import { UsedLanguages } from '@/elements/stack/stats/UsedLanguages';
import { absoluteUrl } from '@/site/metadata';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type React from 'react';

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
			images: [
				absoluteUrl(`/api/og?heading=${title}&type=${type}&mode=${mode}`),
			],
		},
		alternates: {
			canonical: '/stack',
		},
	};
};

const StackPage = (): React.JSX.Element => (
	<>
		<Title>- les technologies que j'utilise</Title>
		<AnimatedName />

		<FadeInStagger className="mt-10" faster>
			<TechStart />
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
					Pour la gestion des bases de données, j'utilise principalement{' '}
					<span className="font-bold">MongoDB</span>
					et <span className="font-bold">Postgres</span>.{' '}
					<span className="font-bold">MongoDB</span> est une base de données
					<span className="font-bold">NoSQL</span> qui offre une grande
					flexibilité grâce à son modèle de documents, ce qui est idéal pour les
					applications nécessitant une structure de données dynamique.
				</p>
				<p className="mt-3 leading-8">
					D'autre part, <span className="font-bold">Postgres</span> est une base
					de données relationnelle robuste et riche en fonctionnalités, parfaite
					pour les applications nécessitant des transactions complexes et une
					intégrité des données stricte. Ces deux bases de données me permettent
					de choisir la solution la plus adaptée en fonction des besoins
					spécifiques de chaque projet.
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
					Pour améliorer ma productivité et la qualité de mon code, j'utilise
					plusieurs outils d'intelligence artificielle comme{' '}
					<span className="font-bold">v0</span>,{' '}
					<span className="font-bold">GitHub Copilot</span>
					et <span className="font-bold">ChatGPT</span>.
				</p>
				<p className="mt-3 leading-8">
					<span className="font-bold">v0</span> m'aide à générer des snippets de
					code en Front. <span className="font-bold">GitHub Copilot</span>{' '}
					fournit des suggestions de code en temps réel directement dans mon
					IDE, ce qui accélère le développement et réduit les erreurs.{' '}
					<span className="font-bold">ChatGPT</span> est utile pour obtenir des
					explications détaillées, des exemples de code et des solutions à des
					problèmes complexes.
				</p>
				<p className="mt-3 leading-8">
					Ces outils ne sont pas parfaits, mais ils représentent un gain de
					temps considérable et améliorent la qualité globale de mes projets.
				</p>
			</FadeIn>
		</FadeInStagger>
	</>
);

export default StackPage;
