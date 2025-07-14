import Script from 'next/script';
import type React from 'react';

export const OnekoCat = (): React.JSX.Element => (
	<Script src="./oneko/oneko.js" data-cat="./oneko/oneko.gif" />
);
