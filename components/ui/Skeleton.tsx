import { cn } from '@/lib/utils';
import type React from 'react';

export const Skeleton = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
	<div className={cn('animate-pulse', className)} {...props} />
);
