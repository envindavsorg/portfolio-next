import { FadeIn } from '@/components/animations/FadeIn';
import { Status } from '@/components/status/Status';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { Fragment } from 'react';

export const WorkDescription = (): React.JSX.Element => (
	<Fragment>
		<FadeIn>
			<p className="leading-8">
				Je suis un <span className="font-bold text-theme">développeur</span> et{' '}
				<span className="font-bold text-theme">designer web</span> depuis{' '}
				<span className="font-bold">{new Date().getFullYear() - 2018} ans</span>
				, passionné par la création d’applications <span>belles</span> et{' '}
				<span>fonctionnelles</span>, le design et le développement web.
			</p>
		</FadeIn>

		<FadeIn className="mt-3">
			<p className="leading-8">
				Je{' '}
				<Link
					href="/work"
					aria-label="Entreprises pour lesquelles j'ai travaillé"
					className="!underline font-bold text-theme"
				>
					travaille
				</Link>{' '}
				actuellement chez{' '}
				<Link
					href="https://wefix.net/"
					aria-label="Voir le site WeFix !"
					target="_blank"
					className="!underline font-extrabold text-theme"
				>
					WeFix
				</Link>{' '}
				une <span className="font-bold">entreprise leader</span> dans la
				réparation de smartphones, tablettes, ordinateurs portables et consoles
				de jeux.
			</p>
		</FadeIn>

		<FadeIn className="mt-6">
			<p className="leading-8">
				J'ai décidé de créer ce site pour{' '}
				<span className="font-bold">partager mes expériences</span> et{' '}
				<span className="font-bold">mes compétences</span> avec tout le monde.
			</p>
			<div className="mt-3">
				<Status />
			</div>
		</FadeIn>
	</Fragment>
);
