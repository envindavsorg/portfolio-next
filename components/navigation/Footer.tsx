import { Separator } from '@/components/ui/Separator';
import { env } from '@/env/client';
import type React from 'react';

interface Links {
	name: string;
	url: string;
}

export const Footer = (): React.JSX.Element => {
	const links: Links[] = [
		{
			name: 'contact',
			url: '/contact',
		},
		{
			name: 'e-mail',
			url: `mailto:${env.NEXT_PUBLIC_EMAIL}`,
		},
		{
			name: 'linkedin',
			url: `https://www.linkedin.com/in/${env.NEXT_PUBLIC_WEBSITE_PREFIX}`,
		},
		{
			name: 'github',
			url: `https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`,
		},
	];

	return (
		<footer className="mt-12 text-center">
			<div className="flex justify-center space-x-4 tracking-tight">
				{links.map((link) => (
					<a
						key={link.name}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground transition-colors duration-200 hover:text-theme"
					>
						{link.name}
					</a>
				))}
			</div>
			<div className="my-3 flex items-center justify-center">
				<Separator className="w-6" />
			</div>
			<p className="text-sm">
				<span className="font-bold">{new Date().getFullYear()}</span> - Cuzeac
				Florin
			</p>
		</footer>
	);
};
