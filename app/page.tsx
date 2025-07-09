import Link from 'next/link';
import type React from 'react';
import { FadeInStagger } from '@/components/animations/FadeIn';
import { CV } from '@/components/blocs/CV';
import { Cards } from '@/components/cards';
import { Counter } from '@/components/text/Counter';
import PageParagraph from '@/components/text/PageParagraph';
import PageTitle from '@/components/text/PageTitle';
import { name, title } from '@/resources/config';

const firstName = name.trim().split(' ').pop() || 'Florin';
const jobTitle = 'développeur front-end et designer web UX / UI';
const experienceYears = 10;

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name,
	jobTitle,
	description: `Développeur web avec ${experienceYears} ans d'expérience`,
	worksFor: {
		'@type': 'Organization',
		name: 'WeFix',
	},
	knowsAbout: [
		'Développement web',
		'React',
		'Next.js',
		'UX/UI Design',
		'JavaScript',
		'TypeScript',
	],
};

const Home = (): React.JSX.Element => (
	<>
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>

		<section>
			<PageTitle name={name} title={title} isHome>
				- {jobTitle}
			</PageTitle>
			<FadeInStagger className="mt-6 flex flex-col gap-y-2" faster>
				<PageParagraph>
					Bonjour, je suis {firstName} ✌️, développeur web avec{' '}
					<span className="text-foreground">
						<Counter value={experienceYears} /> ans d'expérience
					</span>
					, passionné par la création d'applications fiables, belles et fonctionnelles.
				</PageParagraph>
				<CV className="my-4" />
				<PageParagraph>
					Je travaille actuellement chez{' '}
					<Link href="/work" className="font-medium text-foreground" prefetch={false}>
						<span className="text-theme">/</span>WeFix
					</Link>
					, leader de la réparation, où je développe des solutions web pour améliorer
					l'expérience utilisateur.
				</PageParagraph>
			</FadeInStagger>

			<Cards />
		</section>
	</>
);

export default Home;
