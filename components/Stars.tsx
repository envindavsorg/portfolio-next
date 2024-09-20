import { projectStars } from '@/actions/github/stars.action';
import { Counter } from '@/components/Counter';
import { cn } from '@/lib/utils';
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

interface StarsProps {
	className?: string;
}

export const Stars = async ({
	className,
}: StarsProps): Promise<React.JSX.Element> => {
	const [next, react] = await Promise.all([
		projectStars('vercel', 'next.js'),
		projectStars('facebook', 'react'),
	]);

	return (
		<div
			className={cn(
				'flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0',
				className,
			)}
		>
			<Star
				img={next.avatar}
				name={`@${next.name}`}
				link={`https://github.com/${next.owner}/${next.name}`}
				subs={Math.round(next.stars)}
			/>
			<Star
				img={react.avatar}
				name={`@${react.name}`}
				link={`https://github.com/${react.owner}/${react.name}`}
				subs={Math.round(react.stars)}
			/>
		</div>
	);
};
