import { githubUser } from '@/actions/github/user.action';
import { FadeIn } from '@/components/animations/FadeIn';
import { Channel, ChannelSkeleton } from '@/components/blocs/Channel';
import { env as server } from '@/env/server';
import { cn } from '@/lib/utils';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import { unstable_noStore as noStore } from 'next/dist/server/web/spec-extension/unstable-no-store';
import type { StaticImageData } from 'next/image';
import type React from 'react';
import { Suspense } from 'react';
import { Fragment } from 'react';

interface Data {
	avatar: string | StaticImageData;
	login: string;
	link: string;
	followers: number;
	following: number;
	icon: React.ReactNode;
}

interface SubscribersProps {
	className?: string;
}

const Subscribers = async ({
	className,
}: SubscribersProps): Promise<React.JSX.Element> => {
	noStore();
	const { avatar, login, followers, following } = await githubUser(
		server.GITHUB_USERNAME,
	);

	const data: Data[] = [
		{
			avatar,
			login: `@${login}`,
			link: `https://github.com/${login}`,
			followers,
			following,
			icon: <GithubLogo />,
		},
		{
			avatar:
				'https://media.licdn.com/dms/image/v2/D4E03AQGMBLwqpxHRGA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715716598040?e=1733961600&v=beta&t=miUysAuI_Yu1dAeY8ApQVWPiTNt7pclf0c_PqO51yMo',
			login: 'Florin Cuzeac',
			link: 'https://www.linkedin.com/in/cuzeacflorin',
			followers: 2312,
			following: 0,
			icon: <LinkedinLogo />,
		},
	];

	return (
		<div
			className={cn(
				'flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0',
				className,
			)}
		>
			{data.map(
				(
					{ avatar, login, link, followers, following, icon }: Data,
					idx: number,
				) => (
					<Channel
						key={`${login}-${idx}`}
						avatar={avatar}
						name={login}
						link={link}
						subs={Math.round(followers + following)}
						icon={icon}
					/>
				),
			)}
		</div>
	);
};

export const SocialSubs = (): React.JSX.Element => (
	<Fragment>
		<FadeIn>
			<p className="leading-8">
				Je suis présent sur{' '}
				<Link
					href="https://linkedin.com/"
					className="font-medium hover:text-theme"
				>
					LinkedIn
				</Link>{' '}
				et sur{' '}
				<Link
					href="https://github.com/"
					className="font-medium hover:text-theme"
				>
					GitHub
				</Link>{' '}
				(retrouvez{' '}
				<Link
					href="/github"
					aria-label="Activité et statistiques de mon profil GitHub"
					className="font-bold text-theme"
				>
					toute mon activité et mes statistiques)
				</Link>
				), n'hésitez pas à me rendre une petite visite sur mes profils et
				pourquoi pas{' '}
				<Link
					href="/contact"
					aria-label="Contactez-moi"
					className="font-bold text-theme"
				>
					me laisser un message
				</Link>{' '}
				😃
			</p>
		</FadeIn>

		<Suspense
			fallback={
				<div className="mt-6 flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
					{Array.from({ length: 2 }).map((_, idx: number) => (
						<ChannelSkeleton key={`${idx}-channel-skeleton`} />
					))}
				</div>
			}
		>
			<Subscribers className="mt-6" />
		</Suspense>
	</Fragment>
);
