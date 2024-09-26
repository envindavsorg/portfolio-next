'use client';

import type React from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

interface NavbarMobileContextProps {
	isOpen: boolean;
	toggleNavbar: () => void;
}

const NavbarContext = createContext<NavbarMobileContextProps | undefined>(
	undefined,
);

interface NavbarProviderProps {
	children: React.ReactNode;
}

export const NavbarProvider = ({ children }: NavbarProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleNavbar = (): void => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<NavbarContext.Provider value={{ isOpen, toggleNavbar }}>
			{children}
		</NavbarContext.Provider>
	);
};

export const useNavbarMobile = (): NavbarMobileContextProps => {
	const context: NavbarMobileContextProps | undefined =
		useContext(NavbarContext);

	if (!context) {
		throw new Error('useNavbarMobile must be used within a NavbarProvider !');
	}

	return context;
};
