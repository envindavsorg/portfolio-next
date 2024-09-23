import { wakatimeStats } from '@/actions/wakatime/stats.action';
import { MostUsedLanguagesCharts } from '@/app/stack/MostUsedLanguagesCharts';

export const MostUsedLanguages = async () => {
	const { data } = await wakatimeStats();

	return <MostUsedLanguagesCharts languages={data.languages} />;
};
