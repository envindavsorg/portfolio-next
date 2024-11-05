// Copyright Cuzeac Florin 2024. All Rights Reserved.
// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

'use client';

import { FadeIn } from '@/components/animations/FadeIn';
import { display } from '@/resources/config';
import dynamic from 'next/dynamic';
import type React from 'react';

const LocationWidget = dynamic(
	() =>
		import('@/components/widgets/index').then((mod) => ({
			default: mod.LocationWidget,
		})),
	{
		ssr: false,
	},
);

export const Location = (): React.JSX.Element => (
	<>
		{display.location && (
			<FadeIn className="mt-3 flex w-full flex-col sm:mt-0">
				<LocationWidget />
			</FadeIn>
		)}
	</>
);
