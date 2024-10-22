import { Do } from '@/components/blocs/DoAndDont';
import type React from 'react';

export const Tailwind = (): React.JSX.Element => (
	<>
		<Do text="Pourquoi utiliser Tailwind CSS ?" />
		<div className="rounded-md border border-neutral-200 bg-neutral-50 p-3 *:text-sm dark:border-neutral-700 dark:bg-neutral-800">
			<p className="leading-8">
				<span className="font-bold text-theme">Tailwind CSS</span> est un
				excellent outil pour accélérer la création de sites web grâce à ses
				classes prêtes à l’emploi, permettant d’éviter d’écrire du CSS
				personnalisé.
			</p>
			<p className="mt-3 leading-8">
				On applique directement des classes aux éléments{' '}
				<span className="font-bold text-theme">HTML</span>, ce qui simplifie le
				design tout en assurant un style cohérent et un code plus lisible. Sa
				grande flexibilité permet de personnaliser facilement les styles via un
				fichier de configuration, d’ajuster les points de rupture pour le
				responsive et d’optimiser les performances en supprimant les classes
				inutilisées.
			</p>
			<p className="mt-3 leading-8">
				De plus, avec une large communauté et des outils comme{' '}
				<span className="font-bold text-theme">Tailwind UI</span>, il est facile
				de profiter de ressources supplémentaires, ce qui fait de Tailwind un
				choix populaire pour des interfaces modernes et efficaces.
			</p>
		</div>
	</>
);
