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

export const Cards = async () => {
	const contributions = await getGithubContributions();

	const { followers, stars } = await githubUser(process.env.GITHUB_USERNAME!);

	return (
		<Motion
			asChild
			animate="visible"
			variants={{
				visible: {
					transition: {
						delayChildren: 0.25,
						staggerChildren: 0.1,
					},
				},
			}}
		>
			<section className="mt-8 grid grid-cols-8 grid-rows-5 gap-4 md:grid-cols-7 md:grid-rows-3">
				<AvatarCard />
				<GithubStatsCard
					followers={followers}
					stars={stars}
					contributions={contributions}
				/>
				<GitHubIconCard />
				<ThemeCard />
				<LocationCard />
				<LinkedInCard />
				<TimeCard />
			</section>
		</Motion>
	);
};
