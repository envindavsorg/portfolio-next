import { TimeDisplay } from '@/components/blocs/TimeDisplay';
import { display } from '@/resources/config';
import { type Contact, contact } from '@/resources/contact';
import { Link } from 'next-view-transitions';
import type React from 'react';

export const Footer = (): React.JSX.Element => (
	<footer className="mx-auto w-full max-w-[60ch] pt-20">
		<div className="flex items-center justify-between">
			<div className="ml-[5px] flex gap-x-3">
				{contact
					.slice(0, 3)
					.map(({ name, url, description }: Contact, idx: number) => (
						<Link
							key={`${idx}-${name}`}
							href={url}
							aria-label={description}
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground text-sm no-underline transition-colors duration-200 hover:text-theme hover:underline"
						>
							{name}
						</Link>
					))}
			</div>
			{display.time && <TimeDisplay timeZone="Europe/Paris" />}
		</div>
	</footer>
);
