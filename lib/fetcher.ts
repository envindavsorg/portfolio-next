export const fetcher = (
	...args: [RequestInfo, RequestInit?]
): Promise<string> => fetch(...args).then((res) => res.text());
