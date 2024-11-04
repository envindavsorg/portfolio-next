export const baseURL: string = 'cuzeac-florin.app';
export const name: string = 'Cuzeac Florin';
export const title: string = 'Développeur web';
export const id: string = '@cuzeacflorin';
export const initials: string = 'CF';
export const githubUsername: string = 'envindavsorg';
export const mail: string = 'florin@cuzeac.com';
export const phone: string = '+33658058665';

const birthYear: number = 1994;
export const age: number = new Date().getFullYear() - birthYear;
export const developerSince: number = new Date().getFullYear() - 2018;

export const keywords: string[] = [
	'next.js',
	'framer motion',
	'react',
	'javascript',
	'typescript',
	'tailwind css',
	'front-end development',
	'web development',
	'responsive ui',
	'portfolio',
];

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
