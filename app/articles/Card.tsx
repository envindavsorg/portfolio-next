import { cn } from '@/lib/utils';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import Link from 'next/link';
import type React from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export const Card = <T extends ElementType = 'div'>({
	as,
	className,
	children,
}: Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
	as?: T;
	className?: string;
}) => {
	const Component: T | string = as ?? 'div';

	return (
		<Component
			className={clsx(className, 'group relative flex flex-col items-start')}
		>
			{children}
		</Component>
	);
};

Card.Link = ({ children, ...props }: ComponentPropsWithoutRef<typeof Link>) => (
	<>
		<div className="-inset-x-4 -inset-y-6 sm:-inset-x-6 absolute z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:rounded-2xl dark:bg-zinc-800/50" />
		<Link {...props}>
			<span className="-inset-x-4 -inset-y-6 sm:-inset-x-6 absolute z-20 sm:rounded-2xl" />
			<span className="relative z-10">{children}</span>
		</Link>
	</>
);

Card.Title = <T extends ElementType = 'h2'>({
	as,
	href,
	children,
}: Omit<ComponentPropsWithoutRef<T>, 'as' | 'href'> & {
	as?: T;
	href?: string;
}) => {
	const Component: T | string = as ?? 'h2';

	return (
		<Component className="font-geist-sans font-semibold text-lg text-foreground sm:text-xl">
			{href ? <Card.Link href={href}>{children}</Card.Link> : children}
		</Component>
	);
};

Card.Description = ({
	children,
}: {
	children: ReactNode;
}) => (
	<p className="prose prose-neutral dark:prose-invert relative z-10 mt-2 text-sm sm:text-base">
		{children}
	</p>
);

Card.Cta = ({ children }: { children: ReactNode }) => (
	<div
		aria-hidden="true"
		className="relative z-10 mt-4 flex items-center font-bold text-sm text-theme sm:text-base"
	>
		{children}
		<CaretRight className="ml-2 size-3 sm:size-4" weight="bold" />
	</div>
);

Card.Eyebrow = <T extends ElementType = 'p'>({
	as,
	decorate = false,
	className,
	children,
	...props
}: Omit<ComponentPropsWithoutRef<T>, 'as' | 'decorate'> & {
	as?: T;
	decorate?: boolean;
}) => {
	const Component: T | string = as ?? 'p';

	return (
		<Component
			className={cn(
				className,
				'relative z-10 order-first mb-3 flex items-center font-medium text-xs text-zinc-400 sm:text-sm dark:text-zinc-500',
				decorate && 'pl-3.5',
			)}
			{...props}
		>
			{decorate && (
				<span
					className="absolute inset-y-0 left-0 flex items-center"
					aria-hidden="true"
				>
					<span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
				</span>
			)}
			{children}
		</Component>
	);
};
