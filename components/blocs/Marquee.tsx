import type React from 'react';
import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
	className?: string;
	reverse?: boolean;
	pauseOnHover?: boolean;
	children?: React.ReactNode;
	vertical?: boolean;
	repeat?: number;
	duration?: string;
	gap?: string;
}

const DEFAULT_CONFIG = {
	duration: '40s',
	gap: '1rem',
	repeat: 4,
} as const;

export const Marquee = memo(
	({
		className,
		reverse = false,
		pauseOnHover = false,
		children,
		vertical = false,
		repeat = DEFAULT_CONFIG.repeat,
		duration = DEFAULT_CONFIG.duration,
		gap = DEFAULT_CONFIG.gap,
		...props
	}: MarqueeProps): React.JSX.Element => {
		const containerClasses = useMemo(
			() =>
				cn(
					'group relative flex overflow-hidden p-2',
					vertical ? 'flex-col' : 'flex-row',
					className,
				),
			[vertical, className],
		);

		const itemClasses = useMemo(
			() =>
				cn(
					'flex shrink-0 justify-around',
					vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
					pauseOnHover && 'group-hover:[animation-play-state:paused]',
					reverse && '[animation-direction:reverse]',
				),
			[vertical, pauseOnHover, reverse],
		);

		const containerStyle = useMemo(
			() => ({
				'--duration': duration,
				'--gap': gap,
				gap: `var(--gap)`,
			}),
			[duration, gap],
		);

		const itemStyle = useMemo(
			() => ({
				gap: `var(--gap)`,
			}),
			[],
		);

		const blurGradients = useMemo(
			() => ({
				left: vertical
					? 'pointer-events-none absolute top-0 left-0 right-0 z-10 h-8 bg-gradient-to-b from-white/80 to-transparent dark:from-black/80'
					: 'pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-gradient-to-r from-white/80 to-transparent dark:from-black/80',
				right: vertical
					? 'pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-8 bg-gradient-to-t from-white/80 to-transparent dark:from-black/80'
					: 'pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l from-white/80 to-transparent dark:from-black/80',
			}),
			[vertical],
		);

		const repeatedItems = useMemo(
			() =>
				Array.from({ length: repeat }, (_, i) => (
					<div key={i} className={itemClasses} style={itemStyle}>
						{children}
					</div>
				)),
			[repeat, itemClasses, itemStyle, children],
		);

		return (
			<div {...props} className={containerClasses} style={containerStyle}>
				{/* Blur Gradients */}
				<div className={blurGradients.left} />
				<div className={blurGradients.right} />

				{repeatedItems}
			</div>
		);
	},
);
