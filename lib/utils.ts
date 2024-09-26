import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => {
	return twMerge(clsx(inputs));
};

export const getRouterLastPathSegment = (pathname: string) => {
	const segment: string[] = pathname.split('/').filter(Boolean);

	if (segment.length > 1) {
		return segment[segment.length - 1];
	}

	if (segment.length === 1) {
		return segment[0];
	}

	return '/';
};
