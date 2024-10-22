import { wakatimeStats } from '@/actions/wakatime/stats.action';
import { FadeIn } from '@/components/animations/FadeIn';
import { UsedLanguagesCharts } from '@/elements/stack/UsedLanguagesCharts';
import { env } from '@/env/server';
import { unstable_noStore as noStore } from 'next/cache';
import React, { Fragment } from 'react';

export const UsedLanguages = async () => {
	noStore();
	const { data } = await wakatimeStats(env.WAKATIME_DATA_URL);

	return (
		<Fragment>
			<FadeIn>
				<p className="leading-8">
					Les langages que j'ai le plus utilisé cette semaine, sont les suivants
					(en pourcentage d'utilisation) :
				</p>
			</FadeIn>

			<UsedLanguagesCharts languages={data.languages} />
		</Fragment>
	);
};
