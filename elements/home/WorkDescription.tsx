import { FadeIn } from '@/components/animations/FadeIn';
import { Status } from '@/components/status/Status';
import { Badge } from '@/components/ui/Badge';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { Fragment } from 'react';

const WeFixIcon = (props: React.SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg
		viewBox="0 0 1018.5 1018.5"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		{...props}
	>
		<g className="fill-[#FF6900]">
			<path d="m213.93 723.61 81 81a16 16 0 0 0 22.61 0l487.05-487a16 16 0 0 0 0-22.6l-81-81a16 16 0 0 0 -22.62 0l-487.04 486.99a16 16 0 0 0 0 22.6" />
			<path d="m317.52 213.91a16 16 0 0 0 -22.61 0l-81 81a16 16 0 0 0 0 22.6l163.3 163.3 103.57-103.56z" />
			<path d="m804.57 701-163.39-163.43-103.57 103.64 163.39 163.38a16 16 0 0 0 22.62 0l81-81a16 16 0 0 0 0-22.61" />
		</g>
	</svg>
);

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
					className="font-bold text-theme underline"
				>
					travaille
				</Link>{' '}
				actuellement chez{' '}
				<Link
					href="https://wefix.net/"
					aria-label="Voir le site WeFix !"
					target="_blank"
				>
					<Badge>
						<WeFixIcon className="me-0.5 size-4 shrink-0 pb-0.5" />
						<span>WeFix</span>
					</Badge>
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
