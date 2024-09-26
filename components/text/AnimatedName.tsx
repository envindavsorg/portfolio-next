import { env } from '@/env/client';
import { Link } from 'next-view-transitions';
import type React from 'react';

export const AnimatedName = (): React.JSX.Element => (
	<h1 className="pt-16 font-bold font-geist-sans text-3xl transition-element md:text-4xl">
		<span className="sr-only">
			{env.NEXT_PUBLIC_NAME} {env.NEXT_PUBLIC_SURNAME}
		</span>
		<span aria-hidden="true" className="group relative block overflow-hidden">
			<span className="group-hover:-translate-y-full inline-block transition-all duration-300 ease-in-out">
				{`${env.NEXT_PUBLIC_NAME} ${env.NEXT_PUBLIC_SURNAME}`
					.split('')
					.map((letter, index) => (
						<span
							key={index}
							className="inline-block"
							style={{ transitionDelay: `${index * 25}ms` }}
						>
							{letter === ' ' ? '\u00A0' : letter}
						</span>
					))}
			</span>
			<span className="absolute top-0 left-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0">
				{'Développeur web'.split('').map((letter, index) => (
					<span
						key={index}
						className="inline-block"
						style={{ transitionDelay: `${index * 25}ms` }}
					>
						{letter === ' ' ? '\u00A0' : letter}
					</span>
				))}
			</span>
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
