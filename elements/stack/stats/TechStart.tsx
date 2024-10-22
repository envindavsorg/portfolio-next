import { FadeIn } from '@/components/animations/FadeIn';
import { type Stack, preferred } from '@/resources/stack';
import type React from 'react';

export const TechStart = (): React.JSX.Element => (
	<FadeIn>
		<p className="leading-8">
			Voici les <span className="font-bold text-theme">technologies</span> avec
			lesquelles je suis le plus <span className="font-bold">productif</span>,
			et avec lesquelles je
			<span className="font-bold">démarre</span> chaque projet, sans me poser
			des questions.
		</p>

		<div className="mt-6 flex w-full flex-row flex-wrap gap-3">
			{preferred.map(({ icon: Icon, title }: Stack, idx: number) => (
				<div
					key={`${title}-${idx}`}
					className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
				>
					<Icon className="size-7 shrink-0 md:size-8" />
					<p className="sr-only">{title}</p>
				</div>
			))}
		</div>
	</FadeIn>
);
