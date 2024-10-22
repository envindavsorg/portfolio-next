import { FadeIn } from '@/components/animations/FadeIn';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/Accordion';
import Express from '@/elements/stack/back/frameworks/express.mdx';
import Fastify from '@/elements/stack/back/frameworks/fastify.mdx';
import type React from 'react';

export const BackAccordion = (): React.JSX.Element => (
	<FadeIn className="mb-12">
		<h2 className="font-bold font-geist-sans text-xl sm:text-2xl">
			2. Avec un framework plus orienté <span className="text-theme">back</span>{' '}
			(Express ou Fastify)
		</h2>

		<p className="mt-6 leading-8">
			Pour les projets nécessitant un backend robuste, j'utilise des frameworks
			comme <span className="font-bold text-theme">Express</span> ou{' '}
			<span className="font-bold text-theme">Fastify</span>. Express est un
			choix populaire grâce à sa <span className="font-bold">simplicité</span>{' '}
			et sa <span className="font-bold">flexibilité</span>, tandis que Fastify
			se distingue par ses{' '}
			<span className="font-bold">performances élevées</span> et son{' '}
			<span className="font-bold">faible overhead</span>.
		</p>

		<p className="mt-3 leading-8">
			Ces frameworks me permettent de créer des API rapides et scalables, tout
			en offrant une grande liberté dans la structuration du code et
			l'intégration de middlewares.
		</p>

		<Accordion className="mt-3" type="single" collapsible>
			<AccordionItem value="express">
				<AccordionTrigger>1. Un petit exemple avec Express</AccordionTrigger>
				<AccordionContent>
					<p className="leading-8">
						Dans cet exemple, nous importons{' '}
						<span className="font-bold text-theme">express</span> et les types{' '}
						<span className="font-bold text-theme">Request</span> et{' '}
						<span className="font-bold text-theme">Response</span>. Nous créons
						une application Express. Nous définissons une{' '}
						<span className="font-bold text-theme">route GET</span> pour la
						racine (/) qui renvoie{' '}
						<span className="font-bold">"Hello, world!"</span>. Nous démarrons
						le serveur sur le port 3000 et affichons un message dans la console.
					</p>
					<Express />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="fastify">
				<AccordionTrigger>2. Un petit exemple avec Fastify</AccordionTrigger>
				<AccordionContent>
					<p className="leading-8">
						Dans cet exemple, nous importons{' '}
						<span className="font-bold text-theme">fastify</span> et créons une
						instance de serveur. Nous définissons une{' '}
						<span className="font-bold text-theme">route GET</span> pour la
						racine (/) qui renvoie un objet JSON avec le message{' '}
						<span className="font-bold">"Hello, world!"</span>. Nous démarrons
						le serveur sur le port 3000 et affichons un message dans la console.
					</p>
					<Fastify />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</FadeIn>
);
