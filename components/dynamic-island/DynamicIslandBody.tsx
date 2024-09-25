// See https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/live-activities

import type { DynamicIslandSize } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useWillChange } from 'framer-motion';
import type React from 'react';
import { DynamicIslandSizePresets } from './DynamicIslandSizePresets';
import { damping, stiffness } from './physics';

const initialState: keyof typeof DynamicIslandSizePresets = 'default';

const maxWidth = 371;

type Props = {
	state: DynamicIslandSize;
	setState: (state: DynamicIslandSize) => void;
	default: DynamicIslandSize;
	onHover?: () => void;
	onLeave?: () => void;
	onClick?: () => void;
	children: React.ReactNode;
	id?: string;
};

const min = (a: number, b: number) => (a < b ? a : b);

const DynamicIslandBody = (props: Props) => {
	const willChange = useWillChange();
	const { state, children, id } = props;

	return (
		<div className="z-10 grid h-full w-full place-items-center bg-transparent">
			<motion.button
				id={id}
				className="mx-auto h-0 w-0 items-center justify-center bg-black text-center text-white transition duration-300 ease-in-out hover:shadow-lg"
				animate={{
					width: min(
						DynamicIslandSizePresets[state ?? initialState].width,
						maxWidth,
					),
					height:
						DynamicIslandSizePresets[state ?? initialState].aspectRatio *
						min(
							DynamicIslandSizePresets[state ?? initialState].width,
							maxWidth,
						),
					borderRadius:
						DynamicIslandSizePresets[state ?? initialState].borderRadius,
					transition: {
						type: 'spring',
						stiffness: stiffness,
						damping: damping,
					},
					clipPath: `none`,
					transitionEnd: {
						clipPath: `url(#squircle-${state ?? initialState})`,
					},
				}}
				style={{ willChange }}
				onClick={props.onClick}
				onHoverStart={props.onHover}
				onHoverEnd={props.onLeave}
			>
				<AnimatePresence>{children}</AnimatePresence>
			</motion.button>
		</div>
	);
};

export default DynamicIslandBody;
