import { AnimatedName } from '@/app/(website)/animated-name';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { Title } from '@/components/blocs/Typography';
import { Separator } from '@/components/ui/Separator';
import { GitHubGraph } from '@/elements/github/Graph';
import { GitHubStats } from '@/elements/github/Stats';
import { GitHubTable } from '@/elements/github/Table';
import { WakatimeStats } from '@/elements/github/Wakatime';
import { absoluteUrl } from '@/site/metadata';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type React from 'react';

export const generateMetadata = async (): Promise<Metadata> => {
	const cookie = await cookies();
	const type: string = 'image';
	const mode: string | undefined = cookie.get('theme')?.value;
	const title: string = 'Activité et statistiques';

	return {
		title,
		description:
			"Activité et statistiques de mon profil GitHub sur l'année passée",
		openGraph: {
			images: [
				absoluteUrl(`/api/og?heading=${title}&type=${type}&mode=${mode}`),
			],
		},
		alternates: {
			canonical: '/github',
		},
	};
};

const GitHubPage = (): React.JSX.Element => (
	<>
		<Title>- activité et statistiques sur GitHub</Title>
		<AnimatedName />

		<FadeInStagger className="mt-10" faster>
			<FadeIn>
				<p className="leading-8">
					Toutes mes <span className="font-bold">statistiques GitHub</span>{' '}
					(nombre de commits, abonnés, suivis) de l'année{' '}
					<span className="font-bold text-theme">
						{new Date().getFullYear() - 1}
					</span>{' '}
					-{' '}
					<span className="font-bold text-theme">
						{new Date().getFullYear()}
					</span>{' '}
					sont affichées ici.
				</p>
			</FadeIn>
			<GitHubStats className="mt-6" />

			<Separator className="my-12" />

			<FadeIn>
				<p className="leading-8">
					Mon graphique de{' '}
					<span className="font-bold">contributions GitHub</span> sur l'année{' '}
					<span className="font-bold text-theme">
						{new Date().getFullYear() - 1}
					</span>{' '}
					-{' '}
					<span className="font-bold text-theme">
						{new Date().getFullYear()}
					</span>
					. J'essaie tous les jours de{' '}
					<span className="font-bold">contribuer</span> et de{' '}
					<span className="font-bold">créer</span> de nouveaux projets. Je suis
					toujours à la <span className="font-bold">recherche</span> de
					nouvelles <span className="font-bold">idées</span> que je puisse les
					matérialiser sur GitHub.
				</p>
				.
			</FadeIn>
			<GitHubGraph className="mt-6" />

			<Separator className="my-12" />

			<FadeIn>
				<p className="leading-8">
					Mes statistiques hebdomadaires de{' '}
					<span className="font-bold">temps de code</span>. Vous pouvez
					retrouver mon temps de code moyen, mon temps de code total sur la
					semaine passée, mon meilleur jour et les langages que j'utilise le
					plus.
				</p>
			</FadeIn>
			<WakatimeStats className="mt-6" />

			<Separator className="my-12" />

			<FadeIn>
				<p className="leading-8">
					Plus de détails sur mon{' '}
					<span className="font-bold">nombre de commits</span> effectués de la
					semaine dernière, <span className="font-bold">jour</span> par{' '}
					<span className="font-bold">jour</span>.
				</p>
			</FadeIn>
			<GitHubTable className="mt-6" />
		</FadeInStagger>
	</>
);

export default GitHubPage;
