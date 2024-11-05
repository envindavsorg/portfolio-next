// Copyright Cuzeac Florin 2024. All Rights Reserved.
// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

import { dark, light } from '@/resources/theme';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const useThemeColor = (): void => {
	const { systemTheme, theme } = useTheme();
	const currentTheme: string | undefined =
		theme === 'system' ? systemTheme : theme;

	useEffect((): void => {
		const updateThemeColor = (theme: string | undefined): void => {
			let themeColorMetaTag = document.querySelector(
				'meta[name="theme-color"]',
			) as HTMLMetaElement;

			if (!themeColorMetaTag) {
				themeColorMetaTag = document.createElement('meta');
				themeColorMetaTag.name = 'theme-color';

				document.head.appendChild(themeColorMetaTag);
			}

			themeColorMetaTag.content = theme === 'dark' ? dark : light;
		};

		updateThemeColor(currentTheme);
	}, [currentTheme]);
};

export default useThemeColor;
