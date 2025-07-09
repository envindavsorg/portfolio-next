'use client';

import { motion } from 'motion/react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useOptimizedIntersection } from '@/hooks/useOptimizedIntersection';

interface TextHoverEffectProps {
	text: string;
	duration?: number;
	automatic?: boolean;
	triggerOnView?: boolean;
}

export const TextHoverEffect = ({
	text,
	duration,
	triggerOnView = true,
}: TextHoverEffectProps): React.JSX.Element => {
	const svgRef = useRef<SVGSVGElement>(null);
	const [cursor, setCursor] = useState({ x: 0, y: 0 });
	const [hovered, setHovered] = useState(false);
	const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' });
	const [hasTriggered, setHasTriggered] = useState(false);

	const [intersectionRef, isIntersecting] = useOptimizedIntersection({
		threshold: 0.3,
		once: true,
		enabled: triggerOnView,
	});

	useEffect(() => {
		if (svgRef.current && cursor.x !== null && cursor.y !== null) {
			const svgRect = svgRef.current.getBoundingClientRect();
			const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
			const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
			setMaskPosition({
				cx: `${cxPercentage}%`,
				cy: `${cyPercentage}%`,
			});
		}
	}, [cursor]);

	useEffect(() => {
		if (triggerOnView && isIntersecting && !hasTriggered) {
			setHasTriggered(true);
		}
	}, [isIntersecting, triggerOnView, hasTriggered]);

	const combinedRef = (node: SVGSVGElement | null) => {
		svgRef.current = node;
		if (intersectionRef.current !== node) {
			(intersectionRef as React.RefObject<SVGSVGElement | null>).current = node;
		}
	};

	const shouldAnimate = triggerOnView ? hasTriggered : true;

	return (
		<svg
			ref={combinedRef}
			width="100%"
			height="100%"
			viewBox="0 0 300 100"
			xmlns="http://www.w3.org/2000/svg"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
			className="select-none"
		>
			<defs>
				<linearGradient
					id="textGradient"
					gradientUnits="userSpaceOnUse"
					cx="50%"
					cy="50%"
					r="25%"
				>
					{hovered && (
						<>
							<stop offset="0%" stopColor="#eab308" />
							<stop offset="25%" stopColor="#ef4444" />
							<stop offset="50%" stopColor="#3b82f6" />
							<stop offset="75%" stopColor="#06b6d4" />
							<stop offset="100%" stopColor="#8b5cf6" />
						</>
					)}
				</linearGradient>

				<motion.radialGradient
					id="revealMask"
					gradientUnits="userSpaceOnUse"
					r="20%"
					initial={{ cx: '50%', cy: '50%' }}
					animate={maskPosition}
					transition={{ duration: duration ?? 0, ease: 'easeOut' }}
				>
					<stop offset="0%" stopColor="white" />
					<stop offset="100%" stopColor="black" />
				</motion.radialGradient>
				<mask id="textMask">
					<rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
				</mask>
			</defs>
			<motion.text
				x="50%"
				y="50%"
				textAnchor="middle"
				dominantBaseline="middle"
				strokeWidth="0.3"
				className="fill-transparent stroke-neutral-700/40 font-bold font-geist-sans text-7xl dark:stroke-neutral-400/50"
				initial={{ opacity: 0 }}
				animate={{ opacity: hovered ? 0.7 : 0 }}
				transition={{ duration: 0.2 }}
			>
				{text}
			</motion.text>
			<motion.text
				x="50%"
				y="50%"
				textAnchor="middle"
				dominantBaseline="middle"
				strokeWidth="0.3"
				className="fill-transparent stroke-neutral-700/40 font-bold font-geist-sans text-7xl dark:stroke-neutral-400/50"
				initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
				animate={
					shouldAnimate
						? {
								strokeDashoffset: 0,
								strokeDasharray: 1000,
							}
						: {}
				}
				transition={{
					duration: 4,
					ease: 'easeInOut',
					delay: 0.5,
				}}
			>
				{text}
			</motion.text>
			<motion.text
				x="50%"
				y="50%"
				textAnchor="middle"
				dominantBaseline="middle"
				stroke="url(#textGradient)"
				strokeWidth="0.3"
				mask="url(#textMask)"
				className="fill-transparent font-bold font-geist-sans text-7xl"
				initial={{ opacity: 0 }}
				animate={{ opacity: shouldAnimate ? 1 : 0 }}
				transition={{ duration: 0.5, delay: 1 }}
			>
				{text}
			</motion.text>
		</svg>
	);
};
