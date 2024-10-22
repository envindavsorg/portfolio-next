import { Link } from 'next-view-transitions';
import type React from 'react';

export const AnimatedName = (): React.JSX.Element => (
	<Link
		href="/public"
		className="fade-in mb-8 flex font-bold font-geist-sans text-3xl text-theme no-underline md:text-4xl"
	>
		{process.env.NEXT_PUBLIC_FULLNAME}
	</Link>
);
