import Script from 'next/script';
import type React from 'react';
import { showCat } from '@/resources/config';

export const OnekoCat = (): React.JSX.Element | null =>
	showCat.enabled ? (
		<Script src="/oneko/oneko.js" data-cat="/oneko/oneko.gif" strategy="lazyOnload" />
	) : null;
