'use client';

import { usePathname } from 'next/navigation';
import type React from 'react';
import { type RefObject, createContext, useEffect, useRef } from 'react';

const usePrevious = <T,>(value: T) => {
	const ref: RefObject<T | undefined> = useRef<T>(undefined);

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
	const pathname: string = usePathname();
	const previousPathname: string | undefined = usePrevious(pathname);

	return (
		<AppContext.Provider value={{ previousPathname }}>
			{children}
		</AppContext.Provider>
	);
};
