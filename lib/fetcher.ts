export const fetcher = (
	...args: [RequestInfo, RequestInit?]
): Promise<string> =>
	fetch(...args).then((res: Response): Promise<string> => res.text());
