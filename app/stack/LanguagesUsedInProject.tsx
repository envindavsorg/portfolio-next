import { CSSIcon } from '@/components/icons/CSS';
import { GitIcon } from '@/components/icons/Git';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { MarkdownIcon } from '@/components/icons/Markdown';
import { ShellIcon } from '@/components/icons/Shell';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { Motion } from '@/components/motion';
import { defaultVariants } from '@/components/motion.variants';
import { Card } from '@/components/ui/Card';
import type React from 'react';

type Icons = {
	[key: string]: React.ReactNode;
};

const icons: Icons = {
	Contributions: <GitIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
	TypeScript: <TypeScriptIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
	JavaScript: <JavaScriptIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
	MDX: <MarkdownIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
	CSS: <CSSIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
	Shell: <ShellIcon className="flex-shrink-0 text-3xl md:text-4xl" />,
};

interface Props {
	languages: {
		name: string;
		percentage: number;
	}[];
}

export const LanguagesUsedInProject = ({ languages }: Props) => (
	<Motion asChild variants={defaultVariants}>
		<ul className="grid gap-3 sm:grid-cols-2">
			{languages.map(({ name, percentage }, idx: number) => (
				<li key={`${name}-${idx}`}>
					<Card
						tag="static"
						icon={icons[name]}
						title={
							name.toLowerCase() === 'contributions'
								? `${percentage} au total`
								: `Environ ${percentage.toFixed(2)}%`
						}
						comment={
							name.toLowerCase() === 'contributions'
								? '(nombre de commits)'
								: `en ${name}`
						}
						className="flex flex-row-reverse items-center justify-between gap-3"
					/>
				</li>
			))}
		</ul>
	</Motion>
);
