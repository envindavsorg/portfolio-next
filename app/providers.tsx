'use client';

import useThemeColor from '@/hooks/useThemeColor';
import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { type MutableRefObject, createContext, useEffect, useRef } from 'react';

const usePrevious = <T,>(value: T) => {
	const ref: MutableRefObject<T | undefined> = useRef<T>();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};

interface AppContextProps {
	previousPathname?: string;
}

export const AppContext = createContext<AppContextProps>({});

interface AppProviderProps {
	children: React.ReactNode;
}

export const Providers = ({ children }: AppProviderProps) => {
	useThemeColor();

	const pathname: string = usePathname();
	const previousPathname: string | undefined = usePrevious(pathname);

	return (
		<AppContext.Provider value={{ previousPathname }}>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</AppContext.Provider>
	);
};
