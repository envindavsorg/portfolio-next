'use client';

import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { cn } from '@/lib/utils';
import {
	File as FileIcon,
	Folder as FolderIcon,
	FolderOpen as FolderOpenIcon,
} from '@phosphor-icons/react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import type React from 'react';
import {
	createContext,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

type TreeViewElement = {
	id: string;
	name: string;
	isSelectable?: boolean;
	children?: TreeViewElement[];
};

type TreeContextProps = {
	selectedId: string | undefined;
	expandedItems: string[] | undefined;
	indicator: boolean;
	handleExpand: (id: string) => void;
	selectItem: (id: string) => void;
	setExpandedItems?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
	openIcon?: React.ReactNode;
	closeIcon?: React.ReactNode;
	direction: 'rtl' | 'ltr';
};

const TreeContext: React.Context<TreeContextProps | null> =
	createContext<TreeContextProps | null>(null);

const useTree = (): TreeContextProps => {
	const context: TreeContextProps | null = useContext(TreeContext);
	if (!context) {
		throw new Error('useTree must be used within a TreeProvider');
	}
	return context;
};

interface TreeViewComponentProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

type Direction = 'rtl' | 'ltr' | undefined;

type TreeViewProps = {
	initialSelectedId?: string;
	indicator?: boolean;
	elements?: TreeViewElement[];
	initialExpandedItems?: string[];
	openIcon?: React.ReactNode;
	closeIcon?: React.ReactNode;
} & TreeViewComponentProps;

const Tree = forwardRef<HTMLDivElement, TreeViewProps>(
	(
		{
			className,
			elements,
			initialSelectedId,
			initialExpandedItems,
			children,
			indicator = true,
			openIcon,
			closeIcon,
			dir,
			...props
		}: TreeViewProps,
		ref,
	) => {
		const [selectedId, setSelectedId] = useState<string | undefined>(
			initialSelectedId,
		);
		const [expandedItems, setExpandedItems] = useState<string[] | undefined>(
			initialExpandedItems,
		);

		const selectItem = useCallback((id: string): void => {
			setSelectedId(id);
		}, []);

		const handleExpand = useCallback((id: string): void => {
			setExpandedItems((prev) => {
				if (prev?.includes(id)) {
					return prev.filter((item) => item !== id);
				}
				return [...(prev ?? []), id];
			});
		}, []);

		const expandSpecificTargetedElements = useCallback(
			(elements?: TreeViewElement[], selectId?: string) => {
				if (!elements || !selectId) {
					return;
				}

				const findParent = (
					currentElement: TreeViewElement,
					currentPath: string[] = [],
				): void => {
					const isSelectable: boolean = currentElement.isSelectable ?? true;
					const newPath: string[] = [...currentPath, currentElement.id];

					if (currentElement.id === selectId) {
						if (isSelectable) {
							setExpandedItems((prev) => [...(prev ?? []), ...newPath]);
						} else {
							if (newPath.includes(currentElement.id)) {
								newPath.pop();
								setExpandedItems((prev) => [...(prev ?? []), ...newPath]);
							}
						}

						return;
					}

					if (
						isSelectable &&
						currentElement.children &&
						currentElement.children.length > 0
					) {
						currentElement.children.forEach((child) => {
							findParent(child, newPath);
						});
					}
				};

				elements.forEach((element: TreeViewElement) => {
					findParent(element);
				});
			},
			[],
		);

		useEffect(() => {
			if (initialSelectedId) {
				expandSpecificTargetedElements(elements, initialSelectedId);
			}
		}, [initialSelectedId, elements]);

		const direction: Direction = dir === 'rtl' ? 'rtl' : 'ltr';

		return (
			<TreeContext.Provider
				value={{
					selectedId,
					expandedItems,
					handleExpand,
					selectItem,
					setExpandedItems,
					indicator,
					openIcon,
					closeIcon,
					direction,
				}}
			>
				<div className={cn('size-full', className)}>
					<ScrollArea
						ref={ref}
						className="relative h-full overflow-hidden rounded-md bg-background p-3"
						dir={dir as Direction}
					>
						<AccordionPrimitive.Root
							{...props}
							type="multiple"
							defaultValue={expandedItems}
							value={expandedItems}
							className="flex flex-col gap-1"
							onValueChange={(value) =>
								setExpandedItems((prev) => [...(prev ?? []), value[0]])
							}
							dir={dir as Direction}
						>
							{children}
						</AccordionPrimitive.Root>
					</ScrollArea>
				</div>
			</TreeContext.Provider>
		);
	},
);

Tree.displayName = 'Tree';

const TreeIndicator = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }: React.HTMLAttributes<HTMLDivElement>, ref) => {
	const { direction } = useTree();

	return (
		<div
			dir={direction}
			ref={ref}
			className={cn(
				'absolute left-1.5 h-full w-px rounded-md bg-neutral-200 py-3 duration-300 ease-in-out hover:bg-slate-300 rtl:right-1.5 dark:bg-neutral-700',
				className,
			)}
			{...props}
		/>
	);
});

TreeIndicator.displayName = 'TreeIndicator';

interface FolderComponentProps
	extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

type FolderProps = {
	expandedItems?: string[];
	element: string;
	isSelectable?: boolean;
	isSelect?: boolean;
} & FolderComponentProps;

