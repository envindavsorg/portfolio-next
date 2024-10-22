import { githubUser } from '@/actions/github/user.action';
import { Contributions } from '@/elements/github/Contributions';
import { unstable_noStore as noStore } from 'next/cache';
import type React from 'react';
import { Fragment, Suspense } from 'react';

interface GitHubGraphProps {
	className?: string;
}

export const GitHubGraph = async ({
	className,
}: GitHubGraphProps): Promise<React.JSX.Element> => {
	noStore();
	const {
		login,
		name,
		avatar,
		commits: {
			all: {
				contributionCalendar: { weeks, colors },
			},
		},
	} = await githubUser(process.env.GITHUB_USERNAME!);

	return (
		<Fragment>
			<Suspense>
				<Contributions
					weeks={weeks}
					colors={colors}
					login={login}
					name={name}
					avatar={avatar}
					className={className}
				/>
			</Suspense>
		</Fragment>
	);
};
