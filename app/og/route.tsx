import type { NextFont } from 'next/dist/compiled/@next/font';
import { Inter } from 'next/font/google';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const inter: NextFont = Inter({
	weight: '400',
	subsets: ['latin'],
});

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
				backgroundColor: '#000000',
			}}
		>
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					color: '#FFFFFF',
					fontWeight: 'bold',
					padding: '40px',
					backgroundImage,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					borderRadius: 20,
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<p
						style={{
							fontSize: '30px',
							fontWeight: '900',
							letterSpacing: '-0.025em',
							color: '#FFFFFF',
						}}
					>
						{protocol}//{host}
					</p>
					<div
						style={{
							marginTop: '40px',
							fontSize: '96px',
							fontWeight: '900',
							lineHeight: '6rem',
							padding: '0 0 100px 0',
							letterSpacing: '-0.025em',
							color: '#FFFFFF',
							lineClamp: 4,
						}}
					>
						{postTitle}
					</div>
				</div>
				<div
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-end',
						gap: '20px',
					}}
				>
					<img
						src={authorImage}
						alt="Cuzeac Florin"
						style={{
							width: '80px',
							height: '80px',
							objectFit: 'cover',
							objectPosition: 'top',
							borderRadius: '50%',
						}}
					/>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							justifyContent: 'center',
						}}
					>
						<div
							style={{
								fontSize: '28px',
								fontWeight: '900',
								letterSpacing: '-0.025em',
								color: '#FFFFFF',
							}}
						>
							Cuzeac Florin
						</div>
						<div
							style={{
								fontSize: '16px',
								fontWeight: '400',
								letterSpacing: '-0.025em',
								color: '#FFFFFF',
							}}
						>
							Développeur Web
						</div>
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
