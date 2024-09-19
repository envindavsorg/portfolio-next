'use server';

const fetchLinkedInData = () => {
	return {
		name: 'Cuzeac Florin',
		id: 'cuzeacflorin',
		avatar:
			'https://media.licdn.com/dms/image/v2/D4E03AQGMBLwqpxHRGA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715716598040?e=1730937600&v=beta&t=sl7ObNCE6r4XlAS8G5MaaWjZcRt6tdfrqLEjUkcFRRE',
		followers: 2319,
	};
};

export const linkedInData = async () => {
	return fetchLinkedInData();
};
