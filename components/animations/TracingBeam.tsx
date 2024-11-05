// Copyright Cuzeac Florin 2024. All Rights Reserved.
// Project: portfolio-site
// Author contact: https://www.linkedin.com/in/cuzeacflorin/
// This file is licensed under the MIT Licence.
// Licence text available at https://opensource.org/licenses/MIT

'use client';

import {
	type MotionValue,
	motion,
	useScroll,
	useSpring,
	useTransform,
} from 'framer-motion';
import type React from 'react';
import { memo, useEffect, useRef, useState } from 'react';

type TracingBeamProps = React.HTMLProps<HTMLDivElement> & {
	children: React.ReactNode;
};

export const TracingBeam = memo(({ children }: TracingBeamProps) => {
	const ref: React.RefObject<HTMLDivElement | null> =
		useRef<HTMLDivElement>(null);
	const contentRef: React.RefObject<HTMLDivElement | null> =
		useRef<HTMLDivElement>(null);

	const [svgHeight, setSvgHeight] = useState(0);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	});

	useEffect(() => {
		if (contentRef.current) {
			setSvgHeight(contentRef.current.offsetHeight);
		}
	}, []);

	const y1: MotionValue = useSpring(
		useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
		{ stiffness: 500, damping: 90 },
	);
	const y2: MotionValue = useSpring(
		useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
		{ stiffness: 500, damping: 90 },
	);

	return (
		<motion.div ref={ref} className="relative mx-auto size-full max-w-4xl">
			<div className="-left-20 absolute top-12 hidden md:inline-block">
				<motion.div
					transition={{ duration: 0.2, delay: 0.5 }}
					animate={{
						boxShadow:
							scrollYProgress.get() > 0
								? 'none'
								: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
					}}
					className="ml-[27px] flex size-4 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700"
				>
					<motion.div
						transition={{ duration: 0.2, delay: 0.5 }}
						className="size-2 rounded-full bg-theme"
					/>
				</motion.div>
				<svg
					viewBox={`0 0 20 ${svgHeight}`}
					width="20"
					height={svgHeight}
					className="ml-4 block"
					aria-hidden="true"
				>
					<motion.path
						d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
						fill="none"
						stroke="var(--border)"
						strokeOpacity="0.80"
						transition={{ duration: 10 }}
					/>
					<motion.path
						d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
						fill="none"
						stroke="url(#gradient)"
						strokeWidth="1.25"
						className="motion-reduce:hidden"
						transition={{ duration: 10 }}
					/>
					<defs>
						<motion.linearGradient
							id="gradient"
							gradientUnits="userSpaceOnUse"
							x1="0"
							x2="0"
							y1={y1}
							y2={y2}
						>
							<stop stopColor="var(--theme)" stopOpacity="0" />
							<stop stopColor="var(--theme)" />
							<stop offset="0.325" stopColor="var(--theme)" />
							<stop offset="1" stopColor="var(--theme)" stopOpacity="0" />
						</motion.linearGradient>
					</defs>
				</svg>
			</div>

			<div ref={contentRef}>{children}</div>
		</motion.div>
	);
});
