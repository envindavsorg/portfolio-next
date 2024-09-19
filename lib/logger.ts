import { Logger } from 'tslog';

export const logger: Logger<unknown> = new Logger({
	name: 'Mon portfolio',
	type: 'pretty',
	minLevel: process.env.NODE_ENV === 'production' ? 3 : 0,
});
