'use server';

import { logger } from '@/lib/logger';

const headers = {
	'Content-Type': 'application/json',
	Authorization: `token ${process.env.GOGS_TOKEN}`,
	cache: 'no-cache',
};

enum GogsUrls {
	ALL = 'http://152.228.152.104:4000/api/v1/user/repos',
	CLIENT = 'http://152.228.152.104:4000/api/v1/repos/WeFix/site-wefix-client/contents/commit_count.txt',
	WEFIX = 'http://152.228.152.104:4000/api/v1/repos/WeFix/site-wefix/contents/commit_count.txt',
	B2B = 'http://152.228.152.104:4000/api/v1/repos/WeFix/site-b2b/contents/commit_count.txt',
	PARTENAIRES = 'http://152.228.152.104:4000/api/v1/repos/WeFix/partenaires-cli/contents/commit_count.txt',
	ASSURANCES = 'http://152.228.152.104:4000/api/v1/repos/WeFix/site-assurances-pug/contents/commit_count.txt',
	BOUYGUES = 'http://152.228.152.104:4000/api/v1/repos/WeFix/site-bouygues-pug/contents/commit_count.txt',
}

const decodeBase64 = (base64: string): number =>
	Number(Buffer.from(base64, 'base64').toString('utf-8'));

export const gogsStats = async () => {
	if (!process.env.GOGS_TOKEN) {
		logger.error('→ GOGS_TOKEN env variable is not set ...');
		throw new Error('→ GOGS_TOKEN env variable is not set ...');
	}

	const { ALL, CLIENT, WEFIX, B2B, PARTENAIRES, ASSURANCES, BOUYGUES } =
		GogsUrls;

	try {
		const repos: Response = await fetch(ALL, { headers });
		const wefix: Response = await fetch(WEFIX, { headers });
		const client: Response = await fetch(CLIENT, { headers });
		const b2b: Response = await fetch(B2B, { headers });
		const partenaires: Response = await fetch(PARTENAIRES, { headers });
		const assurances: Response = await fetch(ASSURANCES, { headers });
		const bouygues: Response = await fetch(BOUYGUES, { headers });

		const reposData = await repos.json();
		const wefixData = await wefix.json();
		const clientData = await client.json();
		const b2bData = await b2b.json();
		const partenairesData = await partenaires.json();
		const assurancesData = await assurances.json();
		const bouyguesData = await bouygues.json();

		return {
			repositoriesCreated: reposData.length,
			totalCommits:
				decodeBase64(wefixData.content) +
				decodeBase64(clientData.content) +
				decodeBase64(b2bData.content) +
				decodeBase64(partenairesData.content) +
				decodeBase64(assurancesData.content) +
				decodeBase64(bouyguesData.content),
		};
	} catch (error) {
		logger.error('→ there is an error fetching GOGS stats: ', error);
		throw new Error('→ failed to fetch GOGS stats ...');
	}
};
