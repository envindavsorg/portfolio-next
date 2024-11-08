import { wakatimeStats } from '@/actions/wakatime/stats.action';
import { Paragraph } from '@/components/layout/Paragraph';
import { UsedLanguagesCharts } from '@/components/stack/UsedLanguagesCharts';
import { unstable_noStore as noStore } from 'next/cache';
import React, { Fragment } from 'react';

export const UsedLanguages = async () => {
	noStore();
	const { data } = await wakatimeStats(process.env.WAKATIME_DATA_URL!);

	return (
		<Fragment>
			<Paragraph>
				Les langages que j'ai le plus utilisé cette semaine, sont les suivants
				(en pourcentage d'utilisation) :
			</Paragraph>
			<UsedLanguagesCharts languages={data.languages} />
		</Fragment>
	);
};
