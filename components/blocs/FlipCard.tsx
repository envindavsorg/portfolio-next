'use client';

import { LocationWidget } from '@/components/blocs/LocationWidget';
import { Map } from '@/components/map/Map';
import { motion } from 'framer-motion';
import type React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

interface FlipCardProps {
	latitude: number;
	longitude: number;
}

export const FlipCard = ({
	latitude,
	longitude,
}: FlipCardProps): React.JSX.Element => {
	const [flipped, setFlipped] = useState(false);
	const [clientWidth, setClientWidth] = useState<number | null>(null);

	const handleFlip = (): void => {
		setFlipped(!flipped);
	};

	const { width = 0 } = useWindowSize();
	useEffect(() => {
		setClientWidth(width);
	}, [width]);

	const dynamicWidth =
		clientWidth === null
			? null
			: clientWidth < 530 && clientWidth > 360
				? clientWidth - 64
				: null;

	return (
		<div>
			<motion.div
				onClick={handleFlip}
				animate={flipped ? 'flipped' : 'notFlipped'}
				whileHover={{
					scale: 0.95,
				}}
				transition={{
					type: 'spring',
					duration: 1,
				}}
				variants={{
					flipped: {
						rotateY: 180,
						rotateX: 5,
						translateY: 0,
					},
				}}
				className="relative flex h-56 w-56 shrink-0 flex-col hover:cursor-pointer min-[530px]:aspect-square min-[530px]:h-full min-[530px]:w-56"
				style={
					{
						transformStyle: 'preserve-3d',
						width: dynamicWidth === null ? undefined : dynamicWidth,
					} as React.CSSProperties
				}
			>
				<div
					style={{ backfaceVisibility: 'hidden' }}
					className="absolute z-10 flex size-full flex-col bg-white dark:bg-black"
				>
					<LocationWidget latitude={latitude} longitude={longitude} />
				</div>

				<div
					className="absolute z-10 flex size-full flex-col bg-white dark:bg-black"
					style={{
						backfaceVisibility: 'hidden',
						transform: 'rotateY(180deg)',
					}}
				>
					<Map
						longitude={longitude}
						latitude={latitude}
						width={dynamicWidth}
						marker={false}
					/>
				</div>
			</motion.div>
		</div>
	);
};
