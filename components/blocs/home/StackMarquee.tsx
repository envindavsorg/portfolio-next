import type React from 'react';
import { memo, useMemo } from 'react';
import { FadeIn } from '@/components/blocs/FadeIn';
import {
	Marquee,
	MarqueeContent,
	MarqueeFade,
	MarqueeItem,
} from '@/components/ui/Marquee';
import { type Stack, stack } from '@/resources/stack';

export const StackMarquee = memo((): React.JSX.Element => {
	const stackItemsMemo: React.JSX.Element[] = useMemo(
		() =>
			stack.map(({ icon: Icon, title }: Stack, index) => (
				<MarqueeItem key={`${title}-${index}`}>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800">
						<Icon className="size-7 shrink-0 md:size-8" />
						<p className="sr-only">{title}</p>
					</div>
				</MarqueeItem>
			)),
		[],
	);

	return (
		<FadeIn className="my-12" asChild>
			<div className="flex flex-col gap-y-4">
				<Marquee>
					<MarqueeFade side="left" />
					<MarqueeFade side="right" />
					<MarqueeContent direction="left">{stackItemsMemo}</MarqueeContent>
				</Marquee>
				<Marquee>
					<MarqueeFade side="left" />
					<MarqueeFade side="right" />
					<MarqueeContent direction="right">{stackItemsMemo}</MarqueeContent>
				</Marquee>
			</div>
		</FadeIn>
	);
});
