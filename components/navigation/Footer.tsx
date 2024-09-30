import { websiteStatus } from '@/actions/status/status.action';
import { Separator } from '@/components/ui/Separator';
import { type ContactMe, contactMe } from '@/content/ContactMe';
import { env } from '@/env/client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type React from 'react';

export const Footer = async (): Promise<React.JSX.Element> => {
	const { label, color, status } = await websiteStatus(
		env.NEXT_PUBLIC_WEBSITE_PREFIX,
	);

	return (
		<footer className="mt-12 text-center">
			<div className="flex justify-center space-x-4 tracking-tight sm:space-x-6">
				{contactMe
					.slice(0, 4)
					.map(({ name, url, description }: ContactMe, idx: number) => (
						<a
							key={`${idx}-${name}`}
							href={url}
							aria-label={description}
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground transition-colors duration-200 hover:text-theme"
						>
							{name}
						</a>
					))}
			</div>

			<div className="my-3 flex items-center justify-center">
				<Separator className="!bg-foreground w-6" />
			</div>

			<p className="text-sm">
				<span className="font-bold">{new Date().getFullYear()}</span> - Cuzeac
				Florin
			</p>

			<div className="mt-6 inline-flex max-w-fit items-center gap-x-2 sm:gap-x-3">
				<Link
					href="https://cuzeacflorin.openstatus.dev"
					target="_blank"
					rel="noreferrer"
					className="font-semibold text-xs sm:text-sm"
					passHref
				>
					{label}
				</Link>

				<span className="relative flex size-2">
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
						className={cn('relative inline-flex size-2 rounded-full', color)}
					/>
				</span>
			</div>
		</footer>
	);
};
