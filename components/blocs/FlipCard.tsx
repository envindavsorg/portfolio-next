'use client';

import { LocationWidget } from '@/components/blocs/LocationWidget';
import { Map } from '@/components/map/Map';
import { motion } from 'framer-motion';
import type React from 'react';
import { useState } from 'react';

interface FlipCardProps {
	latitude: number;
	longitude: number;
}

export const FlipCard = ({
	latitude,
	longitude,
}: FlipCardProps): React.JSX.Element => {
	const [flipped, setFlipped] = useState(false);

	const handleFlip = (): void => {
		setFlipped(!flipped);
	};

	return (
		<div>
			<motion.div
				onClick={handleFlip}
				animate={flipped ? 'flipped' : 'notFlipped'}
				whileHover={{
					scale: 0.95,
				}}
				style={{
					transformStyle: 'preserve-3d',
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
				className="relative flex h-56 w-56 shrink-0 flex-col hover:cursor-pointer min-[530px]:aspect-square min-[530px]:h-full min-[375px]:w-72 min-[440px]:w-96 min-[530px]:w-56"
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
					<Map longitude={longitude} latitude={latitude} />
				</div>
			</motion.div>
		</div>
	);
};
