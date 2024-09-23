'use client';

import { CSSIcon } from '@/components/icons/CSS';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { JsonIcon } from '@/components/icons/Json';
import { MarkdownIcon } from '@/components/icons/Markdown';
import { NotionIcon } from '@/components/icons/Notion';
import { PugIcon } from '@/components/icons/Pug';
import { SassIcon } from '@/components/icons/Sass';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type React from 'react';

type Languages = {
	name: string;
	percent: number;
	color: string;
	items?: number;
};

interface Props {
	languages: Languages[];
}

export const MostUsedLanguagesCharts = ({ languages }: Props) => {
	const content: Languages[] = languages
		.slice(0, 5)
		.map(({ name, percent }) => ({
			name: name,
			percent: Math.round(percent),
			color: 'bg-orange-600 dark:bg-yellow-300',
		}));

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
			className="grid min-h-[200px] grid-cols-1 gap-3 md:gap-6"
			style={{
				gridTemplateColumns: `repeat(${content.length}, minmax(0, 1fr))`,
			}}
		>
			{content.map(({ name, percent, color }, idx: number) => {
				const height: string | number = percent
					? ((percent / reducedContent) * 100).toFixed(2)
					: 0;

				const Icon: (
					props: React.SVGProps<SVGSVGElement>,
				) => React.JSX.Element = IconMapping[name] || TypeScriptIcon;

				return (
					<div key={`${name}-${idx}`}>
						<div className="relative flex size-full items-end overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
							<motion.span
								animate={{ height: `${height}%` }}
								className={cn('relative z-0 w-full', color)}
								transition={{ type: 'spring' }}
							/>
							<div className="absolute inset-0 flex items-center justify-center">
								<Icon className="size-8 shrink-0 sm:size-10" />
							</div>
						</div>
						<div className="mt-2 flex flex-col items-center justify-center gap-y-1">
							<p className="font-bold font-geist-sans text-base tracking-tighter">
								{TextMapping[name] || name}
							</p>
							<p className="font-geist-sans font-medium text-xs tracking-tighter">
								({percent.toFixed(2)}%)
							</p>
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
	Text: NotionIcon,
	JSON: JsonIcon,
};

const TextMapping: Record<string, string> = {
	TypeScript: 'TS',
	Pug: 'Pug',
	JavaScript: 'JS',
	SCSS: 'SCSS',
	CSS: 'CSS',
	MDX: 'MDX',
	Text: 'Notion',
	JSON: 'JSON',
};
