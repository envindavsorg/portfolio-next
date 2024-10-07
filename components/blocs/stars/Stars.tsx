import { projectStars } from '@/actions/github/stars.action';
import { Star } from '@/components/blocs/stars/Star';
import { unstable_noStore as noStore } from 'next/cache';
import type React from 'react';

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
