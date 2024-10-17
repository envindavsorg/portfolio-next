'use client';

import { FadeIn } from '@/components/animations/FadeIn';
import { CV } from '@/components/blocs/CV';
import { SocialLink } from '@/components/links/SocialLink';
import { env } from '@/env/client';
import { display } from '@/resources/config';
import { type Contact, contact } from '@/resources/contact';
import dynamic from 'next/dynamic';
import type React from 'react';
import type { ComponentClass, FunctionComponent } from 'react';

const LocationWidget: ComponentClass<object> | FunctionComponent<object> =
	dynamic(
		() =>
			import('@/components/blocs/LocationWidget').then((mod) => ({
				default: mod.LocationWidget,
			})),
		{ ssr: false },
	);

export const LandingBlock = (): React.JSX.Element => {
	return (
		<div className="flex flex-col items-center gap-6 min-[530px]:flex-row">
			<div className="flex flex-col gap-y-3">
				<FadeIn>
					<p className="leading-8">
						Bonjour, je m'appelle{' '}
						<span className="font-bold text-theme">
							{env.NEXT_PUBLIC_SURNAME}
						</span>
						, j'ai{' '}
						<span className="font-bold">
							{new Date().getFullYear() - 1994} ans
						</span>{' '}
						et j'ai commencé à travailler sur le web en{' '}
						<span className="font-bold">2014</span> et je n'ai jamais arrêté
						depuis.
					</p>
				</FadeIn>

				<FadeIn>
					<CV className="mt-6 sm:mt-3" />
				</FadeIn>

				<FadeIn>
					<div className="mt-6 flex gap-6 sm:mt-3">
						{contact
							.slice(0, 4)
							.map(({ description, url, icon }: Contact, idx: number) => (
								<SocialLink
									key={`${idx}-contact`}
									href={url}
									aria-label={description}
									icon={icon}
									iconProps={{ weight: 'regular' }}
								/>
							))}
					</div>
				</FadeIn>
			</div>

			{display.location && (
				<FadeIn className="mt-3 flex w-full flex-col sm:mt-0">
					<LocationWidget />
				</FadeIn>
			)}
		</div>
	);
};
