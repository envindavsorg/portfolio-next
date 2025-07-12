export const baseURL = 'cuzeacflorin.fr' as const;
export const name = 'Cuzeac Florin' as const;
export const title = 'Crée, innove, impacte.' as const;
export const id = '@cuzeacflorin' as const;
export const initials = 'CF' as const;
export const githubUsername = 'envindavsorg' as const;
export const mail = 'florin@cuzeac.com' as const;
export const phone = '+33658058665' as const;

const birthYear = 1994 as const;
const date = new Date() as Date;
export const age = date.getFullYear() - birthYear;
export const developerSince = date.getFullYear() - 2018;

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
