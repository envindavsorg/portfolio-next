import { AirPodsPro } from '@/components/dynamic-island/icons/AirPodsPro';
import { Backward } from '@/components/dynamic-island/icons/Backward';
import { Forward } from '@/components/dynamic-island/icons/Forward';
import { Pause } from '@/components/dynamic-island/icons/Pause';
import type { DynamicIslandSize } from '@/types';
import type { AppleMusicData, AppleMusicSong } from '@/types/AppleMusicData';
import Image, { type StaticImageData } from 'next/image';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { MotionDiv, MotionH2, MotionP } from './MotionHtml';
import { MusicEqualizer } from './MusicEqualizer';
import { NowPlaying } from './Now';
import { getEmptyAlbumCover } from './emptyAlbumCover';

export const hasNoImageUrl = (songUrl: string | StaticImageData) => {
	return !(typeof songUrl === 'string');
};

export const DynamicIslandMusicPlayer = ({
	size,
}: { size: DynamicIslandSize }) => {
	const [song, setSong] = useState<AppleMusicSong[]>();
	const [now, setNow] = useState<number>(0);
	const blurUrl = getEmptyAlbumCover();
	const currentSong = useMemo(() => song?.[now] ?? null, [song, now]);
	let imageUrl =
		currentSong?.attributes?.artwork?.url
			?.replace('{w}', '500')
			.replace('{h}', '500') ?? '';
	const [imgSrc, setImgSrc] = useState(
		imageUrl.length > 0 ? `/api/imageProxy?imageUrl=${imageUrl}` : blurUrl,
	);

	useEffect(() => {
		imageUrl =
			currentSong?.attributes?.artwork?.url
				?.replace('{w}', '500')
				.replace('{h}', '500') ?? '';
		// store-030.blobstore.apple.com includes user data, so we can't proxy it
		setImgSrc(
			imageUrl.length > 0 && !imageUrl.includes('apple.com')
				? `/api/imageProxy?imageUrl=${imageUrl}`
				: blurUrl,
		);
	}, [now, song]);

	useEffect(() => {
		const fetchSong = async () => {
			NowPlaying().then((data: AppleMusicData) => {
				setSong(data.data);
			});
		};
		fetchSong().catch(console.error);
	}, []);

	const decrement = () => {
		if (now === 0) {
			setNow((song?.length ?? 1) - 1);
		} else {
			setNow(now - 1);
		}
	};

	const increment = () => {
		if (now === (song?.length ?? 1) - 1) {
			setNow(0);
		} else {
			setNow(now + 1);
		}
	};

	const musicColors = useMemo(() => {
		return [
			currentSong?.attributes?.artwork?.bgColor ?? 'eeeeee',
			currentSong?.attributes?.artwork?.textColor1 ?? 'eeeeee',
			currentSong?.attributes?.artwork?.textColor2 ?? 'eeeeee',
			currentSong?.attributes?.artwork?.textColor3 ?? 'eeeeee',
			currentSong?.attributes?.artwork?.textColor4 ?? 'eeeeee',
		];
	}, [
		currentSong?.attributes?.artwork?.bgColor,
		currentSong?.attributes?.artwork?.textColor1,
		currentSong?.attributes?.artwork?.textColor2,
		currentSong?.attributes?.artwork?.textColor3,
		currentSong?.attributes?.artwork?.textColor4,
	]);

	return (
		<>
			<div
				style={size === 'ultra' ? { display: 'none' } : { display: 'block' }}
				className="h-full"
			>
				<MotionDiv
					className="ml-1.5 grid h-full grid-cols-6 justify-center"
					size={size}
					before="ultra"
				>
					<MotionDiv
						className="relative col-span-1 mx-auto my-auto h-7 w-7 overflow-hidden rounded-lg"
						size={size}
						before="ultra"
					>
						{hasNoImageUrl(imageUrl) ? (
							<Image
								src={imageUrl}
								alt="Album Art"
								layout="fill"
								objectFit="cover"
							/>
						) : (
							<Image
								src={imgSrc}
								alt={`album art of song`}
								layout="fill"
								placeholder="blur"
								blurDataURL={blurUrl}
								onLoadingComplete={(result) => {
									if (result.naturalWidth === 0) {
										setImgSrc(blurUrl);
									}
								}}
							/>
						)}
					</MotionDiv>
					<MotionDiv
						className="col-span-4 mx-auto my-auto"
						size={size}
						before="ultra"
					/>
					<MotionDiv
						className="col-span-1 mx-auto my-auto w-7.5 pr-0.5"
						size={size}
						before="ultra"
					>
						<MusicEqualizer size={size} colors={musicColors} before="ultra" />
					</MotionDiv>
				</MotionDiv>
			</div>
			<div
				style={size === 'compact' ? { display: 'none' } : { display: 'block' }}
				className="h-full"
			>
				<MotionDiv className="h-full" size={size} before="compact">
					<MotionDiv size={size} before="compact" className="w-full">
						<MotionDiv
							className="my-6 grid grid-cols-5"
							size={size}
							before="compact"
						>
							<MotionDiv
								className="relative col-span-1 my-auto ml-6 h-16 w-16 overflow-hidden rounded-2xl shadow-gray-900 shadow-lg"
								size={size}
								before="compact"
							>
								{hasNoImageUrl(imageUrl) ? (
									<Image
										src={imageUrl}
										alt="Album Art"
										layout="fill"
										objectFit="cover"
										onLoadingComplete={(result) => {
											if (result.naturalWidth === 0) {
												setImgSrc(blurUrl);
											}
										}}
									/>
								) : (
									<Image
										src={imgSrc}
										alt={`album art of song`}
										layout="fill"
										placeholder="blur"
										blurDataURL={blurUrl}
										onLoadingComplete={(result) => {
											if (result.naturalWidth === 0) {
												setImgSrc(blurUrl);
											}
										}}
									/>
								)}
							</MotionDiv>
							<MotionDiv
								className="col-span-3 my-auto ml-6 overflow-hidden text-left"
								size={size}
								before="compact"
							>
								<MotionP
									className="mb-0 truncate font-sans text-gray-500 text-sm"
									size={size}
									before="compact"
								>
									Sunghyun was listening to&hellip;
								</MotionP>
								<MotionH2
									className="my-0 truncate whitespace-nowrap font-sans text-md text-white"
									size={size}
									before="compact"
								>
									{currentSong?.attributes.name ?? 'Nothing'}
								</MotionH2>
								<MotionP
									className="mb-0 truncate font-sans text-gray-500 text-sm"
									size={size}
									before="compact"
								>
									by {currentSong?.attributes.artistName ?? 'Nobody'}
								</MotionP>
							</MotionDiv>
							<div className="flex flex-row justify-end">
								<div className="relative my-auto mr-6 scale-125 overflow-hidden">
									<MusicEqualizer
										size={size}
										colors={musicColors}
										before="compact"
									/>
								</div>
							</div>
						</MotionDiv>
					</MotionDiv>
					<MotionDiv
						className="my-2 grid grid-cols-5"
						size={size}
						before="compact"
					>
						<MotionDiv className="block text-left" size={size} before="compact">
							<MotionP
								className="m-auto text-center align-middle font-sans text-gray-500 text-sm"
								size={size}
								before="compact"
							>
								0:00
							</MotionP>
						</MotionDiv>
						<MotionDiv
							className="col-span-3 my-auto"
							size={size}
							before="compact"
						>
							<div className="relative my-auto mr-6 h-2 w-full overflow-hidden rounded-full bg-gray-500">
								<div className="absolute my-auto mr-6 h-2 w-full overflow-hidden bg-gray-500" />
								<div className="absolute my-auto mr-6 h-2 w-24 overflow-hidden bg-white" />
							</div>
						</MotionDiv>
						<MotionDiv
							className="block text-left align-middle"
							size={size}
							before="compact"
						>
							<MotionP
								className="m-auto text-center align-middle font-sans text-gray-500 text-sm"
								size={size}
								before="compact"
							>
								4:33
							</MotionP>
						</MotionDiv>
					</MotionDiv>
					<MotionDiv
						className="my-5 grid grid-cols-5"
						size={size}
						before="compact"
					>
						<MotionDiv className="col-span-1 " size={size} before="compact" />
						<MotionDiv
							className="col-span-1 my-auto"
							size={size}
							before="compact"
						>
							<Backward
								className="m-auto"
								onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
									decrement();
									e.preventDefault();
									e.stopPropagation();
									return false;
								}}
							/>
						</MotionDiv>
						<MotionDiv
							className="col-span-1 my-auto "
							size={size}
							before="compact"
						>
							<Pause className="m-auto scale-150 transform" />
						</MotionDiv>
						<MotionDiv
							className="col-span-1 my-auto"
							size={size}
							before="compact"
						>
							<Forward
								className="m-auto"
								onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
									increment();
									e.preventDefault();
									e.stopPropagation();
									return false;
								}}
							/>
						</MotionDiv>
						<MotionDiv
							className="col-span-1 my-auto"
							size={size}
							before="compact"
						>
							<AirPodsPro className="m-auto" fill="black" />
						</MotionDiv>
					</MotionDiv>
				</MotionDiv>
			</div>
		</>
	);
};
