import { env } from '@/env/client';
import { Link } from 'next-view-transitions';
import type React from 'react';

interface SplitProps {
	text: string;
	className?: string;
}

const Split = ({ text, className }: SplitProps) => (
	<span className={className}>
		{text.split('').map((letter: string, index: number) => (
			<span
				key={index}
				className="inline-block"
				style={{
					transitionDelay: `${index * 25}ms`,
				}}
			>
				{letter === ' ' ? '\u00A0' : letter}
			</span>
		))}
	</span>
);

export const AnimatedName = (): React.JSX.Element => (
	<h1 className="pt-12 font-bold font-geist-sans text-3xl transition-element md:text-4xl">
		<span className="sr-only">
			{env.NEXT_PUBLIC_NAME} {env.NEXT_PUBLIC_SURNAME}
		</span>
		<span aria-hidden="true" className="group relative block overflow-hidden">
			<Split
				text={`${env.NEXT_PUBLIC_NAME} ${env.NEXT_PUBLIC_SURNAME}`}
				className="group-hover:-translate-y-full inline-block transition-all duration-300 ease-in-out"
			/>
			<Split
				text="Développeur web"
				className="absolute top-0 left-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0"
			/>
		</span>
	</h1>
);

export const AnimatedNameLink = (): React.JSX.Element => (
	<Link
		href="/"
		className="fade-in mb-8 flex font-bold font-geist-sans text-3xl text-theme md:text-4xl"
	>
		{env.NEXT_PUBLIC_NAME} {env.NEXT_PUBLIC_SURNAME}
	</Link>
);
