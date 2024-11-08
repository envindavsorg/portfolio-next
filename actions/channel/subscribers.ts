'use server';

import { githubUser } from '@/actions/github/user.action';
import { logger } from '@/lib/logger';
import type { StaticImageData } from 'next/image';

export interface ChannelSubscribersData {
	avatar: string | StaticImageData;
	name: string;
	link: string;
	metric: number;
	icon: string;
}

export const channelSubscribers = async (): Promise<
	ChannelSubscribersData[]
> => {
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
				avatar:
					'https://media.licdn.com/dms/image/v2/D4E03AQGMBLwqpxHRGA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1715716598040?e=1736380800&v=beta&t=hksHAUUltYsAhm_vvQk7W0azVMQKy3WKi0waGCZvEBs',
				name: 'Florin Cuzeac',
				link: 'https://www.linkedin.com/in/cuzeacflorin',
				metric: 2327,
				icon: 'linkedin',
			},
		];
	} catch (error) {
		logger.error('→ there is an error fetching GitHub project data: ', error);
		throw new Error('→ failed to fetch GitHub project data ...');
	}
};
