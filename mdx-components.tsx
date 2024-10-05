import { BashIcon } from '@/components/icons/Bash';
import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { ReactIcon } from '@/components/icons/React';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { CopyButton } from '@/components/ui/CopyButton';
import type { MDXComponents } from 'mdx/types';
import { Link } from 'next-view-transitions';
import Image, { type ImageProps } from 'next/image';
import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components: MDXComponents = {
	h1: (props: HeadingProps) => (
		<h1
			className="fade-in mb-0 pt-16 font-geist-sans font-medium text-lg lg:pt-12"
			{...props}
		/>
	),
	h2: (props: HeadingProps) => (
		<h2
			className="mt-8 mb-4 font-bold font-geist-sans text-foreground text-lg"
			{...props}
		/>
	),
	h3: (props: HeadingProps) => (
		<h3 className="mt-8 mb-3 font-medium" {...props} />
	),
	h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
	p: (props: ParagraphProps) => (
		<p className="text-foreground leading-snug" {...props} />
	),
	ol: (props: ListProps) => (
		<ol className="list-decimal space-y-2 pl-5 text-foreground" {...props} />
	),
	ul: (props: ListProps) => (
		<ul className="list-disc space-y-1 pl-5 text-foreground" {...props} />
	),
	li: (props: ListItemProps) => <li className="pl-1" {...props} />,
	em: (props: ComponentPropsWithoutRef<'em'>) => (
		<em className="font-bold text-theme" {...props} />
	),
	strong: (props: ComponentPropsWithoutRef<'strong'>) => (
		<strong className="font-extrabold" {...props} />
	),
	a: ({ href, children, ...props }: AnchorProps) => {
		const className = 'text-blue-500 hover:text-blue-700';
		if (href?.startsWith('/')) {
			return (
				<Link href={href} className={className} {...props}>
					{children}
				</Link>
			);
		}
		if (href?.startsWith('#')) {
			return (
				<a href={href} className={className} {...props}>
					{children}
				</a>
			);
		}
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={className}
				{...props}
			>
				{children}
			</a>
		);
	},
	code: ({
		className,
		children,
		...props
	}: ComponentPropsWithoutRef<'code'>) => {
		const codeHTML: string = highlight(children as string);

		const languageIcons: Record<string, React.ReactNode> = {
			bash: <BashIcon className="size-5 shrink-0" />,
			js: <JavaScriptIcon className="size-5 shrink-0" />,
			ts: <TypeScriptIcon className="size-5 shrink-0" />,
			css: <CSSIcon className="size-5 shrink-0" />,
			tsx: <ReactIcon className="size-5 shrink-0" />,
			html: <HTML5Icon className="size-5 shrink-0" />,
		};
		const match: RegExpExecArray | null = /language-(\w+)/.exec(
			className || '',
		);
		const language: string | null = match ? match[1] : null;

		return (
			<div className="flex flex-col gap-y-6">
				{language !== 'text' && (
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-3">
							{language && languageIcons[language]}
							<p className="font-bold font-geist-sans text-sm sm:text-base">
								{language ? language : 'Snippet de code'}
							</p>
						</div>
						<CopyButton value={children as string} aria-label="Copy code" />
					</div>
				)}
				<code
					dangerouslySetInnerHTML={{ __html: codeHTML }}
					{...props}
					style={{ display: 'block', overflowX: 'auto' }}
				/>
			</div>
		);
	},
	blockquote: (props: BlockquoteProps) => (
		<blockquote
			className="ml-[0.075em] border-gray-300 border-l-3 pl-4 text-gray-700"
			{...props}
		/>
	),
};

export const useMDXComponents = (
	otherComponents: MDXComponents,
): MDXComponents => ({
	...otherComponents,
	...components,
	Image: (props: ImageProps) => <Image {...props} />,
});
