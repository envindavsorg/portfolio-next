import { Octokit } from 'octokit';

export const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
	userAgent: 'Mon portfolio - Cuzeac Florin',
	timeZone: 'UTC',
	log: {
		debug: (): void => {},
		info: (): void => {},
		warn: console.warn,
		error: console.error,
	},
});
