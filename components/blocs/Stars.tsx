import { projectStars } from '@/actions/github/stars.action';
import { Counter } from '@/components/numbers/Counter';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { unstable_noStore as noStore } from 'next/cache';
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
			className="flex w-full items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 p-3 transition-transform duration-300 group-hover:border-theme dark:border-neutral-700 dark:bg-neutral-800"
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
					<p className="font-extrabold">{name}</p>
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

export const FrontFrameworkStars = async (): Promise<React.JSX.Element> => {
	noStore();

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

export const BackFrameworkStars = async (): Promise<React.JSX.Element> => {
	noStore();

	const [express, fastify] = await Promise.all([
		projectStars('expressjs', 'express'),
		projectStars('fastify', 'fastify'),
	]);

	interface ProvidersProps {
		img: string;
		name: string;
		link: string;
		stars: number;
	}

	const providers: ProvidersProps[] = [
		{
			img: express.avatar,
			name: express.name,
			link: `https://github.com/${express.owner}/${express.name}`,
			stars: express.stars,
		},
		{
			img: fastify.avatar,
			name: fastify.name,
			link: `https://github.com/${fastify.owner}/${fastify.name}`,
			stars: fastify.stars,
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

export const DesignFrameworkStars = async (): Promise<React.JSX.Element> => {
	noStore();

	const [tailwind, shadcn] = await Promise.all([
		projectStars('tailwindlabs', 'tailwindcss'),
		projectStars('shadcn', 'ui'),
	]);

	interface ProvidersProps {
		img: string;
		name: string;
		link: string;
		stars: number;
	}

	const providers: ProvidersProps[] = [
		{
			img: tailwind.avatar,
			name: tailwind.name,
			link: `https://github.com/${tailwind.owner}/${tailwind.name}`,
			stars: tailwind.stars,
		},
		{
			img: shadcn.avatar,
			name: `shadcn/${shadcn.name}`,
			link: `https://github.com/${shadcn.owner}/${shadcn.name}`,
			stars: shadcn.stars,
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

export const DatabaseStars = async (): Promise<React.JSX.Element> => {
	noStore();

	const [mongo, postgres] = await Promise.all([
		projectStars('mongodb', 'mongo'),
		projectStars('postgres', 'postgres'),
	]);

	interface ProvidersProps {
		img: string;
		name: string;
		link: string;
		stars: number;
	}

	const providers: ProvidersProps[] = [
		{
			img: mongo.avatar,
			name: mongo.name,
			link: `https://github.com/${mongo.owner}/${mongo.name}`,
			stars: mongo.stars,
		},
		{
			img: postgres.avatar,
			name: postgres.name,
			link: `https://github.com/${postgres.owner}/${postgres.name}`,
			stars: postgres.stars,
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
