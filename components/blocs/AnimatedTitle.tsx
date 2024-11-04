// Copyright Cuzeac Florin 2024. All Rights Reserved.
// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

'use client';

import { HandWaving } from '@phosphor-icons/react';
import { type Variants, motion } from 'framer-motion';
import type React from 'react';
import type { HTMLAttributes } from 'react';
import { memo } from 'react';
import { useMemo, useState } from 'react';

interface AnimatedTitleProps extends HTMLAttributes<HTMLDivElement> {
	words: string;
	delay?: number;
	className?: string;
}

export const AnimatedTitle = memo(
	({ words, delay = 0.15 }: AnimatedTitleProps): React.JSX.Element => {
		const [animationDone, setAnimationDone] = useState(false);

		const variants: Variants = {
			initial: {
				y: 100,
				opacity: 0,
			},
			animate: (idx: number) => ({
				y: 0,
				opacity: 1,
				transition: {
					delay: idx * (delay ? delay : 0.05),
				},
			}),
		};

		// decompose the words into an array of characters
		const letters: string[] = useMemo(() => words.split(''), [words]);

		return (
			<div className="flex justify-start">
				{letters.map((letter: string, idx: number) => (
					<motion.p
						key={idx}
						variants={variants}
						initial="initial"
						animate="animate"
						custom={idx}
						onAnimationComplete={
							idx === letters.length - 1
								? () => setAnimationDone(true)
								: undefined
						}
						className="whitespace-nowrap bg-white bg-clip-text leading-8"
					>
						{letter === ' ' ? <span>&nbsp;</span> : letter}
					</motion.p>
				))}

				{animationDone && (
					<motion.div
						key={0}
						variants={variants}
						initial="initial"
						animate="animate"
						custom={0}
						className="ms-2 mt-1"
					>
						<WavingHand />
					</motion.div>
				)}
			</div>
		);
	},
);

const WavingHand = (): React.JSX.Element => (
	<motion.div
		animate={{
			rotate: [0, 30, 0],
		}}
		transition={{
			duration: 0.5,
			repeat: 7,
			repeatType: 'reverse',
			delay: 0.5,
			ease: 'easeInOut',
		}}
	>
		<HandWaving className="text-theme text-xl" weight="duotone" />
	</motion.div>
);
