import { Octokit } from 'octokit';
import { fullName } from '@/resources/config';

export const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
	userAgent: `Mon portfolio - ${fullName}`,
	timeZone: 'UTC',
	log: {
		debug: (): void => {},
		info: (): void => {},
		warn: console.warn,
		error: console.error,
	},
});
