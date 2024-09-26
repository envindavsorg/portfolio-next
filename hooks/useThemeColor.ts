import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const useThemeColor = (): void => {
	const { resolvedTheme } = useTheme();

	useEffect(() => {
		const updateThemeColor = (theme: string) => {
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

		updateThemeColor(resolvedTheme!);
	}, [resolvedTheme]);
};

export default useThemeColor;
