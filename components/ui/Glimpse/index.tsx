'use client';

import type React from 'react';
import type { ComponentProps } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { cn } from '@/lib/utils';

export type GlimpseProps = ComponentProps<typeof HoverCard>;

export const Glimpse = (props: GlimpseProps) => {
	return <HoverCard {...props} />;
};

export type GlimpseContentProps = ComponentProps<typeof HoverCardContent>;

export const GlimpseContent = (props: GlimpseContentProps) => (
	<HoverCardContent {...props} />
);

export type GlimpseTriggerProps = ComponentProps<typeof HoverCardTrigger>;

export const GlimpseTrigger = (props: GlimpseTriggerProps): React.JSX.Element => (
	<HoverCardTrigger {...props} />
);

export type GlimpseTitleProps = ComponentProps<'p'>;

export const GlimpseTitle = ({
	className,
	...props
}: GlimpseTitleProps): React.JSX.Element => {
	return <p className={cn('truncate font-semibold text-sm', className)} {...props} />;
};

export type GlimpseDescriptionProps = ComponentProps<'p'>;

export const GlimpseDescription = ({
	className,
	...props
}: GlimpseDescriptionProps): React.JSX.Element => {
	return (
		<p
			className={cn('line-clamp-2 text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
};

export type GlimpseImageProps = ComponentProps<'img'>;

export const GlimpseImage = ({
	className,
	alt,
	src,
	...props
}: GlimpseImageProps): React.JSX.Element => (
	// biome-ignore lint/performance/noImgElement: "Kibo UI is framework agnostic"
	<img
		alt={alt ?? ''}
		src={src || '/og.jpeg'}
		className={cn(
			'mb-4 aspect-[120/63] w-full rounded-md border object-cover',
			className,
		)}
		{...props}
	/>
);
