'use server';

import { githubUser } from '@/actions/github/user.action';
import { logger } from '@/lib/logger';
import { unstable_noStore as noStore } from 'next/cache';

const headers = {
	'Content-Type': 'application/json',
	Authorization: `token ${process.env.GOGS_TOKEN}`,
};

export const gogsStats = async (url: string) => {
	noStore();

	if (!url) {
		logger.error('→ url parameter is required !');
		throw new Error('→ GOGS_URL env variable is not set ...');
	}

	try {
		const { commits } = await githubUser(process.env.GITHUB_USERNAME!);
		const response: Response = await fetch(url, {
			headers,
			cache: 'no-cache',
		});
		const data: Response[] = await response.json();

		return {
			projectsCreated: data.length,
			wefixCommits: commits.thisYear * (data.length / 5) * 0.7,
		};
	} catch (error) {
		logger.error('→ there is an error fetching GOGS stats: ', error);
		throw new Error('→ failed to fetch GOGS stats ...');
	}
};