const Folder = forwardRef<
	HTMLDivElement,
	FolderProps & React.HTMLAttributes<HTMLDivElement>
>(
	(
		{
			className,
			element,
			value,
			isSelectable = true,
			isSelect,
			children,
			...props
		}: FolderProps,
		ref,
	) => {
		const {
			direction,
			handleExpand,
			expandedItems,
			indicator,
			setExpandedItems,
			openIcon,
			closeIcon,
		} = useTree();

		return (
			<AccordionPrimitive.Item
				{...props}
				value={value}
				className="relative h-full overflow-hidden"
				ref={ref}
			>
				<AccordionPrimitive.Trigger
					className={cn(
						'flex items-center gap-1 rounded-md font-bold font-geist-sans text-base',
						className,
						{
							'rounded-md bg-muted': isSelect && isSelectable,
							'cursor-pointer': isSelectable,
							'cursor-not-allowed opacity-50': !isSelectable,
						},
					)}
					disabled={!isSelectable}
					onClick={() => handleExpand(value)}
				>
					{expandedItems?.includes(value)
						? openIcon ?? <FolderOpenIcon className="size-5 shrink-0" />
						: closeIcon ?? <FolderIcon className="size-5 shrink-0" />}
					<span>{element}</span>
				</AccordionPrimitive.Trigger>
				<AccordionPrimitive.Content className="relative h-full overflow-hidden text-base data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
					{element && indicator && <TreeIndicator aria-hidden="true" />}
					<AccordionPrimitive.Root
						dir={direction}
						type="multiple"
						className="ml-5 flex flex-col gap-1 py-1 rtl:mr-5 "
						defaultValue={expandedItems}
						value={expandedItems}
						onValueChange={(value) => {
							setExpandedItems?.((prev) => [...(prev ?? []), value[0]]);
						}}
					>
						{children}
					</AccordionPrimitive.Root>
				</AccordionPrimitive.Content>
			</AccordionPrimitive.Item>
		);
	},
);

Folder.displayName = 'Folder';

const File = forwardRef<
	HTMLButtonElement,
	{
		value: string;
		handleSelect?: (id: string) => void;
		isSelectable?: boolean;
		isSelect?: boolean;
		fileIcon?: React.ReactNode;
	} & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
	(
		{
			value,
			className,
			handleSelect,
			isSelectable = true,
			isSelect,
			fileIcon,
			children,
			...props
		}: {
			value: string;
			className?: string;
			handleSelect?: (id: string) => void;
			isSelectable?: boolean;
			isSelect?: boolean;
			fileIcon?: React.ReactNode;
			children?: React.ReactNode;
		},
		ref,
	) => {
		const { direction, selectedId, selectItem } = useTree();
		const isSelected = isSelect ?? selectedId === value;
		return (
			<AccordionPrimitive.Item value={value} className="relative">
				<AccordionPrimitive.Trigger
					ref={ref}
					{...props}
					dir={direction}
					disabled={!isSelectable}
					aria-label="File"
					className={cn(
						'flex cursor-pointer items-center gap-1 rounded-md pr-1 font-medium text-base duration-200 ease-in-out rtl:pr-0 rtl:pl-1',
						{
							'bg-muted': isSelected && isSelectable,
						},
						isSelectable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50',
						className,
					)}
					onClick={() => selectItem(value)}
				>
					{fileIcon ?? <FileIcon className="size-5 shrink-0" />}
					{children}
				</AccordionPrimitive.Trigger>
			</AccordionPrimitive.Item>
		);
	},
);

File.displayName = 'File';

const CollapseButton = forwardRef<
	HTMLButtonElement,
	{
		elements: TreeViewElement[];
		expandAll?: boolean;
	} & React.HTMLAttributes<HTMLButtonElement>
>(
	(
		{
			className,
			elements,
			expandAll = false,
			children,
			...props
		}: {
			className?: string;
			elements: TreeViewElement[];
			expandAll?: boolean;
			children?: React.ReactNode;
		},
		ref,
	) => {
		const { expandedItems, setExpandedItems } = useTree();

		const expendAllTree = useCallback((elements: TreeViewElement[]) => {
			const expandTree = (element: TreeViewElement) => {
				const isSelectable = element.isSelectable ?? true;

				if (isSelectable && element.children && element.children.length > 0) {
					setExpandedItems?.((prev) => [...(prev ?? []), element.id]);
					element.children.forEach(expandTree);
				}
			};

			elements.forEach(expandTree);
		}, []);

		const closeAll = useCallback(() => {
			setExpandedItems?.([]);
		}, []);

		useEffect(() => {
			if (expandAll) {
				expendAllTree(elements);
			}
		}, [expandAll]);

		return (
			<Button
				variant={'ghost'}
				className="absolute right-2 bottom-1 h-8 w-fit p-1"
				onClick={
					expandedItems && expandedItems.length > 0
						? closeAll
						: () => expendAllTree(elements)
				}
				ref={ref}
				{...props}
			>
				{children}
				<span className="sr-only">
					Actionner le groupe de fichiers et dossiers
				</span>
			</Button>
		);
	},
);

CollapseButton.displayName = 'CollapseButton';

export { CollapseButton, File, Folder, Tree, type TreeViewElement };
