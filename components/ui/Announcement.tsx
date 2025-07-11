import type React from 'react';
import type { ComponentProps, HTMLAttributes } from 'react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export type AnnouncementProps = ComponentProps<typeof Badge> & {
	themed?: boolean;
};

export const Announcement = ({
	variant = 'outline',
	themed = false,
	className,
	...props
}: AnnouncementProps): React.JSX.Element => (
	<Badge
		className={cn(
			'group max-w-full gap-2 rounded-full bg-background px-3 py-0.5 font-medium shadow-sm transition-all',
			'hover:shadow-md',
			themed && 'announcement-themed border-foreground/5',
			className,
		)}
		variant={variant}
		{...props}
	/>
);

export type AnnouncementTagProps = HTMLAttributes<HTMLDivElement>;

export const AnnouncementTag = ({
	className,
	...props
}: AnnouncementTagProps): React.JSX.Element => (
	<div
		className={cn(
			'-ml-2.5 shrink-0 truncate rounded-full bg-theme px-2.5 py-1 font-semibold text-background text-xs',
			'group-[.announcement-themed]:bg-background/60',
			className,
		)}
		{...props}
	/>
);

export type AnnouncementTitleProps = HTMLAttributes<HTMLDivElement>;

export const AnnouncementTitle = ({
	className,
	...props
}: AnnouncementTitleProps): React.JSX.Element => (
	<div className={cn('flex items-center gap-1 truncate py-1', className)} {...props} />
);
