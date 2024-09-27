import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	client: {
		NEXT_PUBLIC_WEBSITE_URL: z.string().url(),
		NEXT_PUBLIC_NAME: z.string().min(1),
		NEXT_PUBLIC_SURNAME: z.string().min(1),
		NEXT_PUBLIC_WEBSITE_PREFIX: z.string().min(1),
		NEXT_PUBLIC_GITHUB_USERNAME: z.string().min(1),
		NEXT_PUBLIC_EMAIL: z.string().min(5).email(),
		NEXT_PUBLIC_PHONE: z.string().min(1),
		NEXT_PUBLIC_BIRTH_YEAR: z.number(),
		NEXT_PUBLIC_START_DEVELOPING_YEAR: z.number(),
		NEXT_PUBLIC_UMAMI_PREVIEW_ENDPOINT: z.string().url(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
		NEXT_PUBLIC_NAME: process.env.NEXT_PUBLIC_NAME,
		NEXT_PUBLIC_SURNAME: process.env.NEXT_PUBLIC_SURNAME,
		NEXT_PUBLIC_WEBSITE_PREFIX: process.env.NEXT_PUBLIC_WEBSITE_PREFIX,
		NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
		NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
		NEXT_PUBLIC_PHONE: process.env.NEXT_PUBLIC_PHONE,
		NEXT_PUBLIC_BIRTH_YEAR: Number(process.env.NEXT_PUBLIC_BIRTH_YEAR),
		NEXT_PUBLIC_START_DEVELOPING_YEAR: Number(
			process.env.NEXT_PUBLIC_START_DEVELOPING_YEAR,
		),
		NEXT_PUBLIC_UMAMI_PREVIEW_ENDPOINT:
			process.env.NEXT_PUBLIC_UMAMI_PREVIEW_ENDPOINT,
	},
});
