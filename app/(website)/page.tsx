import { FadeInStagger } from '@/components/animations/FadeIn';
import { AnimatedName } from '@/components/text/AnimatedName';
import { Separator } from '@/components/ui/Separator';
import {
	BlogArticles,
	LandingBlock,
	ProjectStars,
	SocialSubs,
	TechStack,
	WorkDescription,
} from '@/elements/home';
import type React from 'react';

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
