import { unstable_noStore as noStore } from 'next/cache';
import React, { Fragment } from 'react';
import { wakatimeStats } from '@/actions/wakatime/stats.action';
import { UsedLanguagesCharts } from '@/components/stack/UsedLanguagesCharts';
import PageParagraph from '@/components/text/PageParagraph';

export const UsedLanguages = async () => {
	noStore();
	const { data } = await wakatimeStats(process.env.WAKATIME_DATA_URL!);

	return (
		<Fragment>
			<PageParagraph>
				Les langages que j'ai le plus utilisé cette semaine, sont les suivants (en
				pourcentage d'utilisation) :
			</PageParagraph>
			<UsedLanguagesCharts languages={data.languages} />
		</Fragment>
	);
};
