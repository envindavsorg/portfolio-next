'use client';

import { CSSIcon } from '@/components/icons/CSS';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { JsonIcon } from '@/components/icons/Json';
import { MarkdownIcon } from '@/components/icons/Markdown';
import { PugIcon } from '@/components/icons/Pug';
import { SassIcon } from '@/components/icons/Sass';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { MotionSpan } from '@/components/motion/MotionSpan';
import { cn } from '@/lib/utils';
import type React from 'react';

type Languages = {
	name: string;
	percent: number;
	color: string;
	items?: number;
};

interface UsedLanguagesChartsProps {
	languages: Languages[];
	className?: string;
}

export const UsedLanguagesCharts = ({
	languages,
	className,
}: UsedLanguagesChartsProps) => {
	const data: Languages[] = languages
		.slice(0, 5)
		.map(({ name, percent }: Languages) => ({
			name: name,
			percent: percent,
			color: 'bg-orange-600 dark:bg-yellow-300',
		}));

	const content = data.reduce<Languages[]>((acc, curr) => {
		if (curr.name === 'Jade' || curr.name === 'Pug') {
			const existing: Languages | undefined = acc.find(
				(item: Languages) => item.name === 'Pug',
			);

			if (existing) {
				existing.percent += curr.percent;
			} else {
				acc.push({
					name: 'Pug',
					percent: curr.percent,
					color: curr.color,
				});
			}
		} else {
			acc.push(curr);
		}

		return acc;
	}, []);

	const scaledContent = content.map((item) => ({
		...item,
		items:
			(item.percent * 100) / content.reduce((acc, cv) => acc + cv.percent, 0),
	}));

	const reducedContent: number = scaledContent.reduce(
		(acc, cv) => acc + cv.items,
		0,
	);

	return (
		<div
			className={cn('grid grid-cols-1 gap-3 md:gap-6', className)}
			style={{
				gridTemplateColumns: `repeat(${content.length}, minmax(0, 1fr))`,
			}}
		>
			{content.map(({ name, percent, color }: Languages, idx: number) => {
				const height: string | number = percent
					? ((percent / reducedContent) * 100).toFixed(2)
					: 0;

				const Icon: (
					props: React.SVGProps<SVGSVGElement>,
				) => React.JSX.Element = IconMapping[name] || TypeScriptIcon;

				return (
					<div className="h-52" key={`${name}-${idx}`}>
						<div className="relative flex size-full items-end overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
							<MotionSpan
								animate={{ height: `${height}%` }}
								className={cn('relative z-0 w-full', color)}
								transition={{ type: 'spring' }}
							/>
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-y-3">
								<Icon className="size-8 shrink-0 sm:size-10" />
								<div className="flex flex-col items-center justify-center gap-y-0.5 rounded-md border border-neutral-200 bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-800">
									<p className="font-bold font-geist-sans text-sm tracking-tighter">
										{TextMapping[name] || name}
									</p>
									<p className="font-bold text-[10px] tracking-tighter">
										({percent.toFixed(2)}%)
									</p>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

type IconMappingType = {
	[key: string]: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
};

const IconMapping: IconMappingType = {
	TypeScript: TypeScriptIcon,
	Pug: PugIcon,
	JavaScript: JavaScriptIcon,
	SCSS: SassIcon,
	CSS: CSSIcon,
	MDX: MarkdownIcon,
	JSON: JsonIcon,
};

const TextMapping: Record<string, string> = {
	TypeScript: 'TS',
	Pug: 'Pug',
	JavaScript: 'JS',
	SCSS: 'SCSS',
	CSS: 'CSS',
	MDX: 'MDX',
	JSON: 'JSON',
};
