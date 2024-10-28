import { cn } from '@/lib/utils';
import type React from 'react';

interface MarqueeProps {
	className?: string;
	reverse?: boolean;
	pauseOnHover?: boolean;
	children?: React.ReactNode;
	vertical?: boolean;
	repeat?: number;
	[key: string]: any;
}

export const Marquee = ({
	className,
	reverse,
	pauseOnHover = false,
	children,
	vertical = false,
	repeat = 4,
	...props
}: MarqueeProps): React.JSX.Element => (
	<div
		{...props}
		className={cn(
			'group relative flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
			{
				'flex-row': !vertical,
				'flex-col': vertical,
			},
			className,
		)}
	>
		{/* Left Blur */}
		<div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-gradient-to-r from-white/80 to-transparent dark:from-black/80" />

		{/* Right Blur */}
		<div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l from-white/80 to-transparent dark:from-black/80" />

		{Array(repeat)
			.fill(0)
			.map((_, i) => (
				<div
					key={i}
					className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
						'animate-marquee flex-row': !vertical,
						'animate-marquee-vertical flex-col': vertical,
						'group-hover:[animation-play-state:paused]': pauseOnHover,
						'[animation-direction:reverse]': reverse,
					})}
				>
					{children}
				</div>
			))}
	</div>
);
