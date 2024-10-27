import { FadeInStagger } from '@/components/animations/FadeIn';
import { Paragraph } from '@/components/blocs/Typography';
import { Separator } from '@/components/ui/Separator';
import {
	BlogArticles,
	LandingBlock,
	ProjectStars,
	SocialSubs,
	TechStack,
	WorkDescription,
} from '@/elements/home';
import { name } from '@/resources/config';
import type React from 'react';

const AnimatedName = (): React.JSX.Element => (
	<h1 className="pt-6 font-bold font-geist-sans text-3xl transition-element sm:pt-12 md:text-4xl">
		<span className="sr-only">{name}</span>
		<span className="group relative block overflow-hidden">
			<span className="group-hover:-translate-y-full inline-block transition-all duration-300 ease-in-out">
				{name.split('').map((letter: string, idx: number) => (
					<span
						key={`${letter}-${idx}`}
						className="inline-block"
						style={{
							transitionDelay: `${idx * 25}ms`,
						}}
					>
						{letter === ' ' ? '\u00A0' : letter}
					</span>
				))}
			</span>
			<span className="absolute top-0 left-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0">
				{'Développeur web'.split('').map((letter, index) => (
					<span
						key={index}
						className="inline-block"
						style={{
							transitionDelay: `${index * 25}ms`,
						}}
					>
						{letter === ' ' ? '\u00A0' : letter}
					</span>
				))}
			</span>
		</span>
	</h1>
);

const Home = (): React.JSX.Element => (
	<>
		<AnimatedName />
		<Paragraph>- bienvenue sur mon portfolio !</Paragraph>

		<FadeInStagger className="mt-10" faster>
			<LandingBlock />
			<Separator className="my-12" />
			<WorkDescription />
			<Separator className="my-12" />
			<TechStack />
			<Separator className="my-12" />
			<ProjectStars />
			<Separator className="my-12" />
			<SocialSubs />
			<Separator className="my-12" />
			<BlogArticles />
		</FadeInStagger>
	</>
);

export default Home;
