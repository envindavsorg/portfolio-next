'use server';

import { logger } from '@/lib/logger';
import { dictionary } from '@/lib/status';
import { getStatus } from '@openstatus/react';
import * as z from 'zod';

const status = z.enum([
	'operational',
	'degraded_performance',
	'partial_outage',
	'major_outage',
	'under_maintenance',
	'unknown',
	'incident',
]);

const schema = z.object({
	status,
});

export interface OpenStatusProps {
	slug?: string;
	label: string;
	color: string;
	text: string;
	status: string;
}

export const websiteStatus = async (slug: string): Promise<OpenStatusProps> => {
	const { status } = await getStatus(slug);

	const parsed = schema.safeParse({ status });

	if (!parsed.success) {
		logger.error(parsed.error);
	}

	const { label, color, text } = dictionary[parsed.data!.status];

	return {
		label,
		color,
		text,
		status: parsed.data!.status,
	};
};
