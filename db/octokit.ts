import { Octokit } from 'octokit';
import { name } from '@/resources/config';

export const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
	userAgent: `Mon portfolio - ${name}`,
	timeZone: 'UTC',
	log: {
		debug: (): void => {},
		info: (): void => {},
		warn: console.warn,
		error: console.error,
	},
});
