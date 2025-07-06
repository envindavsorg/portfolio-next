'use client';

import {
	ThemeProvider as Provider,
	type ThemeProviderProps,
	useTheme,
} from 'next-themes';
import { useEffect } from 'react';

const AppThemeProviderHelper = () => {
	const { theme } = useTheme();

	useEffect(() => {
		if (theme) {
			document.cookie = `theme=${theme}; path=/; max-age=31536000`;
		}
	}, [theme]);

	return null;
};

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
	<Provider {...props}>
		<AppThemeProviderHelper />
		{children}
	</Provider>
);
