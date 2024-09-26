'use client';

import useThemeColor from '@/hooks/useThemeColor';
import { ThemeProvider as Provider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import type React from 'react';

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
	useThemeColor();

	return <Provider {...props}>{children}</Provider>;
};
