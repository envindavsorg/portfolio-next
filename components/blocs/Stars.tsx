import { projectStars } from '@/actions/github/stars.action';
import { Counter } from '@/components/numbers/Counter';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import type React from 'react';

interface StarProps {
	img: string;
	link: string;
	name: string;
	subs: number;
}

const Star = ({ img, link, name, subs }: StarProps): React.JSX.Element => (
	<div className="group flex w-full">
		<a
			href={link}
			target="_blank"
			rel="noreferrer"
			className="flex w-full items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 transition-transform duration-300 group-hover:border-theme dark:border-neutral-700 dark:bg-neutral-800"
		>
			<div className="flex items-center space-x-4">
				<Image
					alt={name}
					src={img}
					height={64}
					width={64}
					className="size-14 rounded-full border border-neutral-200 dark:border-neutral-700"
					priority
				/>
				<div className="flex flex-col gap-y-0.5">
					<p className="font-bold">{name}</p>
					<p className="text-neutral-600 text-sm dark:text-neutral-400">
						<Counter value={subs} className="font-semibold" /> étoiles
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

export const Stars = async (): Promise<React.JSX.Element> => {
	const [next, react] = await Promise.all([
		projectStars('vercel', 'next.js'),
		projectStars('facebook', 'react'),
	]);

	interface ProvidersProps {
		img: string;
		name: string;
		link: string;
		stars: number;
	}

	const providers: ProvidersProps[] = [
		{
			img: next.avatar,
			name: next.name,
			link: `https://github.com/${next.owner}/${next.name}`,
			stars: next.stars,
		},
		{
			img: react.avatar,
			name: react.name,
			link: `https://github.com/${react.owner}/${react.name}`,
			stars: react.stars,
		},
	];

	return (
		<div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
			{providers.map(({ img, name, link, stars }: ProvidersProps) => (
				<Star
					key={link}
					img={img}
					name={`@${name}`}
					link={link}
					subs={Math.round(stars)}
				/>
			))}
		</div>
	);
};
