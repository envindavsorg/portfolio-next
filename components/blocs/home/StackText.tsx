import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { FadeIn } from '@/components/blocs/FadeIn';
import PageParagraph from '@/components/text/PageParagraph';
import { BadgeWithIcon } from '@/components/ui/Badge';

export const StackText = memo(
	(): React.JSX.Element => (
		<FadeIn asChild>
			<PageParagraph>
				J'ai ensuite maîtrisé des frameworks tels que{' '}
				<Link
					href="https://react.dev/"
					aria-label="Voir le site de React !"
					target="_blank"
					rel="noopener noreferrer"
				>
					<BadgeWithIcon type="react" />
				</Link>{' '}
				<Link
					href="https://nextjs.org/"
					aria-label="Voir le site de Next.js !"
					target="_blank"
					rel="noopener noreferrer"
				>
					<BadgeWithIcon type="next" />
				</Link>{' '}
				et{' '}
				<Link
					href="https://vuejs.org/"
					aria-label="Voir le site de Vue !"
					target="_blank"
					rel="noopener noreferrer"
				>
					<BadgeWithIcon type="vue" />
				</Link>{' '}
				tout en adoptant{' '}
				<Link
					href="https://www.typescriptlang.org/"
					aria-label="Voir le site de TypeScript !"
					target="_blank"
					rel="noopener noreferrer"
				>
					<BadgeWithIcon type="ts" />
				</Link>
				, ce qui m'a permis de concevoir des applications performantes et maintenables.
			</PageParagraph>
		</FadeIn>
	),
);
