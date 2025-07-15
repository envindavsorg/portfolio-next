'use client';

import {
	ThemeProvider as Provider,
	type ThemeProviderProps,
	useTheme,
} from 'next-themes';
import type React from 'react';
import { useEffect } from 'react';

const setCookie = (
	name: string,
	value: string,
	options: { path?: string; maxAge?: number } = {},
) => {
	const { path = '/', maxAge = 31536000 } = options;
	document.cookie = `${name}=${value}; path=${path}; max-age=${maxAge}`;
};

const AppThemeProviderHelper = () => {
	const { theme } = useTheme();

	useEffect(() => {
		if (theme) {
			setCookie('theme', theme);
		}
	}, [theme]);

	return null;
};

export const ThemeProvider = ({
	children,
	...props
}: ThemeProviderProps): React.JSX.Element => (
	<Provider {...props}>
		<AppThemeProviderHelper />
		{children}
	</Provider>
);
