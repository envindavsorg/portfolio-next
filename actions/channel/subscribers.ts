'use server';

import type { StaticImageData } from 'next/image';
import { githubUser } from '@/actions/github/user.action';
import { logger } from '@/lib/logger';

export interface ChannelSubscribersData {
	avatar: string | StaticImageData;
	name: string;
	link: string;
	metric: number;
	icon: string;
}

export const channelSubscribers = async (): Promise<ChannelSubscribersData[]> => {
	try {
		const { avatar, login, followers, following } = await githubUser(
			process.env.GITHUB_USERNAME!,
		);

		return [
			{
				avatar,
				name: `@${login}`,
				link: `https://github.com/${login}`,
				metric: followers + following,
				icon: 'github',
			},
			{
				avatar: '/og-author.png',
				name: 'Florin Cuzeac',
				link: 'https://www.linkedin.com/in/cuzeacflorin',
				metric: 2414,
				icon: 'linkedin',
			},
		];
	} catch (error) {
		logger.error('→ there is an error fetching GitHub project data: ', error);
		throw new Error('→ failed to fetch GitHub project data ...');
	}
};
