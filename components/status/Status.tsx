import { websiteStatus } from '@/actions/status/status.action';
import { CardTemplate } from '@/components/status/CardTemplate';
import { Button } from '@/components/ui/Button';
import { env } from '@/env/client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type React from 'react';

interface StatusProps {
	className?: string;
}

export const Status = async ({
	className,
}: StatusProps): Promise<React.JSX.Element> => {
	const { label, color, text, status } = await websiteStatus(
		env.NEXT_PUBLIC_WEBSITE_PREFIX,
	);

	return (
		<Link
			href="https://cuzeacflorin.openstatus.dev"
			target="_blank"
			rel="noreferrer"
			passHref
			className={cn(className, 'no-underline')}
		>
			<CardTemplate
				className="flex items-center justify-between p-3 sm:px-6"
				noPadding
			>
				<div className="flex items-center gap-x-3 sm:gap-x-4">
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
					<div className="flex flex-col gap-y-1">
						<p className={cn('font-bold font-geist-sans text-sm', text)}>
							{label}
						</p>
						<p className="text-muted-foreground text-xs">
							{env.NEXT_PUBLIC_WEBSITE_URL}
						</p>
					</div>
				</div>
				<Button size="sm" variant="outline" className="font-bold text-xs">
					Voir
				</Button>
			</CardTemplate>
		</Link>
	);
};
