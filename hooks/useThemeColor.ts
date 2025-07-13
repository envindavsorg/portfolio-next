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

		// Force immediate body background update for Safari
		document.body.style.backgroundColor = themeColor;

		// Remove existing theme-color meta tags to avoid conflicts
		const existingThemeColorTags = document.querySelectorAll('meta[name="theme-color"]');
		existingThemeColorTags.forEach((tag) => tag.remove());

		// Create new theme-color meta tag
		const themeColorMetaTag = document.createElement('meta');
		themeColorMetaTag.name = 'theme-color';
		themeColorMetaTag.content = themeColor;
		document.head.appendChild(themeColorMetaTag);

		// Add media-specific theme-color meta tags for better browser support
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

		// iOS-specific meta tags for status bar
		let appleStatusBarMetaTag = document.querySelector(
			'meta[name="apple-mobile-web-app-status-bar-style"]',
		) as HTMLMetaElement;

		if (!appleStatusBarMetaTag) {
			appleStatusBarMetaTag = document.createElement('meta');
			appleStatusBarMetaTag.name = 'apple-mobile-web-app-status-bar-style';
			document.head.appendChild(appleStatusBarMetaTag);
		}

		// For iOS, use 'black-translucent' to make status bar match page theme
		// This makes the status bar transparent and inherit the page color
		appleStatusBarMetaTag.content = 'black-translucent';

		// Add msapplication-navbutton-color for Windows Phone
		let msNavButtonColorMetaTag = document.querySelector(
			'meta[name="msapplication-navbutton-color"]',
		) as HTMLMetaElement;

		if (!msNavButtonColorMetaTag) {
			msNavButtonColorMetaTag = document.createElement('meta');
			msNavButtonColorMetaTag.name = 'msapplication-navbutton-color';
			document.head.appendChild(msNavButtonColorMetaTag);
		}

		msNavButtonColorMetaTag.content = themeColor;

		// Update the viewport meta tag to ensure proper rendering
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
