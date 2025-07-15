import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { CV } from '@/components/blocs/CV';
import { FadeInStagger } from '@/components/blocs/FadeIn';
import { Counter } from '@/components/text/Counter';
import PageParagraph from '@/components/text/PageParagraph';
import { wefixAria, wefixUrl, workExpYears } from '@/resources/config';

export const TopText = memo(
	(): React.JSX.Element => (
		<FadeInStagger className="mt-6 flex flex-col gap-y-2" faster>
			<PageParagraph>
				Développeur web full-stack avec{' '}
				<span className="text-foreground">
					<Counter value={workExpYears} /> ans d'expérience
				</span>
				. Je conçois et développe des solutions digitales innovantes, alliant excellence
				technique et design soigné.
			</PageParagraph>

			<CV className="my-4" />

			<PageParagraph>
				Je travaille actuellement chez{' '}
				<Link
					href={wefixUrl}
					aria-label={wefixAria}
					target="_blank"
					rel="noopener noreferrer"
					className="font-medium text-foreground"
					prefetch={false}
				>
					<span className="text-theme">/</span>WeFix
				</Link>
				, leader de la réparation, où je développe des solutions web pour améliorer
				l'expérience utilisateur.
			</PageParagraph>
		</FadeInStagger>
	),
);
