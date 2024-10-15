import { TimeDisplay } from '@/components/blocs/TimeDisplay';
import { Status } from '@/components/status/Status';
import { display } from '@/resources/config';
import { type Contact, contact } from '@/resources/contact';
import { Link } from 'next-view-transitions';
import type React from 'react';

export const Footer = (): React.JSX.Element => (
	<footer className="mx-auto mt-12 w-full max-w-[60ch] space-y-2">
		<Status />
		<div className="flex w-full items-center justify-between">
			<div className="flex gap-x-3">
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
