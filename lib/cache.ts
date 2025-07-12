const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
	data: T;
	timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

export const getCachedData = <T>(key: string): T | null => {
	const entry = cache.get(key);
	if (!entry) {
		return null;
	}

	const now = Date.now();
	if (now - entry.timestamp > CACHE_DURATION) {
		cache.delete(key);
		return null;
	}

	return entry.data;
};

export const setCachedData = <T>(key: string, data: T): void => {
	cache.set(key, {
		data,
		timestamp: Date.now(),
	});
};

export const getCachedDataWithCustomDuration = <T>(
	key: string,
	duration: number,
): T | null => {
	const entry = cache.get(key);
	if (!entry) {
		return null;
	}

	const now = Date.now();
	if (now - entry.timestamp > duration) {
		cache.delete(key);
		return null;
	}

	return entry.data;
};

export const clearCache = (): void => {
	cache.clear();
};
