import { cn } from '@/lib/utils';
import type React from 'react';

export const Skeleton = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('animate-pulse', className)} {...props} />
);
