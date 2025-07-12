'use client';

import Image from 'next/image';
import type { ComponentProps } from 'react';
import { memo, useState } from 'react';
import { useResourceHint } from '@/components/providers/ResourceHintsProvider';
import { cn } from '@/lib/utils';

interface LazyImageProps extends Omit<ComponentProps<typeof Image>, 'onLoad' | 'onError'> {
	fallbackSrc?: string;
	preload?: boolean;
	showSkeleton?: boolean;
	skeletonClassName?: string;
}

const ImageSkeleton = ({ className }: { className?: string }) => (
	<span 
		className={cn(
			'inline-block animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded',
			className
		)} 
	/>
);

export const LazyImage = memo(function LazyImage({
	src,
	alt,
	className,
	fallbackSrc,
	preload = false,
	showSkeleton = true,
	skeletonClassName,
	...props
}: LazyImageProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	// Preload critical images
	useResourceHint(
		'preload',
		typeof src === 'string' ? src : '',
		{ 
			as: 'image',
			condition: preload && typeof src === 'string'
		} as any
	);

	const handleLoad = () => {
		setIsLoading(false);
		setHasError(false);
	};

	const handleError = () => {
		setIsLoading(false);
		setHasError(true);
	};

	// Show skeleton while loading
	if (isLoading && showSkeleton) {
		return (
			<span className="relative inline-block">
				<ImageSkeleton className={cn(className, skeletonClassName)} />
				<Image
					{...props}
					src={src}
					alt={alt}
					className={cn('opacity-0 absolute inset-0', className)}
					onLoad={handleLoad}
					onError={handleError}
				/>
			</span>
		);
	}

	// Show fallback if error and fallback provided
	if (hasError && fallbackSrc) {
		return (
			<Image
				{...props}
				src={fallbackSrc}
				alt={`${alt} (fallback)`}
				className={className}
			/>
		);
	}

	// Show error state if no fallback
	if (hasError) {
		return (
			<span 
				className={cn(
					'inline-flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500 text-sm',
					className
				)}
			>
				Failed to load image
			</span>
		);
	}

	return (
		<Image
			{...props}
			src={src}
			alt={alt}
			className={cn(
				'transition-opacity duration-300',
				isLoading ? 'opacity-0' : 'opacity-100',
				className
			)}
			onLoad={handleLoad}
			onError={handleError}
		/>
	);
});