'use client';

import { useNavBarMobile } from '@/components/navigation/NavBarProvider';
import type { Variants } from 'framer-motion';
import { MotionConfig, motion } from 'framer-motion';
import React, { forwardRef } from 'react';

const topPosition: string = '23.5%';
const bottomPosition: string = '23.5%';

export const NavbarMobileButton = forwardRef<HTMLButtonElement>(
	(_props, ref) => {
		const { isOpen, toggleNavbar } = useNavBarMobile();

		return (
			<MotionConfig
				transition={{
					duration: 0.5,
					ease: 'easeInOut',
				}}
			>
				<motion.button
					ref={ref}
					initial={false}
					animate={isOpen ? 'open' : 'closed'}
					onClick={toggleNavbar}
					className="relative flex size-7 shrink-0 cursor-pointer rounded-none focus:outline-0 focus:ring-0"
					aria-labelledby="Ouvrir ou fermer le menu de navigation mobile"
					aria-label="Ouvrir ou fermer le menu de navigation mobile"
				>
					<motion.span
						variants={top}
						className="absolute h-0.5 w-5 bg-black dark:bg-white"
						style={{
							y: '-50%',
							left: '50%',
							x: '-50%',
							top: topPosition,
						}}
					/>
					<motion.span
						variants={middle}
						className="absolute h-0.5 w-5 bg-black dark:bg-white"
						style={{
							left: '50%',
							x: '-50%',
							top: '50%',
							y: '-50%',
						}}
					/>
					<motion.span
						variants={bottom}
						className="absolute h-0.5 w-2.5 bg-black dark:bg-white"
						style={{
							x: '-50%',
							y: '50%',
							bottom: bottomPosition,
							left: 'calc(50% + 10px)',
						}}
					/>
				</motion.button>
			</MotionConfig>
		);
	},
);

const top: Variants = {
	open: {
		rotate: ['0deg', '0deg', '45deg'],
		top: [topPosition, '50%', '50%'],
	},
	closed: {
		rotate: ['45deg', '0deg', '0deg'],
		top: ['50%', '50%', topPosition],
	},
};

const middle: Variants = {
	open: {
		rotate: ['0deg', '0deg', '-45deg'],
	},
	closed: {
		rotate: ['-45deg', '0deg', '0deg'],
	},
};

const bottom: Variants = {
	open: {
		rotate: ['0deg', '0deg', '45deg'],
		bottom: [bottomPosition, '50%', '50%'],
		left: '50%',
	},
	closed: {
		rotate: ['45deg', '0deg', '0deg'],
		bottom: ['50%', '50%', bottomPosition],
		left: 'calc(50% + 5px)',
	},
};
