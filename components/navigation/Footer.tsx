import { Separator } from '@/components/ui/Separator';
import { type ContactMe, contactMe } from '@/content/ContactMe';
import { Link } from 'next-view-transitions';
import type React from 'react';

export const Footer = (): React.JSX.Element => (
	<footer className="mt-12 text-center">
		<div className="flex justify-center space-x-4 tracking-tight sm:space-x-6">
			{contactMe
				.slice(0, 4)
				.map(({ name, url, description }: ContactMe, idx: number) => (
					<Link
						key={`${idx}-${name}`}
						href={url}
						aria-label={description}
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground no-underline transition-colors duration-200 hover:text-theme"
					>
						{name}
					</Link>
				))}
		</div>

		<div className="my-3 flex items-center justify-center">
			<Separator className="!bg-foreground w-6" />
		</div>

		<p className="text-sm">
			<span className="font-bold">{new Date().getFullYear()}</span> - Cuzeac
			Florin
		</p>
	</footer>
);
