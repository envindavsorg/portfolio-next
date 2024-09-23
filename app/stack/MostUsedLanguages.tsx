import { wakatimeStats } from '@/actions/wakatime/stats.action';
import { MostUsedLanguagesCharts } from '@/app/stack/MostUsedLanguagesCharts';
import { unstable_noStore as noStore } from 'next/cache';

export const MostUsedLanguages = async () => {
	noStore();
	const { data } = await wakatimeStats();

	return <MostUsedLanguagesCharts languages={data.languages} />;
};
