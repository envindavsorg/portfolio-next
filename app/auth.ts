import { env } from '@/env/server';
import { logger } from '@/lib/logger';
import NextAuth from 'next-auth';
import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import GitHub from 'next-auth/providers/github';

// Extend the JWT interface
interface ExtendedJWT extends JWT {
	id?: string;
}

// Extend the Session interface
interface ExtendedSession extends Session {
	user: {
		id?: string;
	} & Session['user'];
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GitHub({
			clientId: env.AUTH_GITHUB_ID,
			clientSecret: env.AUTH_GITHUB_SECRET,
		}),
	],
	pages: {
		signIn: '/login',
	},
	debug: false,
	logger: {
		error(code, ...message) {
			logger.error(code, message);
		},
		warn(code, ...message) {
			logger.warn(code, message);
		},
		debug(code, ...message) {
			logger.debug(code, message);
		},
	},
	callbacks: {
		jwt({ token, user }): ExtendedJWT {
			if (user) {
				token.id = user.id as string;
			}
			return token;
		},
		session({ session, token }): ExtendedSession {
			session.user.id = token.id as string;
			return session;
		},
		signIn({ user }) {
			return user.id !== env.GITHUB_USERNAME;
		},
	},
});
