import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { baseURL } from '@/resources/config';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const absoluteUrl = (path: string): string => `https://${baseURL}${path}`;

interface Accents {
	[key: string]: string;
}

const accents: Accents = {
	é: 'e',
	è: 'e',
	ê: 'e',
	ë: 'e',
	à: 'a',
	â: 'a',
	ä: 'a',
	î: 'i',
	ï: 'i',
	ô: 'o',
	ö: 'o',
	ù: 'u',
	û: 'u',
	ü: 'u',
	ç: 'c',
};

export const slugify = (title: string): string =>
	title
		.split('')
		.map((char): string => accents[char] || char)
		.join('')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
