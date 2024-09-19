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
	subs: React.ReactNode;
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
			className={cn(
				'flex w-full items-center justify-between',
				'border border-neutral-200 dark:border-neutral-700',
				'rounded-md bg-background px-3 py-4',
			)}
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
				<div className="flex flex-col">
					<p className="font-bold text-neutral-900 dark:text-neutral-100">
						{name}
					</p>
					{subs}
				</div>
			</div>
			<div className="group-hover:-rotate-12 transform text-neutral-700 transition-transform duration-300 dark:text-neutral-300">
				<ArrowUpRight weight="bold" className="text-lg" />
			</div>
		</a>
	</div>
);

export const Channels = async (): Promise<React.JSX.Element> => {
	const [github, linkedin] = await Promise.all([githubUser(), linkedInData()]);

	return (
		<div className="my-8 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
			<div className="flex w-full flex-col gap-y-2">
				<div className="flex items-center gap-x-1">
					<GithubLogo className="text-black text-lg" weight="bold" />
					<p className="text-gray-800 text-sm leading-snug">Sur GitHub :</p>
				</div>
				<Channel
					img={github.avatar}
					name={`@${github.login}`}
					link={`https://github.com/${github.login}`}
					subs={
						<>
							<p className="text-neutral-600 dark:text-neutral-400">
								<Counter
									value={Math.round(github.followers + github.following)}
								/>{' '}
								abonnés
							</p>
							<p className="sr-only">{github.name}</p>
						</>
					}
				/>
			</div>
			<div className="flex w-full flex-col gap-y-2">
				<div className="flex items-center gap-x-1">
					<LinkedinLogo className="text-black text-lg" weight="bold" />
					<p className="text-gray-800 text-sm leading-snug">Sur LinkedIn :</p>
				</div>
				<Channel
					img={linkedin.avatar}
					name={linkedin.name}
					link={`https://fr.linkedin.com/in/${linkedin.id}`}
					subs={
						<>
							<p className="text-neutral-600 dark:text-neutral-400">
								<Counter value={linkedin.followers} /> abonnés
							</p>
							<p className="sr-only">{linkedin.name}</p>
						</>
					}
				/>
			</div>
		</div>
	);
};
