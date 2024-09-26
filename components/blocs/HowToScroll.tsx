import { cn } from '@/lib/utils';
import type React from 'react';

interface Props {
	className?: string;
}

export const HowToScroll = ({ className }: Props): React.JSX.Element => (
	<div className={cn('flex items-center space-x-3', className)}>
		<svg
			className="size-6 flex-none"
			viewBox="0 0 20 20"
			fill="none"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path
				d="m9.813 9.25.346-5.138a1.276 1.276 0 0 0-2.54-.235L6.75 11.25 5.147 9.327a1.605 1.605 0 0 0-2.388-.085.018.018 0 0 0-.004.019l1.98 4.87a5 5 0 0 0 4.631 3.119h3.885a4 4 0 0 0 4-4v-1a3 3 0 0 0-3-3H9.813Z"
				className="stroke-foreground"
			/>
			<path
				d="M3 5s.35-.47 1.25-.828m9.516-.422c2.078.593 3.484 1.5 3.484 1.5"
				className="stroke-theme"
			/>
		</svg>
		<p className="text-sm">
			Vous pouvez scroller de{' '}
			<span className="font-medium text-theme">gauche</span> à{' '}
			<span className="font-medium text-theme">droite</span> pour voir toutes
			les technologies que j'utilise.
		</p>
	</div>
);
