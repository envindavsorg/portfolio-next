import { githubUser } from '@/actions/github/user.action';
import { linkedInData } from '@/actions/linkedin/data.action';
import { Counter } from '@/components/Counter';
import { cn } from '@/lib/utils';
import {
	ArrowUpRight,
	GithubLogo,
	LinkedinLogo,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import type React from 'react';

interface ChannelProps {
	img: string;
	link: string;
	name: string;
	subs: number;
}

const Channel = ({
	img,
	link,
	name,
	subs,
}: ChannelProps): React.JSX.Element => (
	<div className="group flex w-full">
		<a
			href={link}
			target="_blank"
			rel="noreferrer"
			className="flex w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-4 transition-transform duration-300 group-hover:border-theme dark:border-neutral-700 dark:bg-black"
		>
			<div className="flex items-center space-x-4">
				<Image
					alt={name}
					src={img}
					height={64}
					width={64}
					sizes="33vw"
					className="size-14 rounded-full border border-neutral-200 dark:border-neutral-700"
					priority
				/>
				<div className="flex flex-col gap-y-0.5">
					<p className="font-bold">{name}</p>
					<p className="text-neutral-600 text-sm dark:text-neutral-400">
						<Counter value={subs} className="font-semibold" /> abonnés
					</p>
					<p className="sr-only">{name}</p>
				</div>
			</div>
			<div className="group-hover:-rotate-12 transform text-neutral-700 transition-transform duration-300 dark:text-neutral-300">
				<ArrowUpRight
					weight="regular"
					className="text-lg group-hover:text-theme"
				/>
			</div>
		</a>
	</div>
);

interface ChannelsProps {
	className?: string;
}

export const Channels = async ({
	className,
}: ChannelsProps): Promise<React.JSX.Element> => {
	const [github, linkedin] = await Promise.all([githubUser(), linkedInData()]);

	return (
		<div
			className={cn(
				'flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0',
				className,
			)}
		>
			<div className="flex w-full flex-col-reverse gap-y-2">
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
			<div className="group flex w-full flex-col-reverse gap-y-2">
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
