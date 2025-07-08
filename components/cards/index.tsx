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
			<section className="mt-8 grid grid-cols-4 grid-rows-6 gap-4 sm:grid-cols-7 sm:grid-rows-3">
				<AvatarCard position="col-span-2 row-span-3 col-start-1 row-start-1 sm:col-span-2 sm:row-span-3 sm:col-start-1 sm:row-start-1" />

				<TimeCard position="col-span-2 row-span-1 col-start-3 row-start-1 sm:col-span-2 sm:row-span-1 sm:col-start-6 sm:row-start-1" />

				<LocationCard position="col-span-2 row-span-2 col-start-3 row-start-2 sm:col-span-2 sm:row-span-2 sm:col-start-6 sm:row-start-2" />

				<GithubStatsCard
					followers={followers}
					stars={stars}
					contributions={contributions}
					position="col-span-4 row-span-2 col-start-1 row-start-4 sm:col-span-3 sm:row-span-2 sm:col-start-3 sm:row-start-1"
				/>

				<GitHubIconCard position="col-span-2 row-span-1 col-start-1 row-start-6 sm:col-span-1 sm:row-span-1 sm:col-start-3 sm:row-start-3" />
				<LinkedInCard position="col-span-1 row-span-1 col-start-3 row-start-6 sm:col-span-1 sm:row-span-1 sm:col-start-4 sm:row-start-3" />
				<ThemeCard position="col-span-1 row-span-1 col-start-4 row-start-6 sm:col-span-1 sm:row-span-1 sm:col-start-5 sm:row-start-3" />
			</section>
		</Motion>
	);
};
