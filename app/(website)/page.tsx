import { FadeInStagger } from '@/components/animations/FadeIn';
import { Separator } from '@/components/ui/Separator';
import {
	BlogArticles,
	LandingBlock,
	ProjectStars,
	SocialSubs,
	TechStack,
	WorkDescription,
} from '@/elements/home';
import { env } from '@/env/client';
import type React from 'react';

const AnimatedName = (): React.JSX.Element => (
	<h1 className="pt-6 font-bold font-geist-sans text-3xl transition-element sm:pt-12 md:text-4xl">
		<span className="sr-only">{env.NEXT_PUBLIC_FULLNAME}</span>
		<span className="group relative block overflow-hidden">
			<span className="group-hover:-translate-y-full inline-block transition-all duration-300 ease-in-out">
				{env.NEXT_PUBLIC_FULLNAME.split('').map(
					(letter: string, idx: number) => (
						<span
							key={`${letter}-${idx}`}
							className="inline-block"
							style={{
								transitionDelay: `${idx * 25}ms`,
							}}
						>
							{letter === ' ' ? '\u00A0' : letter}
						</span>
					),
				)}
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
		<p className="mt-1 font-bold text-sm text-theme sm:text-base">
			- bienvenue sur mon portfolio !
		</p>

		<FadeInStagger className="mt-10" faster>
			<LandingBlock />
			<Separator className="my-10" />
			<WorkDescription />
			<Separator className="my-10" />
			<TechStack />
			<Separator className="my-10" />
			<ProjectStars />
			<Separator className="my-10" />
			<SocialSubs />
			<Separator className="my-10" />
			<BlogArticles />
		</FadeInStagger>
	</>
);

export default Home;
