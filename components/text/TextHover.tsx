'use client';

import { motion } from 'motion/react';
import type React from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useOptimizedIntersection from '@/hooks/useOptimizedIntersection';

interface TextHoverProps {
	text: string;
	duration?: number;
	automatic?: boolean;
	triggerOnView?: boolean;
}

export const TextHover = memo(
	({ text, duration, triggerOnView = true }: TextHoverProps): React.JSX.Element => {
		const svgRef = useRef<SVGSVGElement>(null);
		const textRef = useRef<SVGTextElement>(null);
		const [cursor, setCursor] = useState({ x: 0, y: 0 });
		const [hovered, setHovered] = useState(false);
		const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' });
		const [hasTriggered, setHasTriggered] = useState(false);
		const [animationKey, setAnimationKey] = useState(0);
		const [textDimensions, setTextDimensions] = useState({ width: 300, height: 100 });
		const [strokeDashLength, setStrokeDashLength] = useState(1000);
		const [isMobile, setIsMobile] = useState(false);

		const [intersectionRef, isIntersecting] = useOptimizedIntersection({
			threshold: 0.3,
			once: false,
			enabled: triggerOnView,
		});

		useEffect(() => {
			const checkMobile = () => {
				setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
			};

			checkMobile();
			window.addEventListener('resize', checkMobile);
			return () => window.removeEventListener('resize', checkMobile);
		}, []);

		useEffect(() => {
			if (textRef.current && text) {
				try {
					const bbox = textRef.current.getBBox();
					const perimeter = (bbox.width + bbox.height) * 2;
					const pathLength = Math.max(perimeter, text.length * 50);
					const padding = 20;
					const width = Math.max(300, bbox.width + padding * 2);
					const height = Math.max(100, bbox.height + padding * 2);

					setTextDimensions({ width, height });
					setStrokeDashLength(pathLength);
				} catch (_error) {
					const estimatedWidth = text.length * (isMobile ? 35 : 45);
					setTextDimensions({
						width: Math.max(300, estimatedWidth),
						height: isMobile ? 80 : 100,
					});
					setStrokeDashLength(text.length * (isMobile ? 40 : 50));
				}
			}
		}, [text, isMobile]);

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
			if (triggerOnView) {
				if (isIntersecting) {
					setHasTriggered(true);
					setAnimationKey((prev) => prev + 1);
				} else {
					setHasTriggered(false);
				}
			}
		}, [isIntersecting, triggerOnView]);

		const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
			const clientX = 'touches' in e ? e.touches[0]?.clientX || 0 : e.clientX;
			const clientY = 'touches' in e ? e.touches[0]?.clientY || 0 : e.clientY;
			setCursor({ x: clientX, y: clientY });
		}, []);

		const handlePointerEnter = useCallback(() => {
			setHovered(true);
		}, []);

		const handlePointerLeave = useCallback(() => {
			setHovered(false);
		}, []);

		const combinedRef = useCallback(
			(node: SVGSVGElement | null) => {
				svgRef.current = node;
				if (intersectionRef.current !== node) {
					(intersectionRef as React.RefObject<SVGSVGElement | null>).current = node;
				}
			},
			[intersectionRef],
		);

		const textRefCallback = useCallback((node: SVGTextElement | null) => {
			textRef.current = node;
		}, []);

		const shouldAnimate = useMemo(
			() => (triggerOnView ? hasTriggered : true),
			[triggerOnView, hasTriggered],
		);

		const fontSize = isMobile ? '3rem' : '4.5rem';
		const strokeWidth = isMobile ? '0.2' : '0.3';

		return (
			<svg
				ref={combinedRef}
				width="100%"
				height="100%"
				viewBox={`0 0 ${textDimensions.width} ${textDimensions.height}`}
				xmlns="http://www.w3.org/2000/svg"
				onMouseEnter={handlePointerEnter}
				onMouseLeave={handlePointerLeave}
				onMouseMove={handlePointerMove}
				onTouchStart={handlePointerEnter}
				onTouchEnd={handlePointerLeave}
				onTouchMove={handlePointerMove}
				className="touch-manipulation select-none"
				style={{
					minHeight: isMobile ? '60px' : '80px',
					maxWidth: '100%',
				}}
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
						r={isMobile ? '30%' : '20%'}
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
					key={`hover-text-${animationKey}`}
					ref={textRefCallback}
					x="50%"
					y="50%"
					textAnchor="middle"
					dominantBaseline="middle"
					strokeWidth={strokeWidth}
					className="fill-transparent stroke-neutral-700/40 font-bold font-geist-sans dark:stroke-neutral-400/50"
					style={{ fontSize }}
					initial={{ opacity: 0 }}
					animate={{ opacity: hovered ? 0.7 : 0 }}
					transition={{ duration: 0.2 }}
				>
					{text}
				</motion.text>

				<motion.text
					key={`stroke-text-${animationKey}`}
					x="50%"
					y="50%"
					textAnchor="middle"
					dominantBaseline="middle"
					strokeWidth={strokeWidth}
					className="fill-transparent stroke-neutral-700/40 font-bold font-geist-sans dark:stroke-neutral-400/50"
					style={{ fontSize }}
					initial={{
						strokeDashoffset: strokeDashLength,
						strokeDasharray: strokeDashLength,
					}}
					animate={
						shouldAnimate
							? {
									strokeDashoffset: 0,
									strokeDasharray: strokeDashLength,
								}
							: {
									strokeDashoffset: strokeDashLength,
									strokeDasharray: strokeDashLength,
								}
					}
					transition={{
						duration: isMobile ? 3 : 4,
						ease: 'easeInOut',
						delay: shouldAnimate ? 0.5 : 0,
					}}
				>
					{text}
				</motion.text>

				<motion.text
					key={`gradient-text-${animationKey}`}
					x="50%"
					y="50%"
					textAnchor="middle"
					dominantBaseline="middle"
					stroke="url(#textGradient)"
					strokeWidth={strokeWidth}
					mask="url(#textMask)"
					className="fill-transparent font-bold font-geist-sans"
					style={{ fontSize }}
					initial={{ opacity: 0 }}
					animate={{ opacity: shouldAnimate ? 1 : 0 }}
					transition={{
						duration: 0.5,
						delay: shouldAnimate ? 1 : 0,
						ease: 'easeInOut',
					}}
				>
					{text}
				</motion.text>
			</svg>
		);
	},
);
