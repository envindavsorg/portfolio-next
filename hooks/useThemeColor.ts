import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const useThemeColor = (): void => {
	const { systemTheme, theme } = useTheme();
	const currentTheme: string | undefined =
		theme === 'system' ? systemTheme : theme;

	useEffect(() => {
		const updateThemeColor = (theme: string | undefined) => {
			let themeColorMetaTag = document.querySelector(
				'meta[name="theme-color"]',
			) as HTMLMetaElement;

			if (!themeColorMetaTag) {
				themeColorMetaTag = document.createElement('meta');
				themeColorMetaTag.name = 'theme-color';

				document.head.appendChild(themeColorMetaTag);
			}

			themeColorMetaTag.content = theme === 'dark' ? '#000000' : '#FAFAFA';
		};

		updateThemeColor(currentTheme);
	}, [currentTheme]);
};

export default useThemeColor;
