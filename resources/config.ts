// meta
export const baseURL = 'cuzeacflorin.fr' as const;
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

// pages
export const mainTitle = 'Crée, innove, impacte.' as const;
export const genId = '@cuzeacflorin' as const;

// me
export const fullName = 'Cuzeac Florin' as const;
export const fullNameInitials = 'CF' as const;
export const firstName = fullName.trim().split(' ').pop() || ('Florin' as const);
export const workExpYears = 10 as const;
export const workJobTitle = 'développeur front-end et designer UX / UI' as const;
export const personalMail = 'mail@cuzeacflorin.fr' as const;
export const personalPhone = '+33658058665' as const;
const birthYear = 1994 as const;
const date = new Date() as Date;
export const age = date.getFullYear() - birthYear;
export const developerSince = date.getFullYear() - 2018;

// github
export const projectGitHubUrl =
	`https://github.com/${process.env.GITHUB_USERNAME}/portfolio-next/` as const;

// wefix
export const wefixUrl = 'https://wefix.net/' as const;
export const wefixAria = 'Voir le site de WeFix !' as const;

// miaou
export const showCat = {
	enabled: process.env.NODE_ENV === 'production',
};
