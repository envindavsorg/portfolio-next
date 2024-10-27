'use server';

import { logger } from '@/lib/logger';
import { unstable_noStore as noStore } from 'next/cache';

export interface GogsStats {
	id: number;
	owner: {
		id: number;
		username: string;
		login: string;
		full_name: string;
		email: string;
		avatar_url: string;
	};
	name: string;
	full_name: string;
	description: string;
	private: boolean;
	fork: boolean;
	parent: string;
	empty: boolean;
	mirror: boolean;
	size: number;
	html_url: string;
	ssh_url: string;
	clone_url: string;
	website: string;
	stars_count: number;
	forks_count: number;
	watchers_count: number;
	open_issues_count: number;
	default_branch: string;
	created_at: string;
	updated_at: string;
	permissions: {
		admin: boolean;
		push: boolean;
		pull: boolean;
	};
}

const headers = {
	'Content-Type': 'application/json',
	Authorization: `token ${process.env.GOGS_TOKEN}`,
};

export const gogsStats = async (url: string): Promise<GogsStats[]> => {
	noStore();

	if (!url) {
		logger.error('→ url parameter is required !');
		throw new Error('→ GOGS_URL env variable is not set ...');
	}

	try {
		const response: Response = await fetch(url, {
			headers,
			cache: 'no-cache',
		});

		return response.json();
	} catch (error) {
		logger.error('→ there is an error fetching GOGS stats: ', error);
		throw new Error('→ failed to fetch GOGS stats ...');
	}
};
