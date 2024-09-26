'use client';

import type React from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

interface NavBarMobileContextProps {
	isOpen: boolean;
	toggleNavbar: () => void;
}

const NavBarContext = createContext<NavBarMobileContextProps | undefined>(
	undefined,
);

interface NavBarProviderProps {
	children: React.ReactNode;
}

export const NavBarProvider = ({ children }: NavBarProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleNavbar = (): void => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<NavBarContext.Provider value={{ isOpen, toggleNavbar }}>
			{children}
		</NavBarContext.Provider>
	);
};

export const useNavBarMobile = (): NavBarMobileContextProps => {
	const context: NavBarMobileContextProps | undefined =
		useContext(NavBarContext);

	if (!context) {
		throw new Error('useNavbarMobile must be used within a NavbarProvider !');
	}

	return context;
};
