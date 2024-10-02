import { type ClassValue, clsx } from 'clsx';
import type React from 'react';
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

export const getRelativeCoordinates = (
	event: React.MouseEvent<HTMLUListElement>,
	referenceElement: any,
) => {
	const position = {
		x: event.pageX,
		y: event.pageY,
	};

	const offset = {
		left: referenceElement.offsetLeft,
		top: referenceElement.clientTop,
		width: referenceElement.clientWidth,
		height: referenceElement.clientHeight,
	};

	let reference = referenceElement.offsetParent;

	while (reference) {
		offset.left += reference.offsetLeft;
		offset.top += reference.offsetTop;
		reference = reference.offsetParent;
	}

	return {
		x: position.x - offset.left,
		y: position.y - offset.top,
	};
};
