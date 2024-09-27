import { visitorsCount } from '@/actions/analytics/umami.action';
import { contributionsGitHub } from '@/actions/github/contributions.action';
import { githubUser } from '@/actions/github/user.action';
import { websiteStatus } from '@/actions/status/status.action';
import { wakatimeStats } from '@/actions/wakatime/stats.action';
import { BentoItem } from '@/components/bento/BentoItem';
import { AnalyticsWidget } from '@/components/widgets/AnalyticsWidget';
import { CodeTimeWidget } from '@/components/widgets/CodeTimeWidget';
import { GitHubWidget } from '@/components/widgets/GitHubWidget';
import { LocationWidget } from '@/components/widgets/LocationWidget';
import { env } from '@/env/client';
import { cn } from '@/lib/utils';
import { unstable_noStore as noStore } from 'next/cache';
import type React from 'react';

const WebsiteAnalytics = async () => {
	noStore();

	const { visitors, visits, pageviews } = await visitorsCount();
	const { label, color, status } = await websiteStatus(
		env.NEXT_PUBLIC_WEBSITE_PREFIX,
	);

	return (
		<BentoItem className="!rotate-2" position={1} delay={0.25} inView>
			<AnalyticsWidget
				visits={visits.value}
				visitors={visitors.value}
				pageViews={pageviews.value}
				stats={{
					slug: 'cuzeacflorin',
					label,
					color,
					status,
				}}
			/>
		</BentoItem>
	);
};

const CodingTimeChart = async () => {
	noStore();

	const {
		data: { code_time_charts, best_day },
	} = await wakatimeStats();

	return (
		<BentoItem className="!-rotate-2" position={2} delay={0.35} inView>
			<CodeTimeWidget content={code_time_charts} best={best_day} />
		</BentoItem>
	);
};

const GithubProfileData = async () => {
	noStore();

	const { login, name, avatar } = await githubUser();
	const {
		contributionCalendar: { weeks, colors },
	} = await contributionsGitHub();

	return (
		<BentoItem className="!rotate-2" position={3} delay={0.45} inView>
			<GitHubWidget
				weeks={weeks}
				colors={colors}
				login={login}
				name={name}
				avatar={avatar}
			/>
		</BentoItem>
	);
};

const CityLocation = () => {
	const {
		NEXT_PUBLIC_COUNTRY_LOCATION: country,
		NEXT_PUBLIC_CITY_LOCATION: city,
		NEXT_PUBLIC_CITY_LATITUDE: latitude,
		NEXT_PUBLIC_CITY_LONGITUDE: longitude,
	} = env;

	return (
		<BentoItem className="!-rotate-2" position={4} delay={0.55} inView>
			<LocationWidget
				country={country}
				city={city}
				latitude={latitude}
				longitude={longitude}
			/>
		</BentoItem>
	);
};

export const Bento = (): React.JSX.Element => (
	<div
		className={cn(
			'flex w-full gap-7 xl:justify-center xl:gap-14',
			'-my-4 px-5 py-4 sm:px-8',
			'scrollbar-hide overflow-y-auto',
		)}
	>
		<WebsiteAnalytics />
		<CodingTimeChart />
		<GithubProfileData />
		<CityLocation />
	</div>
);
