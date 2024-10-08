import { projectStars } from '@/actions/github/stars.action';
import { FadeIn } from '@/components/animations/FadeIn';
import { Channel, ChannelSkeleton } from '@/components/blocs/Channel';
import { ReactIcon } from '@/components/icons/React';
import { TailwindCSSIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { GithubLogo } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import { unstable_noStore as noStore } from 'next/dist/server/web/spec-extension/unstable-no-store';
import type React from 'react';
import { Suspense } from 'react';
import { Fragment } from 'react';

interface Data {
	avatar: string;
	name: string;
	link: string;
	stars: number;
}

interface StarsProps {
	className?: string;
}

export const Stars = async ({
	className,
}: StarsProps): Promise<React.JSX.Element> => {
	noStore();
	const [next, react] = await Promise.all([
		projectStars('vercel', 'next.js'),
		projectStars('facebook', 'react'),
	]);

	const data: Data[] = [
		{
			avatar: next.avatar,
			name: next.name,
			link: `https://github.com/${next.owner}/${next.name}`,
			stars: next.stars,
		},
		{
			avatar: react.avatar,
			name: react.name,
			link: `https://github.com/${react.owner}/${react.name}`,
			stars: react.stars,
		},
	];

	return (
		<div
			className={cn(
				'flex w-full flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0',
				className,
			)}
		>
			{data.map(({ avatar, name, link, stars }: Data, idx: number) => (
				<Channel
					key={`${name}-${idx}`}
					avatar={avatar}
					name={`@${name}`}
					link={link}
					stars={Math.round(stars)}
					icon={<GithubLogo />}
				/>
			))}
		</div>
	);
};

export const ProjectStars = (): React.JSX.Element => (
	<Fragment>
		<FadeIn>
			<p className="leading-8">
				J'ai ensuite{' '}
				<Link
					href="/stack"
					aria-label="Technologies que j'utilise"
					className="font-bold text-theme underline"
				>
					appris à utiliser
				</Link>{' '}
				des frameworks plus complexes comme{' '}
				<Link
					href="https://react.dev/"
					aria-label="Voir le site de React !"
					target="_blank"
				>
					<Badge>
						<ReactIcon />
						&nbsp;React
					</Badge>
				</Link>{' '}
				et{' '}
				<Link
					href="https://vuejs.org/"
					aria-label="Voir le site de Vue !"
					target="_blank"
				>
					<Badge>
						<VueIcon />
						&nbsp;Vue.js
					</Badge>
				</Link>
				, avec{' '}
				<Link
					href="https://www.typescriptlang.org/"
					aria-label="Voir le site de Vue !"
					target="_blank"
				>
					<Badge>
						<TypeScriptIcon />
						&nbsp;TypeScript
					</Badge>
				</Link>{' '}
				en parallèle, me permettant de développer des applications plus
				robustes, belles et fonctionnelles. Pour le{' '}
				<span className="font-bold">design</span> et l'
				<span className="font-bold">UI</span> des mes applications, j'utilise{' '}
				<Link
					href="https://tailwindcss.com/"
					aria-label="Voir le site de Tailwind !"
					target="_blank"
				>
					<Badge>
						<TailwindCSSIcon />
						&nbsp;Tailwind CSS
					</Badge>
				</Link>
				, qui est un framework incroyable de styling, puissant et modulaire.
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
			<Stars className="mt-6" />
		</Suspense>
	</Fragment>
);
