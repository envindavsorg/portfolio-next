import { websiteStatus } from '@/actions/status/status.action';
import { TimeDisplay } from '@/components/blocs/TimeDisplay';
import { CommandMenu } from '@/components/command/CommandMenu';
import { ThemeSwitch } from '@/components/theme/ThemeSwitch';
import { Separator } from '@/components/ui/Separator';
import { env } from '@/env/client';
import { cn } from '@/lib/utils';
import { display } from '@/resources/config';
import { type Contact, contact } from '@/resources/contact';
import { Link } from 'next-view-transitions';
import type React from 'react';

export const Footer = async (): Promise<React.JSX.Element> => {
	const { label, color, text, status } = await websiteStatus(
		env.NEXT_PUBLIC_WEBSITE_PREFIX,
	);

	return (
		<footer className="mx-auto mt-16 w-full max-w-[60ch]">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-x-2">
					<span className="relative flex size-3">
						{status === 'operational' ? (
							<span
								className={cn(
									'absolute inline-flex size-full rounded-full',
									'animate-ping opacity-75 duration-1000',
									color,
								)}
							/>
						) : null}
						<span
							className={cn('relative inline-flex size-3 rounded-full', color)}
						/>
					</span>
					<p className={cn('font-bold font-geist-sans text-sm', text)}>
						{label}
					</p>
				</div>
				{display.time && <TimeDisplay timeZone="Europe/Paris" />}
			</div>

			<Separator className="my-4" />

			<div className="flex w-full items-center justify-between">
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

				<div className="relative flex items-center justify-between gap-x-3">
					<CommandMenu />
					<ThemeSwitch />
				</div>
			</div>
		</footer>
	);
};
