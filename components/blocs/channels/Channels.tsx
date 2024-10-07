import { githubUser } from '@/actions/github/user.action';
import { linkedInData } from '@/actions/linkedin/data.action';
import { Channel } from '@/components/blocs/channels/Channel';
import { env } from '@/env/server';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';

export const Channels = async (): Promise<React.JSX.Element> => {
	const [github, linkedin] = await Promise.all([
		githubUser(env.GITHUB_USERNAME),
		linkedInData(),
	]);

	return (
		<div className="flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
			<div className="flex w-full flex-col gap-y-2">
				<div className="flex items-center gap-x-2">
					<GithubLogo className="text-lg" weight="bold" />
					<p className="text-sm leading-snug">Sur GitHub :</p>
				</div>
				<Channel
					img={github.avatar}
					name={`@${github.login}`}
					link={`https://github.com/${github.login}`}
					subs={Math.round(github.followers + github.following)}
				/>
			</div>
			<div className="group flex w-full flex-col gap-y-2">
				<div className="flex items-center gap-x-2">
					<LinkedinLogo className="text-lg" weight="bold" />
					<p className="text-sm leading-snug">Sur LinkedIn :</p>
				</div>
				<Channel
					img={linkedin.avatar}
					name={linkedin.name}
					link={`https://fr.linkedin.com/in/${linkedin.id}`}
					subs={linkedin.followers}
				/>
			</div>
		</div>
	);
};
