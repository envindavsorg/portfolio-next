import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { dark, light } from '@/resources/theme';

const useThemeColor = (): void => {
	const { systemTheme, theme } = useTheme();
	const currentTheme: string | undefined = theme === 'system' ? systemTheme : theme;

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
