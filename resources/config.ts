export const baseURL = 'cuzeac-florin.app' as const;
export const name = 'Cuzeac Florin' as const;
export const title = 'Crée, innove, impacte.' as const;
export const id = '@cuzeacflorin' as const;
export const initials = 'CF' as const;
export const githubUsername = 'envindavsorg' as const;
export const mail = 'florin@cuzeac.com' as const;
export const phone = '+33658058665' as const;

const birthYear = 1994 as const;
export const age = new Date().getFullYear() - birthYear;
export const developerSince = new Date().getFullYear() - 2018;

export const keywords = [
	'next.js',
	'motion',
	'react',
	'javascript',
	'typescript',
	'tailwind css',
	'front-end development',
	'web development',
	'responsive ui',
	'portfolio',
] as const;

// Enable localization
export const i18n = false as const;

// Enable or disable routes
export const routes = {
	'/': true,
	'/work': true,
	'/stack': true,
	'/blog': true,
	'/contact': true,
	'/github': true,
} as const satisfies Record<string, boolean>;

// Manage localized content in the messages folder
export const i18nOptions = {
	// A list of all locales that are supported, e.g. ['en', 'fr']
	locales: ['fr', 'en'],
	// Locale used by default and as a fallback
	defaultLocale: 'fr',
} as const satisfies {
	locales: readonly string[];
	defaultLocale: string;
};

// enable or disable the display of the location and time
export const display = {
	location: true,
	time: true,
} as const satisfies {
	location: boolean;
	time: boolean;
};
