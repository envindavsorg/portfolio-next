import { websiteStatus } from '@/actions/status/status.action';
import { CardTemplate } from '@/components/status/CardTemplate';
import { Button } from '@/components/ui/Button';
import { env } from '@/env/client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type React from 'react';

export const Status = async (): Promise<React.JSX.Element> => {
	const { label, color, text, status } = await websiteStatus(
		env.NEXT_PUBLIC_WEBSITE_PREFIX,
	);

	return (
		<Link
			href="https://cuzeacflorin.openstatus.dev"
			target="_blank"
			rel="noreferrer"
			passHref
		>
			<CardTemplate
				className="flex items-center justify-between p-3 sm:px-6"
				noPadding
			>
				<div className="flex items-center gap-x-3">
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
					<p className={cn('font-geist-sans font-medium text-sm', text)}>
						{label}
					</p>
				</div>
				<Button size="sm" variant="outline" className="font-bold text-xs">
					Voir
				</Button>
			</CardTemplate>
		</Link>
	);
};
