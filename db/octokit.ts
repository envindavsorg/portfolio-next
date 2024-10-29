import { name } from '@/resources/config';
import { Octokit } from 'octokit';

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
