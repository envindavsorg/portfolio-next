import type React from 'react';
import { githubUser } from '@/actions/github/user.action';
import { getGithubContributions } from '@/app/actions';
import { AvatarCard } from '@/components/cards/Avatar';
import { GitHubIconCard } from '@/components/cards/GitHubIcon';
import { GithubStatsCard } from '@/components/cards/GitHubStats';
import { LinkedInCard } from '@/components/cards/LinkedIn';
import { LocationCard } from '@/components/cards/Location';
import { ThemeCard } from '@/components/cards/Theme';
import { TimeCard } from '@/components/cards/Time';
import { Motion } from '@/components/motion';

export const Cards = async (): Promise<React.JSX.Element> => {
	try {
		const [contributions, { followers, stars }] = await Promise.all([
			getGithubContributions(),
			githubUser(process.env.GITHUB_USERNAME!),
		]);

		return (
			<Motion asChild animate="visible">
				<section className="mt-8 grid grid-cols-4 grid-rows-6 gap-3 sm:grid-cols-7 sm:grid-rows-3">
					<AvatarCard />
					<TimeCard />
					<LocationCard />
					<GithubStatsCard
						followers={followers}
						stars={stars}
						contributions={contributions}
					/>
					<GitHubIconCard />
					<LinkedInCard />
					<ThemeCard />
				</section>
			</Motion>
		);
	} catch (error) {
		console.error('Failed to load GitHub data:', error);
		return (
			<Motion asChild animate="visible">
				<section className="mt-8 grid grid-cols-4 grid-rows-6 gap-4 sm:grid-cols-7 sm:grid-rows-3">
					<AvatarCard />
					<TimeCard />
					<LocationCard />
					<div className="relative isolate col-span-4 col-start-1 row-span-2 row-start-4 flex items-center justify-center overflow-hidden rounded-xl border border-neutral-200/50 bg-white/20 p-4 ring-1 ring-black/5 sm:col-span-3 sm:col-start-3 sm:row-span-2 sm:row-start-1 sm:h-43 dark:border-neutral-700/50 dark:bg-white/10">
						<p className="text-neutral-600 text-sm dark:text-neutral-400">
							Unable to load GitHub stats
						</p>
					</div>
					<GitHubIconCard />
					<LinkedInCard />
					<ThemeCard />
				</section>
			</Motion>
		);
	}
};
