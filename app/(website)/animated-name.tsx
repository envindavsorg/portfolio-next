import { name } from '@/resources/config';
import { Link } from 'next-view-transitions';
import type React from 'react';

export const AnimatedName = (): React.JSX.Element => (
	<Link
		href="/"
		aria-label="Retourner à l'accueil"
		className="fade-in mb-8 flex font-bold font-geist-sans text-3xl text-foreground no-underline md:text-4xl"
	>
		{name}
	</Link>
);
