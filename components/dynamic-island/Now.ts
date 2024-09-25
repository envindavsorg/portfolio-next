import type { AppleMusicData } from '@/types/AppleMusicData';

export const NowPlaying = async (): Promise<AppleMusicData> => {
	return await fetch(
		'https://raw.githubusercontent.com/anaclumos/now-playing/main/now-playing.json',
	).then((res) => res.json());
};
