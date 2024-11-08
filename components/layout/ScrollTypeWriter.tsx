'use client';

import { type MotionValue, useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import type React from 'react';
import { useRef } from 'react';

interface LetterProps {
	children: React.ReactNode;
	range: number[];
	progress: MotionValue<number>;
}

const Letter = ({
	children,
	progress,
	range,
}: LetterProps): React.JSX.Element => {
	const opacity: MotionValue<number> = useTransform(progress, range, [0.1, 1]);
	return (
		<span>
			<motion.span style={{ opacity }}>{children}</motion.span>
		</span>
	);
};

interface ScrollTypeWriterProps {
	text: string;
}

interface ScrollTypeWriterLetters {
	char: string;
	idx: number;
}

export const ScrollTypeWriter = ({ text, ...rest }: ScrollTypeWriterProps) => {
	const element: React.RefObject<null> = useRef(null);
	const { scrollYProgress } = useScroll({
		target: element,
		offset: ['start 0.8', 'start 0.25'],
	});

	const letters: ScrollTypeWriterLetters[] = text
		.split('')
		.map((char: string, idx: number) => ({ char, idx }));

	return (
		<h2
			className="flex cursor-default flex-wrap font-bold font-hubot text-2xl text-foreground sm:text-3xl"
			ref={element}
			{...rest}
		>
			{letters.map(({ char, idx }: ScrollTypeWriterLetters) => {
				const start: number = idx / letters.length;
				const end: number = start + 1 / letters.length;

				return (
					<Letter progress={scrollYProgress} range={[start, end]} key={idx}>
						{char === ' ' ? '\u00A0' : char}
					</Letter>
				);
			})}
		</h2>
	);
};
