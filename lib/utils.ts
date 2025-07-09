import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { baseURL } from '@/resources/config';

export const cn = (...inputs: ClassValue[]): string => {
	return twMerge(clsx(inputs));
};

export const absoluteUrl = (path: string): string => `https://${baseURL}${path}`;

export const getRouterLastPathSegment = (pathname: string): string => {
	const segment: string[] = pathname.split('/').filter(Boolean);

	if (segment.length > 1) {
		return segment[segment.length - 1];
	}

	if (segment.length === 1) {
		return segment[0];
	}

	return '/';
};
