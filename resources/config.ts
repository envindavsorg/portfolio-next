export const baseURL: string = 'cuzeac-florin.app';

// Enable localization
export const i18n: boolean = false;

// Enable or disable routes
export const routes = {
	'/': true,
	'/work': true,
	'/stack': true,
	'/blog': true,
	'/contact': true,
	'/github': true,
} as const;

// Manage localized content in the messages folder
type Options = {
	locales: string[];
	defaultLocale: string;
};

export const i18nOptions: Options = {
	// A list of all locales that are supported, e.g. ['en', 'fr']
	locales: ['fr', 'en'],
	// Locale used by default and as a fallback
	defaultLocale: 'fr',
};

// enable or disable the display of the location and time
type Display = {
	location: boolean;
	time: boolean;
};

export const display: Display = {
	location: true,
	time: true,
};
