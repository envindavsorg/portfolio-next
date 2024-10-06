import { wakatimeStats } from '@/actions/wakatime/stats.action';
import { MostUsedLanguagesCharts } from '@/components/stack/MostUsedLanguagesCharts';
import { env } from '@/env/server';
import { unstable_noStore as noStore } from 'next/cache';

export const MostUsedLanguages = async () => {
	noStore();
	const { data } = await wakatimeStats(env.WAKATIME_DATA_URL);

	return <MostUsedLanguagesCharts languages={data.languages} />;
};
