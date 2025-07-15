import Script from 'next/script';
import type React from 'react';
import { Fragment, memo } from 'react';
import { FadeIn } from '@/components/blocs/FadeIn';
import { Cards } from '@/components/blocs/home/bento';
import { Evolution } from '@/components/blocs/home/Evolution';
import { SocialMedia } from '@/components/blocs/home/SocialMedia';
import { StackDesign } from '@/components/blocs/home/StackDesign';
import { StackMarquee } from '@/components/blocs/home/StackMarquee';
import { StackText } from '@/components/blocs/home/StackText';
import { TopText } from '@/components/blocs/home/TopText';
import { UpdatePill } from '@/components/blocs/home/UpdatePill';
import { StarsChannelForFrameworks } from '@/components/channels/Stars';
import PageParagraph from '@/components/text/PageParagraph';
import PageTitle from '@/components/text/PageTitle';
import { TextHover } from '@/components/text/TextHover';
import { BadgeWithIcon } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import {
	firstName,
	fullName,
	mainTitle,
	workExpYears,
	workJobTitle,
} from '@/resources/config';

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: fullName,
	workJobTitle,
	description: `Développeur web avec ${workExpYears} ans d'expérience`,
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
	<Fragment>
		<Script
			id="structured-data"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>

		<section className="relative">
			<UpdatePill />
			<PageTitle name={fullName} title={mainTitle} isHome>
				- {workJobTitle}
			</PageTitle>
			<TopText />
			<Cards />
			<Separator className="my-12" />
			<FadeIn asChild>
				<PageParagraph>
					J’ai travaillé sur de nombreux projets mobilisant divers langages et
					technologies. Mes premiers développements portaient sur la création de sites web
					avec <BadgeWithIcon type="html" />, <BadgeWithIcon type="css" /> et{' '}
					<BadgeWithIcon type="js" />.
				</PageParagraph>
			</FadeIn>
			<StackMarquee />
			<StackText />
			<FadeIn className="my-12 flex flex-col gap-y-4">
				<PageParagraph>
					Mes deux frameworks favoris, qui sont aussi très populaires, sont :
				</PageParagraph>
				<StarsChannelForFrameworks />
			</FadeIn>
			<StackDesign />
			<Separator className="my-12" />
			<SocialMedia />
			<Separator className="my-12" />
			<Evolution />
			<div className="mt-20 flex items-center justify-center">
				<TextHover text={firstName.toUpperCase()} />
			</div>
		</section>
	</Fragment>
);

export default memo(Home);
