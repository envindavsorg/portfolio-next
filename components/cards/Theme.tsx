'use client';

import { CloudMoonIcon, SunIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useEffect, useState } from 'react';
import { defaultVariantsNoDelay } from '@/components/motion.variants';
import { cn } from '@/lib/utils';

const ThemeCardComponent = (): React.JSX.Element => {
	const { systemTheme, theme, setTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined);

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

	const getThemeIcon = (): React.ReactElement =>
		currentTheme === 'dark' ? (
			<SunIcon weight="duotone" className="text-3xl" />
		) : (
			<CloudMoonIcon weight="duotone" className="text-3xl" />
		);

	return (
		<motion.div
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.05 }}
			onClick={toggleTheme}
			className={cn(
				'col-span-2 row-span-1 md:col-span-1 md:col-start-5 md:row-span-1 md:row-start-3',
				'relative flex items-center justify-center overflow-hidden p-4 font-mono tabular-nums',
				'isolate cursor-pointer rounded-xl bg-white/20 ring-1 ring-black/5 dark:bg-white/10',
				'border border-neutral-200/50 dark:border-neutral-700/50',
			)}
		>
			{getThemeIcon()}
		</motion.div>
	);
};

export const ThemeCard: React.MemoExoticComponent<() => React.JSX.Element> =
	memo(ThemeCardComponent);
