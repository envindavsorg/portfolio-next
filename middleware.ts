import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const middleware = (request: NextRequest): NextResponse => {
	const requestHeaders: Headers = new Headers(request.headers);
	requestHeaders.set('x-next-pathname', request.nextUrl.pathname);

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
};

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default middleware;
