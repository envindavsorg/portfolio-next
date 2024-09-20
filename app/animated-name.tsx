import { env } from '@/env/client';
import { Link } from 'next-view-transitions';
import type React from 'react';

export const AnimatedName = (): React.JSX.Element => (
	<Link
		href="/"
		className="fade-in mb-8 flex font-bold font-geist-sans text-3xl text-theme md:text-4xl"
	>
		{env.NEXT_PUBLIC_NAME} {env.NEXT_PUBLIC_SURNAME}
	</Link>
);
