import type { MDXComponents } from 'mdx/types';
import Image, { type ImageProps } from 'next/image';
import { Link } from 'next-view-transitions';
import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { memo, useMemo } from 'react';
import { highlight } from 'sugar-high';
import { BashIcon } from '@/components/icons/Bash';
import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { ReactIcon } from '@/components/icons/React';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { PackageManager } from '@/components/mdx/PackageManager';
import { TerminalCommand } from '@/components/mdx/TerminalCommand';
import { CopyButton } from '@/components/ui/CopyButton';

const LANGUAGE_ICONS: Record<string, React.ReactNode> = {
	bash: <BashIcon className="size-4 shrink-0" />,
	js: <JavaScriptIcon className="size-4 shrink-0" />,
	javascript: <JavaScriptIcon className="size-4 shrink-0" />,
	ts: <TypeScriptIcon className="size-4 shrink-0" />,
	typescript: <TypeScriptIcon className="size-4 shrink-0" />,
	css: <CSSIcon className="size-4 shrink-0" />,
	tsx: <ReactIcon className="size-4 shrink-0" />,
	jsx: <ReactIcon className="size-4 shrink-0" />,
	html: <HTML5Icon className="size-4 shrink-0" />,
};

const MDXLink = memo(({ href, children, ...props }: AnchorProps) => {
	const className =
		'font-medium text-foreground underline underline-offset-4 hover:text-theme transition-colors duration-200';

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
});

MDXLink.displayName = 'MDXLink';

const MDXCode = memo(
	({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) => {
		const language = useMemo(() => {
			const match = /language-(\w+)/.exec(className || '');
			return match ? match[1] : null;
		}, [className]);

		const codeHTML = useMemo(() => {
			return highlight(children as string);
		}, [children]);

		const icon = useMemo(() => {
			return language ? LANGUAGE_ICONS[language] : null;
		}, [language]);

		if (language === 'text') {
			return (
				<code
					dangerouslySetInnerHTML={{ __html: codeHTML }}
					{...props}
					style={{ display: 'block', overflowX: 'auto' }}
				/>
			);
		}

		if (language === 'bash') {
			const codeString = children as string;

			const isPackageManagerCommand =
				codeString.match(/^(npx|npm|yarn|pnpm|bun)\s+/) ||
				codeString.match(/^(install|add|run|start|dev|build|test|i)\s+/) ||
				codeString.includes('create-') ||
				codeString.match(/^(npm|yarn|pnpm|bun)\s+(install|add|run|start|dev|build|test)/);

			if (isPackageManagerCommand) {
				let baseCommand = codeString;
				baseCommand = baseCommand.replace(/^(npx|npm|yarn|pnpm|bun)\s+/, '').trim();

				if (codeString.match(/^(npm|yarn|pnpm|bun)\s+(run|start|dev|build|test)/)) {
					const match = codeString.match(/^(npm|yarn|pnpm|bun)\s+(.+)/);
					if (match) baseCommand = match[2];
				}

				return <PackageManager baseCommand={baseCommand} {...props} />;
			}

			// Use TerminalCommandSnippet for general terminal commands
			return <TerminalCommand command={codeString} {...props} />;
		}

		return (
			<div className="flex flex-col gap-y-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-x-3">
						{icon}
						<p className="text-sm text-white sm:text-base">
							{language || 'Snippet de code'}
						</p>
					</div>
					<CopyButton
						value={children as string}
						aria-label={`Copier le code ${language || ''}`}
					/>
				</div>
				<code
					dangerouslySetInnerHTML={{ __html: codeHTML }}
					{...props}
					style={{ display: 'block', overflowX: 'auto' }}
				/>
			</div>
		);
	},
);

MDXCode.displayName = 'MDXCode';

const MDXImage = memo((props: ImageProps) => (
	<Image
		{...props}
		loading="lazy"
		sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
		style={{
			width: '100%',
			height: 'auto',
		}}
	/>
));

MDXImage.displayName = 'MDXImage';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components: MDXComponents = {
	h1: memo((props: HeadingProps) => (
		<h1
			className="fade-in mb-6 pt-8 font-extrabold font-hubot text-3xl text-foreground first:pt-0 md:text-4xl"
			{...props}
		/>
	)),
	h2: memo((props: HeadingProps) => (
		<h2
			className="mt-12 mb-6 font-extrabold font-hubot text-2xl text-foreground md:text-3xl"
			{...props}
		/>
	)),
	h3: memo((props: HeadingProps) => (
		<h3
			className="mt-10 mb-4 font-bold font-hubot text-foreground text-xl md:text-2xl"
			{...props}
		/>
	)),
	h4: memo((props: HeadingProps) => (
		<h4
			className="mt-8 mb-3 font-bold font-hubot text-foreground text-lg md:text-xl"
			{...props}
		/>
	)),
	p: memo((props: ParagraphProps) => (
		<p
			className="mb-6 text-base text-neutral-600 leading-8 md:text-lg dark:text-neutral-300"
			{...props}
		/>
	)),
	ol: memo((props: ListProps) => (
		<ol
			className="mb-6 list-decimal space-y-3 pl-6 text-base text-neutral-600 leading-8 md:text-lg dark:text-neutral-300"
			{...props}
		/>
	)),
	ul: memo((props: ListProps) => (
		<ul
			className="mb-6 list-disc space-y-3 pl-6 text-base text-neutral-600 leading-8 md:text-lg dark:text-neutral-300"
			{...props}
		/>
	)),
	li: memo((props: ListItemProps) => <li className="pl-1" {...props} />),
	em: memo((props: ComponentPropsWithoutRef<'em'>) => (
		<em className="font-bold text-theme not-italic" {...props} />
	)),
	strong: memo((props: ComponentPropsWithoutRef<'strong'>) => (
		<strong className="font-extrabold text-foreground" {...props} />
	)),
	a: MDXLink,
	code: MDXCode,
	blockquote: memo((props: BlockquoteProps) => (
		<blockquote
			className="my-8 ml-[0.075em] rounded-r-md border-theme/30 border-l-4 bg-muted/20 py-4 pl-6 text-base text-neutral-600 italic leading-8 md:text-lg dark:text-neutral-300"
			{...props}
		/>
	)),
	hr: memo(() => <hr className="my-12 border-border" />),
};

export const useMDXComponents = (otherComponents: MDXComponents): MDXComponents => ({
	...otherComponents,
	...components,
	Image: MDXImage,
});
