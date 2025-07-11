import type { MDXComponents } from 'mdx/types';
import Image, { type ImageProps } from 'next/image';
import { Link } from 'next-view-transitions';
import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { memo, useMemo } from 'react';
import { highlight } from 'sugar-high';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import { PackageManager } from '@/components/mdx/PackageManager';
import { TerminalCommand } from '@/components/mdx/TerminalCommand';
import {
	SandboxCodeEditor,
	SandboxConsole,
	SandboxFileExplorer,
	SandboxLayout,
	SandboxPreview,
	SandboxProvider,
	SandboxTabs,
	SandboxTabsContent,
	SandboxTabsList,
	SandboxTabsTrigger,
} from '@/components/ui/Sandbox';

const MDXLink = memo(({ href, children, ...props }: AnchorProps): React.JSX.Element => {
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
	({
		className,
		children,
		...props
	}: ComponentPropsWithoutRef<'code'>): React.JSX.Element => {
		const language = useMemo(() => {
			const match = /language-(\w+)/.exec(className || '');
			return match ? match[1] : null;
		}, [className]);

		const codeHTML = useMemo(() => {
			return highlight(children as string);
		}, [children]);

		const shouldUseCodeBlock = useMemo(() => {
			const codeString = children as string;
			return (
				language &&
				language !== 'bash' &&
				language !== 'text' &&
				language !== 'js' &&
				language !== 'javascript' &&
				codeString.includes('\n') &&
				codeString.length > 50
			);
		}, [language, children]);

		const shouldUseSandbox = useMemo(() => {
			const codeString = children as string;
			return (
				(language === 'js' || language === 'javascript') &&
				codeString.includes('\n') &&
				codeString.length > 30
			);
		}, [language, children]);

		const codeString = children as string;
		const files = useMemo(
			() => ({
				'/index.js': codeString,
				'/helper.js': `// Auto-display helper (optimized)
if (typeof document !== 'undefined') {
	const originalLog = console.log;
	const outputs = [];
	let hasOutput = false;
	let isDestroyed = false;
	let updateTimeout = null;
	let checkCount = 0;
	const MAX_CHECKS = 15; // Reduced from 50
	
	console.log = (...args) => {
		originalLog(...args);
		if (isDestroyed) return;
		outputs.push(args.map(arg => 
			typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
		).join(' '));
		hasOutput = true;
		debouncedUpdate();
	};

	function debouncedUpdate() {
		if (updateTimeout) clearTimeout(updateTimeout);
		updateTimeout = setTimeout(updateOutput, 100);
	}

	function updateOutput() {
		if (isDestroyed) return;
		
		const outputDiv = document.getElementById('output');
		if (!outputDiv) return;
		
		let content = '';
		
		// Add console output if any
		if (outputs.length > 0) {
			content += \`<h3>📋 Console Output:</h3><pre style="background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto; margin-bottom: 15px;">\${outputs.join('\\n')}</pre>\`;
		}
		
		// Optimized DOM content check - only if no console output and early checks
		if (!hasOutput && checkCount < 3) {
			const visibleContent = Array.from(document.body.children)
				.filter(el => !['SCRIPT', 'STYLE', 'META', 'TITLE', 'HEAD'].includes(el.tagName) && el.id !== 'output')
				.map(el => el.outerHTML)
				.join('');
			
			if (visibleContent?.trim()) {
				content += \`<h3>📄 Page Content:</h3><div style="background: #fff; padding: 10px; border: 1px solid #dee2e6; border-radius: 4px;">\${visibleContent}</div>\`;
			}
		}
		
		// Update the output div
		if (content) {
			outputDiv.innerHTML = content;
		} else if (!hasOutput && checkCount < 3) {
			outputDiv.innerHTML = \`<h3>🚀 Running JavaScript...</h3><p style="margin: 0; color: #6c757d;">Output will appear here</p>\`;
		}
	}

	// Optimized checking with exponential backoff
	function scheduleCheck() {
		if (isDestroyed || checkCount >= MAX_CHECKS) return;
		checkCount++;
		updateOutput();
		// Exponential backoff with max delay
		const delay = Math.min(100 * Math.pow(1.5, checkCount), 1000);
		setTimeout(scheduleCheck, delay);
	}

	// Initial run
	setTimeout(() => {
		if (!isDestroyed) {
			updateOutput();
			scheduleCheck();
		}
	}, 100);
	
	// Cleanup on page unload
	window.addEventListener('beforeunload', () => {
		isDestroyed = true;
		if (updateTimeout) clearTimeout(updateTimeout);
	});
}`,
				'/index.html': `<!DOCTYPE html>
<html>
<head>
	<title>JavaScript Example</title>
	<style>
		body { 
			font-family: Arial, sans-serif; 
			padding: 20px; 
			background: #fff;
			margin: 0;
		}
		#output { 
			margin-top: 20px; 
			padding: 15px; 
			background: #f8f9fa; 
			border-radius: 6px; 
			border: 1px solid #dee2e6;
			min-height: 40px;
		}
		#output h3 {
			margin: 0 0 10px 0;
			color: #495057;
			font-size: 16px;
		}
		#output pre {
			margin: 0;
			font-family: 'Courier New', monospace;
			font-size: 14px;
			line-height: 1.4;
			color: #212529;
		}
		.demo-content {
			margin-top: 20px;
			padding: 15px;
			border: 1px solid #dee2e6;
			border-radius: 6px;
			background: white;
		}
	</style>
</head>
<body>
	<div id="output">
		<h3>🚀 Running JavaScript...</h3>
		<p style="margin: 0; color: #6c757d;">Output will appear here</p>
	</div>
	<script src="helper.js"></script>
	<script src="index.js"></script>
</body>
</html>`,
			}),
			[codeString],
		);

		if (shouldUseSandbox) {
			return (
				<div className="my-6">
					<SandboxProvider
						files={files}
						template="vanilla"
						options={{
							visibleFiles: ['/index.js'],
							activeFile: '/index.js',
						}}
					>
						<SandboxTabs defaultValue="code" className="h-[400px]">
							<SandboxTabsList>
								<SandboxTabsTrigger value="code">📄 JavaScript</SandboxTabsTrigger>
								<SandboxTabsTrigger value="preview">🔍 Preview</SandboxTabsTrigger>
								<SandboxTabsTrigger value="console">📟 Console</SandboxTabsTrigger>
							</SandboxTabsList>
							<SandboxTabsContent value="code">
								<SandboxCodeEditor />
							</SandboxTabsContent>
							<SandboxTabsContent value="preview">
								<SandboxPreview />
							</SandboxTabsContent>
							<SandboxTabsContent value="console">
								<SandboxConsole />
							</SandboxTabsContent>
						</SandboxTabs>
					</SandboxProvider>
				</div>
			);
		}

		if (shouldUseCodeBlock) {
			return (
				// biome-ignore lint/correctness/noChildrenProp: explanation
				<CodeBlock language={language!} children={children as string} {...props} />
			);
		}

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

			return <TerminalCommand command={codeString} {...props} />;
		}

		return (
			<code
				dangerouslySetInnerHTML={{ __html: codeHTML }}
				{...props}
				style={{ display: 'block', overflowX: 'auto' }}
			/>
		);
	},
);

