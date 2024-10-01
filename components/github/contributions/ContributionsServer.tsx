import { contributionsGitHub } from '@/actions/github/contributions.action';
import { githubUser } from '@/actions/github/user.action';
import { ContributionsGraphClient } from '@/components/github/contributions/ContributionsGraphClient';
import { ContributionsTableClient } from '@/components/github/contributions/ContributionsTableClient';
import { env } from '@/env/server';
import { unstable_noStore as noStore } from 'next/cache';
import React from 'react';

export const ContributionsServer = async () => {
	noStore();

	const { login, name, avatar } = await githubUser(env.GITHUB_USERNAME);
	const {
		contributionCalendar: { weeks, colors },
	} = await contributionsGitHub();

	return {
		login,
		name,
		avatar,
		weeks,
		colors,
	};
};

export const ContributionsGraphServer = async () => {
	const { login, name, avatar, weeks, colors } = await ContributionsServer();

	return (
		<ContributionsGraphClient
			weeks={weeks}
			colors={colors}
			login={login}
			name={name}
			avatar={avatar}
		/>
	);
};

export const ContributionsTableServer = async () => {
	const { weeks } = await ContributionsServer();

	return <ContributionsTableClient weeks={weeks} />;
};
