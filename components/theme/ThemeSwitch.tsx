'use client';

import { Button } from '@/components/ui/Button';
import { CloudMoon, Sun } from '@phosphor-icons/react';
import { type Variants, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React, { useEffect, useMemo, useState } from 'react';

interface ThemeSwitchProps {
	size?: number;
}

export const ThemeSwitch = ({ size = 18 }: ThemeSwitchProps) => {
	const { systemTheme, theme, setTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState<string | undefined>(
		undefined,
	);

	useEffect(() => {
		setCurrentTheme(theme === 'system' ? systemTheme : theme);
	}, [theme, systemTheme]);

	const toggleTheme = (): void => {
		if (currentTheme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	const variants: Variants = useMemo(() => {
		return {
			dark: {
				x: 0,
			},
			light: {
				x: size * -1,
			},
		};
	}, [size]);

	return (
		<Button
			onClick={toggleTheme}
			variant="ghost"
			size="icon"
			className="z-20 flex shrink-0 rounded-none"
			aria-labelledby="Activer ou désactiver le thème clair ou sombre sur le site"
			aria-label="Activer ou désactiver le thème clair ou sombre sur le site"
		>
			<div
				className="cursor-pointer overflow-hidden"
				style={{ width: size, height: size }}
			>
				{currentTheme && (
					<motion.div
						animate={currentTheme}
						variants={variants}
						className="flex *:shrink-0"
					>
						<Sun size={size} weight="duotone" />
						<CloudMoon size={size} weight="duotone" />
					</motion.div>
				)}
			</div>

			<span className="sr-only">
				Activer ou désactiver le thème clair ou sombre sur le site ...
			</span>
		</Button>
	);
};
