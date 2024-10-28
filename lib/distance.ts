// Haversine formula to calculate distance between two points on Earth
export const getDistanceFromLatLonInKm = (
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
): number => {
	const R: number = 6371; // radius of the earth in km
	const dLat: number = deg2rad(lat2 - lat1);
	const dLon: number = deg2rad(lon2 - lon1);
	const a: number =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d: number = R * c; // distance in km
	return Math.round(d);
};

export const deg2rad = (deg: number): number => deg * (Math.PI / 180);
