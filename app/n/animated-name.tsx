import { env } from '@/env/client';
import { Link } from 'next-view-transitions';
import type React from 'react';

export const AnimatedName = (): React.JSX.Element => (
	<Link
		href="/"
		className="fade-in mb-8 flex font-bold text-2xl text-gray-400 md:text-3xl"
	>
		{env.NEXT_PUBLIC_FULL_NAME}
	</Link>
);
