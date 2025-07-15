import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { FadeIn } from '@/components/blocs/FadeIn';
import { StarsChannelForDesign } from '@/components/channels/Stars';
import PageParagraph from '@/components/text/PageParagraph';
import { BadgeWithIcon } from '@/components/ui/Badge';

export const StackDesign = memo(
	(): React.JSX.Element => (
		<FadeIn className="flex flex-col gap-y-4">
			<PageParagraph>
				Pour le design de mes applications, je commence par maîtriser{' '}
				<BadgeWithIcon type="css" /> avant d'adopter{' '}
				<Link
					href="https://tailwindcss.com/"
					aria-label="Voir le site de Tailwind !"
					target="_blank"
					rel="noopener noreferrer"
				>
					<BadgeWithIcon type="tailwind" />
				</Link>
				, un framework de styling modulaire et performant. Tailwind accélère le
				développement grâce à sa vaste collection de classes utilitaires et sa
				personnalisation simple, tout en garantissant des interfaces cohérentes et
				évolutives. J'intègre ensuite{' '}
				<Link
					href="https://ui.shadcn.com/"
					aria-label="Voir le site de shadcn/ui !"
					target="_blank"
					rel="noopener noreferrer"
				>
					<BadgeWithIcon type="shadcn" />
				</Link>
				, une bibliothèque de composants React flexible et accessible.
			</PageParagraph>
			<StarsChannelForDesign />
		</FadeIn>
	),
);
