import { env } from '@/env/client';
import type { NextFont } from 'next/dist/compiled/@next/font';
import { Inter } from 'next/font/google';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const inter: NextFont = Inter({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

const name: string = `${env.NEXT_PUBLIC_NAME} ${env.NEXT_PUBLIC_SURNAME}`;

export const GET = async (req: NextRequest): Promise<ImageResponse> => {
	const { searchParams, host, protocol } = req.nextUrl;
	const backgroundImage: string = `url(${protocol}//${host}/og-bg.png)`;
	const authorImage: string = `${protocol}//${host}/og-author.png`;
	const postTitle: string | null = searchParams.get('title');

	return new ImageResponse(
		<div
			className={inter.className}
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#000000',
				paddingRight: 20,
				paddingLeft: 20,
			}}
		>
			<div
				tw="rounded-3xl w-full h-full p-16 flex flex-col justify-between"
				style={{
					backgroundImage,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<div tw="flex flex-col">
					<p tw="font-medium text-3xl text-white">
						{protocol}//{host}
					</p>
					<h1 tw="text-8xl font-geist-sans text-white leading-[7rem]">
						{postTitle}
					</h1>
				</div>
				<div tw="w-full flex flex-row items-center justify-end">
					<img
						src={authorImage}
						alt="Cuzeac Florin"
						tw="w-16 h-16 rounded-full object-cover object-top rounded-full mr-3"
					/>
					<div tw="flex flex-col items-start justify-center">
						<h2 tw="text-2xl font-geist-sans text-white font-bold m-0">
							{name}
						</h2>
						<p tw="m-0 text-white text-base">Développeur Web</p>
					</div>
				</div>
			</div>
		</div>,
		{
			width: 1500,
			height: 800,
		},
	);
};
