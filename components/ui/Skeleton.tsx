import type React from 'react';
import { cn } from '@/lib/utils';

export const Skeleton = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
	<div className={cn('animate-pulse', className)} {...props} />
);
