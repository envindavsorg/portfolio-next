import { useTheme } from 'next-themes';
import { useCallback, useEffect } from 'react';
import { dark, light } from '@/resources/theme';

const useThemeColor = (): void => {
	const { systemTheme, theme, resolvedTheme } = useTheme();
	const currentTheme: string | undefined =
		resolvedTheme || (theme === 'system' ? systemTheme : theme);

	const updateThemeColor = useCallback((theme: string | undefined): void => {
		if (typeof document === 'undefined') return;
		const themeColor = theme === 'dark' ? dark : light;

		document.body.style.backgroundColor = themeColor;

		const existingThemeColorTags = document.querySelectorAll('meta[name="theme-color"]');
		existingThemeColorTags.forEach((tag) => tag.remove());

		const themeColorMetaTag = document.createElement('meta');
		themeColorMetaTag.name = 'theme-color';
		themeColorMetaTag.content = themeColor;
		document.head.appendChild(themeColorMetaTag);

		const lightThemeColorTag = document.createElement('meta');
		lightThemeColorTag.name = 'theme-color';
		lightThemeColorTag.media = '(prefers-color-scheme: light)';
		lightThemeColorTag.content = light;
		document.head.appendChild(lightThemeColorTag);

		const darkThemeColorTag = document.createElement('meta');
		darkThemeColorTag.name = 'theme-color';
		darkThemeColorTag.media = '(prefers-color-scheme: dark)';
		darkThemeColorTag.content = dark;
		document.head.appendChild(darkThemeColorTag);

		let appleStatusBarMetaTag = document.querySelector(
			'meta[name="apple-mobile-web-app-status-bar-style"]',
		) as HTMLMetaElement;

		if (!appleStatusBarMetaTag) {
			appleStatusBarMetaTag = document.createElement('meta');
			appleStatusBarMetaTag.name = 'apple-mobile-web-app-status-bar-style';
			document.head.appendChild(appleStatusBarMetaTag);
		}

		appleStatusBarMetaTag.content = 'black-translucent';

		let msNavButtonColorMetaTag = document.querySelector(
			'meta[name="msapplication-navbutton-color"]',
		) as HTMLMetaElement;

		if (!msNavButtonColorMetaTag) {
			msNavButtonColorMetaTag = document.createElement('meta');
			msNavButtonColorMetaTag.name = 'msapplication-navbutton-color';
			document.head.appendChild(msNavButtonColorMetaTag);
		}

		msNavButtonColorMetaTag.content = themeColor;

		const viewportMetaTag = document.querySelector(
			'meta[name="viewport"]',
		) as HTMLMetaElement;

		if (viewportMetaTag) {
			const currentViewport = viewportMetaTag.content;
			if (!currentViewport.includes('viewport-fit=cover')) {
				viewportMetaTag.content = `${currentViewport}, viewport-fit=cover`;
			}
		}
	}, []);

	useEffect((): void => {
		updateThemeColor(currentTheme);
	}, [currentTheme, updateThemeColor]);
};

export default useThemeColor;
