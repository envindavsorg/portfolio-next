'use client';

import type {
	CodeEditorProps,
	PreviewProps,
	SandpackLayoutProps,
	SandpackProviderProps,
} from '@codesandbox/sandpack-react';
import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider,
} from '@codesandbox/sandpack-react';
import type {
	ButtonHTMLAttributes,
	ComponentProps,
	HTMLAttributes,
	ReactNode,
} from 'react';
import {
	createContext,
	lazy,
	memo,
	Suspense,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { cn } from '@/lib/utils';

// Lazy load option for improved performance
const LazyComponents = {
	Provider: lazy(() =>
		import('@codesandbox/sandpack-react').then((m) => ({ default: m.SandpackProvider })),
	),
	CodeEditor: lazy(() =>
		import('@codesandbox/sandpack-react').then((m) => ({
			default: m.SandpackCodeEditor,
		})),
	),
	Console: lazy(() =>
		import('@codesandbox/sandpack-react').then((m) => ({ default: m.SandpackConsole })),
	),
	Preview: lazy(() =>
		import('@codesandbox/sandpack-react').then((m) => ({ default: m.SandpackPreview })),
	),
	FileExplorer: lazy(() =>
		import('@codesandbox/sandpack-react').then((m) => ({
			default: m.SandpackFileExplorer,
		})),
	),
	Layout: lazy(() =>
		import('@codesandbox/sandpack-react').then((m) => ({ default: m.SandpackLayout })),
	),
};

export type SandboxProviderProps = SandpackProviderProps & {
	lazy?: boolean;
};

export const SandboxProvider = memo(
	({ className, lazy = false, ...props }: SandboxProviderProps): ReactNode => {
		if (lazy) {
			return (
				<div className={cn('size-full', className)}>
					<Suspense
						fallback={<div className="h-full animate-pulse rounded-lg bg-muted" />}
					>
						<LazyComponents.Provider className="!size-full !max-h-none" {...props} />
					</Suspense>
				</div>
			);
		}

		return (
			<div className={cn('size-full', className)}>
				<SandpackProvider className="!size-full !max-h-none" {...props} />
			</div>
		);
	},
);

SandboxProvider.displayName = 'SandboxProvider';

export type SandboxLayoutProps = SandpackLayoutProps;

export const SandboxLayout = memo(
	({ className, ...props }: SandpackLayoutProps): ReactNode => (
		<SandpackLayout
			className={cn('!rounded-none !border-none !bg-transparent !h-full', className)}
			{...props}
		/>
	),
);

SandboxLayout.displayName = 'SandboxLayout';

export type SandboxTabsContextValue = {
	selectedTab: string | undefined;
	setSelectedTab: (value: string) => void;
};

const SandboxTabsContext = createContext<SandboxTabsContextValue | undefined>(undefined);

const useSandboxTabsContext = () => {
	const context = useContext(SandboxTabsContext);

	if (!context) {
		throw new Error('SandboxTabs components must be used within a SandboxTabsProvider');
	}

	return context;
};

export type SandboxTabsProps = HTMLAttributes<HTMLDivElement> & {
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
};

export const SandboxTabs = memo(
	({
		className,
		defaultValue,
		value,
		onValueChange,
		...props
	}: SandboxTabsProps): ReactNode => {
		const [selectedTab, setSelectedTabState] = useState(value || defaultValue);

		useEffect(() => {
			if (value !== undefined) {
				setSelectedTabState(value);
			}
		}, [value]);

		const setSelectedTab = useCallback(
			(newValue: string) => {
				if (value === undefined) {
					setSelectedTabState(newValue);
				}
				onValueChange?.(newValue);
			},
			[value, onValueChange],
		);

		const contextValue = useMemo(
			() => ({ selectedTab, setSelectedTab }),
			[selectedTab, setSelectedTab],
		);

		return (
			<SandboxTabsContext.Provider value={contextValue}>
				<div
					className={cn(
						'group relative flex size-full flex-col overflow-hidden rounded-lg border text-sm',
						className,
					)}
					{...props}
					data-selected={selectedTab}
				>
					{props.children}
				</div>
			</SandboxTabsContext.Provider>
		);
	},
);

SandboxTabs.displayName = 'SandboxTabs';

export type SandboxTabsListProps = HTMLAttributes<HTMLDivElement>;

export const SandboxTabsList = memo(
	({ className, ...props }: SandboxTabsListProps): ReactNode => (
		<div
			className={cn(
				'inline-flex gap-1.5 w-full shrink-0 items-center justify-start border-b bg-white/20 py-1 pr-1 pl-3',
				className,
			)}
			role="tablist"
			{...props}
		/>
	),
);

SandboxTabsList.displayName = 'SandboxTabsList';

export type SandboxTabsTriggerProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'onClick'
> & {
	value: string;
};

export const SandboxTabsTrigger = memo(
	({ className, value, ...props }: SandboxTabsTriggerProps): ReactNode => {
		const { selectedTab, setSelectedTab } = useSandboxTabsContext();

		const handleClick = useCallback(() => {
			setSelectedTab(value);
		}, [setSelectedTab, value]);

		const isSelected = selectedTab === value;
		const dataState = isSelected ? 'active' : 'inactive';

		return (
			<button
				aria-selected={isSelected}
				className={cn(
					'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1 font-medium text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
					className,
				)}
				data-state={dataState}
				onClick={handleClick}
				role="tab"
				{...props}
			/>
		);
	},
);

SandboxTabsTrigger.displayName = 'SandboxTabsTrigger';

export type SandboxTabsContentProps = HTMLAttributes<HTMLDivElement> & {
	value: string;
};

export const SandboxTabsContent = memo(
	({ className, value, ...props }: SandboxTabsContentProps): ReactNode => {
		const { selectedTab } = useSandboxTabsContext();

		const isActive = selectedTab === value;
		const ariaHidden = !isActive;
		const dataState = isActive ? 'active' : 'inactive';

		return (
			<div
				aria-hidden={ariaHidden}
				className={cn(
					'flex-1 overflow-y-auto ring-offset-background transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
					isActive
						? 'h-auto w-auto opacity-100'
						: 'pointer-events-none absolute h-0 w-0 opacity-0',
					className,
				)}
				data-state={dataState}
				role="tabpanel"
				{...props}
			/>
		);
	},
);

SandboxTabsContent.displayName = 'SandboxTabsContent';

export type SandboxCodeEditorProps = CodeEditorProps;

export const SandboxCodeEditor = memo(
	({ showTabs = false, ...props }: SandboxCodeEditorProps): ReactNode => (
		<SandpackCodeEditor showTabs={showTabs} {...props} />
	),
);

SandboxCodeEditor.displayName = 'SandboxCodeEditor';

export type SandboxConsoleProps = Parameters<typeof SandpackConsole>[0];

export const SandboxConsole = memo(
	({ className, ...props }: SandboxConsoleProps): ReactNode => (
		<SandpackConsole className={cn('h-full', className)} {...props} />
	),
);

SandboxConsole.displayName = 'SandboxConsole';

export type SandboxPreviewProps = PreviewProps & {
	className?: string;
};

export const SandboxPreview = memo(
	({
		className,
		showOpenInCodeSandbox = false,
		...props
	}: SandboxPreviewProps): ReactNode => (
		<SandpackPreview
			className={cn('h-full', className)}
			showOpenInCodeSandbox={showOpenInCodeSandbox}
			{...props}
		/>
	),
);

SandboxPreview.displayName = 'SandboxPreview';

export type SandboxFileExplorerProps = ComponentProps<typeof SandpackFileExplorer>;

export const SandboxFileExplorer = memo(
	({
		autoHiddenFiles = true,
		className,
		...props
	}: SandboxFileExplorerProps): ReactNode => (
		<SandpackFileExplorer
			autoHiddenFiles={autoHiddenFiles}
			className={cn('h-full', className)}
			{...props}
		/>
	),
);

SandboxFileExplorer.displayName = 'SandboxFileExplorer';
