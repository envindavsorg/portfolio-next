import { FadeIn } from '@/components/animations/FadeIn';
import { Do, Dont } from '@/components/blocs/DoAndDont';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/Accordion';
import type React from 'react';
import DataFetchDo from './fetch/bad.mdx';
import DataFetchDont from './fetch/good.mdx';
import ImageOptimization from './image.mdx';
import RenderClient from './render/client.mdx';
import RenderServer from './render/server.mdx';

export const FrontAccordion = (): React.JSX.Element => (
	<FadeIn className="mb-12">
		<h2 className="font-bold font-geist-sans text-xl sm:text-2xl">
			1. Avec un framework plus orienté{' '}
			<span className="text-theme">front</span> (React et Next.js)
		</h2>

		<p className="mt-6 leading-8">
			J'ai commencé à travailler avec{' '}
			<span className="font-bold text-theme">React</span> et{' '}
			<span className="font-bold text-theme">Next.js</span> en{' '}
			<span className="font-bold">2020</span>, à la fin de mes études. Depuis,
			j'ai eu l'occasion de développer plusieurs projets{' '}
			<span className="font-bold">professionnels</span> et{' '}
			<span className="font-bold">personnels</span> en utilisant ces
			technologies.
		</p>

		<p className="mt-3 leading-8">
			Leur <span className="font-bold">flexibilité</span> et leur{' '}
			<span className="font-bold">puissance</span> m'ont permis de créer des
			applications web performantes et évolutives. Grâce à{' '}
			<span className="font-bold text-theme">Next.js</span>, j'ai pu tirer parti
			du rendu pu tirer parti du rendu côté serveur{' '}
			<span className="font-bold text-theme">(SSR)</span> et de la génération de
			sites statiques sites statiques{' '}
			<span className="font-bold text-theme">(SSG)</span>, ce qui a
			considérablement amélioré les{' '}
			<span className="font-bold">performances</span> et le{' '}
			<span className="font-bold">SEO</span> de mes projets.
		</p>

		<p className="mt-3 leading-8">
			Quelques patterns super utiles et efficaces que j'utilise souvent avec{' '}
			<span className="font-bold text-theme">Next.js</span>, dans tous mes
			projets :
		</p>

		<Accordion className="mt-3" type="single" collapsible>
			<AccordionItem value="fetching-data">
				<AccordionTrigger>
					1. Récupérer les données efficacement avec Next.js
				</AccordionTrigger>
				<AccordionContent>
					<p className="leading-8">
						J'évite d'utiliser des gestionnaires de route{' '}
						<span className="font-bold text-theme">API</span> pour récupérer des
						données dans mes composants serveur. À la place, je{' '}
						<span className="font-bold">récupère</span> les données directement
						dans mes composants serveur. Cette approche tire parti des{' '}
						<span className="font-bold">optimisations</span> et du{' '}
						<span className="font-bold">caching</span> de{' '}
						<span className="font-bold text-theme">Next.js</span>.
					</p>

					<Dont text="Utiliser les routes API" />
					<DataFetchDont />
					<Do text="Utiliser les actions serveur" />
					<DataFetchDo />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="components-client-server">
				<AccordionTrigger>
					2. Utiliser les composants client et serveur
				</AccordionTrigger>
				<AccordionContent>
					<p className="leading-8">
						Comprendre la différence entre les composants{' '}
						<span className="font-bold text-theme">client</span> et{' '}
						<span className="font-bold text-theme">serveur</span> est crucial.
						Par défaut, les pages sont des composants{' '}
						<span className="font-bold">serveur</span>, mais vous pouvez inclure
						des composants <span className="font-bold">client</span> à
						l'intérieur pour l'interactivité.
					</p>
					<RenderClient />
					<RenderServer />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="static-generation">
				<AccordionTrigger>
					3. Optimisation des images avec next/image
				</AccordionTrigger>
				<AccordionContent>
					<p className="leading-8">
						L'optimisation des <span className="font-bold">images</span> est
						toujours un élément clé dans{' '}
						<span className="font-bold text-theme">Next.js</span>, et sur tous
						les sites web en général. Avec{' '}
						<span className="font-bold text-theme">next/image</span>, vous
						pouvez optimiser les images en utilisant des{' '}
						<span className="font-bold">formats optimisés</span> et en générant
						des images différentes selon les différents appareils.
					</p>
					<ImageOptimization />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</FadeIn>
);
