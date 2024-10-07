'use server';

export const linkedInData = async () => {
	const avatar: string =
		'https://media.licdn.com/dms/image/v2/D4E03AQGMBLwqpxHRGA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715716598040?e=1730937600&v=beta&t=sl7ObNCE6r4XlAS8G5MaaWjZcRt6tdfrqLEjUkcFRRE';
	const followers: number = 2312;

	return {
		name: 'Cuzeac Florin',
		id: 'cuzeacflorin',
		avatar,
		followers,
	};
};