MDXCode.displayName = 'MDXCode';

const MDXImage = memo(
	(props: ImageProps): React.JSX.Element => (
		<Image
			{...props}
			loading="lazy"
			sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			style={{
				width: '100%',
				height: 'auto',
			}}
		/>
	),
);

MDXImage.displayName = 'MDXImage';

// Simple Sandbox wrapper for MDX
const MDXSandbox = memo(
	({
		files,
		template = 'vanilla',
		height = '400px',
		showTabs = true,
		...props
	}: {
		files: Record<string, string>;
		template?: 'vanilla' | 'react' | 'vue' | 'angular' | 'node';
		height?: string;
		showTabs?: boolean;
	}): React.JSX.Element => {
		return (
			<div className="my-6" style={{ height }}>
				<SandboxProvider
					files={files}
					template={template}
					options={{
						visibleFiles: Object.keys(files),
						activeFile: Object.keys(files)[0],
					}}
					{...props}
				>
					{showTabs ? (
						<SandboxTabs defaultValue="code" className="h-full">
							<SandboxTabsList>
								<SandboxTabsTrigger value="code">Code</SandboxTabsTrigger>
								<SandboxTabsTrigger value="preview">Preview</SandboxTabsTrigger>
								<SandboxTabsTrigger value="console">Console</SandboxTabsTrigger>
							</SandboxTabsList>
							<SandboxTabsContent value="code">
								<SandboxCodeEditor />
							</SandboxTabsContent>
							<SandboxTabsContent value="preview">
								<SandboxPreview />
							</SandboxTabsContent>
							<SandboxTabsContent value="console">
								<SandboxConsole />
							</SandboxTabsContent>
						</SandboxTabs>
					) : (
						<SandboxLayout>
							<SandboxCodeEditor />
							<SandboxPreview />
						</SandboxLayout>
					)}
				</SandboxProvider>
			</div>
		);
	},
);

MDXSandbox.displayName = 'MDXSandbox';

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
	// Sandbox components
	Sandbox: MDXSandbox,
	SandboxProvider,
	SandboxLayout,
	SandboxTabs,
	SandboxTabsList,
	SandboxTabsTrigger,
	SandboxTabsContent,
	SandboxCodeEditor,
	SandboxPreview,
	SandboxConsole,
	SandboxFileExplorer,
};

export const useMDXComponents = (otherComponents: MDXComponents): MDXComponents => ({
	...otherComponents,
	...components,
	Image: MDXImage,
});
