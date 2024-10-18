import { env } from '@/env/client';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import type React from 'react';

const name: string = `${env.NEXT_PUBLIC_NAME} ${env.NEXT_PUBLIC_SURNAME}`;
const profession: string = 'Développeur web';

interface AnimatedNameProps {
	className?: string;
}

export const AnimatedName = ({
	className,
}: AnimatedNameProps): React.JSX.Element => (
	<h1
		className={cn(
			'pt-6 font-bold font-geist-sans text-3xl transition-element sm:pt-12 md:text-4xl',
			className,
		)}
	>
		<span className="sr-only">{name}</span>
		<span className="group relative block overflow-hidden">
			<span className="group-hover:-translate-y-full inline-block transition-all duration-300 ease-in-out">
				{name.split('').map((letter: string, idx: number) => (
					<span
						key={`${letter}-${idx}`}
						className="inline-block"
						style={{
							transitionDelay: `${idx * 25}ms`,
						}}
					>
						{letter === ' ' ? '\u00A0' : letter}
					</span>
				))}
			</span>
			<span className="absolute top-0 left-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0">
				{profession.split('').map((letter, index) => (
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
		</span>
	</h1>
);

interface AnimatedNameLinkProps {
	className?: string;
}

export const AnimatedNameLink = ({
	className,
}: AnimatedNameLinkProps): React.JSX.Element => (
	<Link
		href="/"
		className={cn(
			'fade-in mb-8 flex font-bold font-geist-sans text-3xl text-theme no-underline md:text-4xl',
			className,
		)}
	>
		{name}
	</Link>
);
