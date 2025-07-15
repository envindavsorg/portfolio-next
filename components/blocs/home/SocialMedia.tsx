import Link from 'next/link';
import type React from 'react';
import { Fragment, memo } from 'react';
import { SubscribersChannel } from '@/components/channels/Subscribers';
import PageParagraph from '@/components/text/PageParagraph';

export const SocialMedia = memo(
	(): React.JSX.Element => (
		<Fragment>
			<PageParagraph>
				Je suis présent sur{' '}
				<Link
					href="https://linkedin.com/"
					className="no-underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					LinkedIn
				</Link>{' '}
				et sur{' '}
				<Link
					href="https://github.com/"
					className="no-underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</Link>
				, n'hésitez pas à me rendre une petite visite sur mes profils et pourquoi pas me
				laisser un message 😃
			</PageParagraph>
			<SubscribersChannel />
		</Fragment>
	),
);
