interface ApplicationError extends Error {
	info: string;
	status: number;
}

export const fetcher = async (url: string): Promise<Response> => {
	const response: Response = await fetch(url);

	if (!response.ok) {
		const error = new Error(
			'→ an error occurred while fetching the data ...',
		) as ApplicationError;

		error.info = await response.json();
		error.status = response.status;

		throw error;
	}

	return response.json();
};
