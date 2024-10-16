import { env } from '@/env/client';
import { ogImageSchema } from '@/lib/validations/og';
import { baseURL } from '@/resources/config';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import type React from 'react';

export const runtime = 'edge';

const interRegular: Promise<ArrayBuffer> = fetch(
	new URL('../../../fonts/Inter-Regular.ttf', import.meta.url),
).then((res: Response) => res.arrayBuffer());

const interBold: Promise<ArrayBuffer> = fetch(
	new URL('../../../fonts/CalSans-SemiBold.ttf', import.meta.url),
).then((res: Response) => res.arrayBuffer());

export const GET = async (req: NextRequest): Promise<ImageResponse> => {
	try {
		const fontRegular: ArrayBuffer = await interRegular;
		const fontBold: ArrayBuffer = await interBold;

		const url: URL = new URL(req.url);
		const values = ogImageSchema.parse(Object.fromEntries(url.searchParams));
		const heading: string =
			values.heading.length > 140
				? `${values.heading.substring(0, 140)}...`
				: values.heading;

		const { mode } = values;
		const paint: string = mode === 'dark' ? '#FFFFFF' : '#000000';
		const colorful: string = mode === 'dark' ? '#F5E050' : '#D85C1E';
		const fontSize: string = heading.length > 100 ? '70px' : '100px';

		const { host, protocol } = req.nextUrl;
		const avatar: string = `${protocol}//${host}/og-author.png`;

		return new ImageResponse(
			<div
				tw="flex relative flex-col p-12 w-full h-full items-start"
				style={{
					color: paint,
					background:
						mode === 'dark'
							? 'linear-gradient(90deg, #000000 0%, #111111 100%)'
							: 'linear-gradient(90deg, #FFFFFF 0%, #EEEEEE 100%)',
				}}
			>
				<div tw="flex flex-col flex-1 py-10">
					<div tw="flex items-center" style={{ gap: '12px' }}>
						<img
							src={avatar}
							alt={`${env.NEXT_PUBLIC_NAME} ${env.NEXT_PUBLIC_SURNAME}`}
							tw="rounded-full object-cover object-center"
							style={{ width: '56px', height: '56px' }}
						/>
						<div tw="flex flex-col">
							<h2
								tw="text-2xl m-0"
								style={{ fontFamily: 'Cal Sans', fontWeight: 'bold' }}
							>
								{`${env.NEXT_PUBLIC_NAME} ${env.NEXT_PUBLIC_SURNAME}`}
							</h2>
							<p
								tw="m-0 text-sm mt-0.5"
								style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
							>
								Développeur Web
							</p>
						</div>
					</div>
					<div
						tw="flex leading-[1.1] text-[80px] font-bold mt-3"
						style={{
							fontFamily: 'Cal Sans',
							fontWeight: 'bold',
							marginLeft: '-3px',
							fontSize,
						}}
					>
						{heading}
					</div>
				</div>
				<div tw="flex items-center w-full justify-between">
					<div
						tw="flex items-center text-xl"
						style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill={paint}
							viewBox="0 0 256 256"
						>
							<path d="M208,136H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V152A16,16,0,0,0,208,136Zm0,64H48V152H208v48Zm0-160H48A16,16,0,0,0,32,56v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A16,16,0,0,0,208,40Zm0,64H48V56H208v48ZM192,80a12,12,0,1,1-12-12A12,12,0,0,1,192,80Zm0,96a12,12,0,1,1-12-12A12,12,0,0,1,192,176Z" />
						</svg>
						<div tw="flex ml-2">{baseURL}</div>
					</div>

					<div
						tw="flex items-center text-xl"
						style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill={paint}
							viewBox="0 0 256 256"
						>
							<path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z" />
						</svg>
						<div tw="flex ml-2">github.com/envindavsorg</div>
					</div>
				</div>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill={colorful}
					viewBox="0 0 256 256"
					style={{
						position: 'absolute',
						top: '50px',
						right: '50px',
						width: fontSize,
						height: fontSize,
						transform: 'rotate(45deg) translateX(0)',
					}}
				>
					<path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z" />
				</svg>
			</div>,
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: 'Inter',
						data: fontRegular,
						weight: 400,
						style: 'normal',
					},
					{
						name: 'Cal Sans',
						data: fontBold,
						weight: 700,
						style: 'normal',
					},
				],
			},
		);
	} catch (error) {
		return new Response(`Failed to generate image`, {
			status: 500,
		});
	}
};
