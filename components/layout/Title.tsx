// Copyright Cuzeac Florin 2024. All Rights Reserved.
// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

import { cn } from '@/lib/utils';
import { Minus } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { memo } from 'react';

export type TitleProps = React.HTMLProps<HTMLHeadingElement> & {
	children: React.ReactNode;
	name: string;
	title: string;
	isHome?: boolean;
	className?: string;
};

export const Title: React.FC<TitleProps> = memo(
	({ children, name, title, isHome, className }) => (
		<>
			{!isHome && (
				<p className="fade-in mb-0.5 flex items-center gap-x-2 pt-6 font-hubot font-medium text-sm text-theme sm:pt-12 sm:text-base">
					<Minus />
					{children}
				</p>
			)}
			<h1
				className={cn(
					'font-extrabold font-hubot text-3xl md:text-4xl',
					isHome && 'pt-6 transition-element sm:pt-12',
					!isHome && 'fade-in mb-8',
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
								style={{ transitionDelay: `${idx * 25}ms` }}
							>
								{letter === ' ' ? '\u00A0' : letter}
							</span>
						))}
					</span>
					<span className="absolute top-0 left-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0">
						{title.split('').map((letter: string, idx: number) => (
							<span
								key={idx}
								className="inline-block"
								style={{ transitionDelay: `${idx * 25}ms` }}
							>
								{letter === ' ' ? '\u00A0' : letter}
							</span>
						))}
					</span>
				</span>
			</h1>
			{isHome && (
				<p className="mt-0.5 flex items-center gap-x-2 font-hubot font-medium text-sm text-theme sm:text-base">
					<Minus />
					{children}
				</p>
			)}
		</>
	),
);
