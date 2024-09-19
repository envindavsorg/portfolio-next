'use client';

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface ITypewriterProps {
	delay: number;
	texts: string[];
	base?: string;
}

export const Typewriter = ({ delay, texts, base = '' }: ITypewriterProps) => {
	const [animationComplete, setAnimationComplete] = useState(false);

	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));
	const displayText = useTransform(rounded, (latest) => base.slice(0, latest));

	useEffect(() => {
		const controls = animate(count, base.length, {
			type: 'tween',
			delay,
			duration: 1,
			ease: 'easeInOut',
			onComplete: () => setAnimationComplete(true),
		});

		return () => {
			controls.stop?.();
		};
	}, [count, base.length, delay]);

	return (
		<span>
			<motion.span>{displayText}</motion.span>

			{animationComplete && (
				<RepeatedTextAnimation texts={texts} delay={delay + 1} />
			)}

			<BlinkingCursor />
		</span>
	);
};

export interface IRepeatedTextAnimationProps {
	delay: number;
	texts: string[];
}

const RepeatedTextAnimation = ({
	delay,
	texts,
}: IRepeatedTextAnimationProps) => {
	const textIndex = useMotionValue(0);
	const baseText = useTransform(textIndex, (latest) => texts[latest] || '');
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));

	const displayText = useTransform(rounded, (latest) =>
		baseText.get().slice(0, latest),
	);
	const updatedThisRound = useMotionValue(true);

	useEffect(() => {
		const animation = animate(count, 60, {
			type: 'tween',
			delay,
			duration: 1,
			ease: 'easeIn',
			repeat: Number.POSITIVE_INFINITY,
			repeatType: 'reverse',
			repeatDelay: 1,
			onUpdate(latest) {
				if (updatedThisRound.get() && latest > 0) {
					updatedThisRound.set(false);
				} else if (!updatedThisRound.get() && latest === 0) {
					textIndex.set((textIndex.get() + 1) % texts.length);
					updatedThisRound.set(true);
				}
			},
		});

		return () => {
			animation.stop?.();
		};
	}, [count, delay, textIndex, texts, updatedThisRound]);

	return (
		<motion.span className="inline font-medium text-sm text-white">
			{displayText}
		</motion.span>
	);
};

const cursorVariants = {
	blinking: {
		opacity: [0, 0, 1, 1],
		transition: {
			duration: 1,
			repeat: Number.POSITIVE_INFINITY,
			repeatDelay: 0,
			ease: 'linear',
			times: [0, 0.5, 0.5, 1],
		},
	},
};

const BlinkingCursor = () => (
	<motion.span
		variants={cursorVariants}
		animate="blinking"
		className="inline-block h-4 w-px translate-y-1 bg-switch"
	/>
);
