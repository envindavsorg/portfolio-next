import { motion } from 'framer-motion';
import React, { type ElementRef, forwardRef, type SVGProps } from 'react';

const LinkIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
	(props, ref) => {
		return (
			<svg
				width="24px"
				height="24px"
				strokeWidth={1.5}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="currentColor"
				ref={ref}
				{...props}
			>
				<path
					d="M21 3h-6m6 0l-9 9m9-9v6"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M21 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6"
					stroke="currentColor"
					strokeLinecap="round"
				/>
			</svg>
		);
	},
);

type TimelineItemProps = {
	post: any;
	drawLine?: boolean;
};

export const TimelineItem = forwardRef<ElementRef<'div'>, TimelineItemProps>(
	(
		{ post: { date, title, text, url, tags }, drawLine = false },
		forwardedRef,
	) => {
		const dateString = date.toLocaleDateString(undefined, {
			month: 'short',
			year: 'numeric',
		});
		return (
			<div className="relative" ref={forwardedRef}>
				<p className="-left-8 -translate-x-full absolute hidden text-gray-500 lg:block dark:text-gray-400">
					{dateString}
				</p>
				{drawLine && (
					<div className="-translate-x-1/2 absolute h-full w-px bg-gray-300" />
				)}
				<div className="-translate-x-1/2 absolute h-4 w-4 translate-y-1 rounded-full border-2 border-gray-300 bg-background ring-8 ring-background" />
				<div className="flex flex-col gap-3 pb-10 pl-10">
					<p className="font-medium text-gray-500 text-sm lg:hidden dark:text-gray-400">
						{dateString}
					</p>
					<div className="flex flex-row flex-wrap gap-3">
						{tags.map((item: any) => (
							<div
								key={item.key}
								className="rounded-lg px-3 py-1 font-medium text-sm"
								style={{ background: item.color }}
							>
								<p className="opacity-90">{item.title}</p>
							</div>
						))}
					</div>
					<div className="space-y-2">
						<h2 className="font-heading font-semibold text-lg">
							{url ? (
								<a
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center underline-offset-4 hover:underline"
								>
									{title}
									<LinkIcon className="ml-1.5 h-4 w-4" strokeWidth={3} />
								</a>
							) : (
								title
							)}
						</h2>
						<div className="space-y-3 leading-relaxed">
							{text.split('\n').map((str: string, idx: number) => (
								<p key={idx}>{str}</p>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	},
);

TimelineItem.displayName = 'TimelineItem';

export const MotionTimelineItem = motion(TimelineItem);
