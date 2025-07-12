'use client';

import { ArrowLeftIcon } from '@phosphor-icons/react';
import {
	AnimatePresence,
	MotionConfig,
	type MotionConfigProps,
	motion,
	type Variants,
} from 'motion/react';
import type React from 'react';
import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const TRANSITION: MotionConfigProps['transition'] = {
	type: 'spring',
	bounce: 0.1,
	duration: 0.4,
};

interface FloatingPanelContextType {
	isOpen: boolean;
	openFloatingPanel: (rect: DOMRect) => void;
	closeFloatingPanel: () => void;
	uniqueId: string;
	note: string;
	setNote: (note: string) => void;
	triggerRect: DOMRect | null;
	title: string;
	setTitle: (title: string) => void;
}

const FloatingPanelContext = createContext<FloatingPanelContextType | undefined>(
	undefined,
);

const useFloatingPanel = () => {
	const context = useContext(FloatingPanelContext);
	if (!context) {
		throw new Error('useFloatingPanel must be used within a FloatingPanelProvider');
	}
	return context;
};

const useFloatingPanelLogic = () => {
	const uniqueId = useId();
	const [isOpen, setIsOpen] = useState(false);
	const [note, setNote] = useState('');
	const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
	const [title, setTitle] = useState('');

	const openFloatingPanel = (rect: DOMRect) => {
		setTriggerRect(rect);
		setIsOpen(true);
	};
	const closeFloatingPanel = () => {
		setIsOpen(false);
		setNote('');
	};

	return {
		isOpen,
		openFloatingPanel,
		closeFloatingPanel,
		uniqueId,
		note,
		setNote,
		triggerRect,
		title,
		setTitle,
	};
};

interface FloatingPanelRootProps {
	children: React.ReactNode;
	className?: string;
}

export const FloatingPanelRoot = ({ children, className }: FloatingPanelRootProps) => {
	const floatingPanelLogic = useFloatingPanelLogic();

	return (
		<FloatingPanelContext.Provider value={floatingPanelLogic}>
			<MotionConfig transition={TRANSITION}>
				<div className={cn('relative', className)}>{children}</div>
			</MotionConfig>
		</FloatingPanelContext.Provider>
	);
};

interface FloatingPanelTriggerProps {
	title: string;
	className?: string;
}

export const FloatingPanelTrigger = ({ title }: FloatingPanelTriggerProps) => {
	const { openFloatingPanel, uniqueId, setTitle } = useFloatingPanel();
	const triggerRef = useRef<HTMLButtonElement>(null);

	const handleClick = () => {
		if (triggerRef.current) {
			openFloatingPanel(triggerRef.current.getBoundingClientRect());
			setTitle(title);
		}
	};

	return (
		<motion.button
			ref={triggerRef}
			data-trigger-id={uniqueId}
			layoutId={`floating-panel-trigger-${uniqueId}`}
			className="group relative h-12 cursor-pointer overflow-hidden rounded-md border border-neutral-200/50 px-8 ring-1 ring-black/5 transition-all duration-500 dark:border-neutral-700/50"
			style={{ borderRadius: 8 }}
			onClick={handleClick}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			aria-haspopup="dialog"
			aria-expanded={false}
		>
			<motion.div
				layoutId={`floating-panel-label-container-${uniqueId}`}
				className="flex items-center"
			>
				<motion.span
					layoutId={`floating-panel-label-${uniqueId}`}
					className="font-semibold text-neutral-600 text-sm leading-8 dark:text-neutral-300"
				>
					{title}
				</motion.span>
			</motion.div>
			<div className="-left-16 absolute top-0 h-full w-8 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]" />
		</motion.button>
	);
};

interface FloatingPanelContentProps {
	children: React.ReactNode;
	className?: string;
}

export const FloatingPanelContent = ({
	children,
	className,
}: FloatingPanelContentProps) => {
	const { isOpen, closeFloatingPanel, uniqueId, triggerRect, title, openFloatingPanel } =
		useFloatingPanel();
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
				closeFloatingPanel();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [closeFloatingPanel]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeFloatingPanel();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [closeFloatingPanel]);

	// Handle window resize to reposition the panel
	useEffect(() => {
		const handleResize = () => {
			if (isOpen && triggerRect) {
				// Find the trigger element and update its position
				const triggerElement = document.querySelector(
					`[data-trigger-id="${uniqueId}"]`,
				) as HTMLElement;
				if (triggerElement) {
					const newRect = triggerElement.getBoundingClientRect();
					openFloatingPanel(newRect);
				}
			}
		};

		if (isOpen) {
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, [isOpen, triggerRect, uniqueId, openFloatingPanel]);

	// Calculate container boundaries for proper positioning
	const getContainerBounds = () => {
		// Find the main container element (usually has 'container' class)
		const container = document.querySelector('.container') || document.body;
		if (container) {
			const containerRect = container.getBoundingClientRect();
			return {
				left: containerRect.left + 16, // Add some padding
				right: containerRect.right - 16, // Add some padding
				width: containerRect.width - 32, // Account for padding
			};
		}
		return {
			left: 16,
			right: window.innerWidth - 16,
			width: window.innerWidth - 32,
		};
	};

	const variants: Variants = {
		hidden: { opacity: 0, scale: 0.9, y: 10 },
		visible: { opacity: 1, scale: 1, y: 0 },
	};

	// Calculate proper positioning within container bounds
	const getPositionStyle = () => {
		if (!triggerRect) {
			return {
				left: '50%',
				top: '50%',
				transformOrigin: 'center',
			};
		}

		const containerBounds = getContainerBounds();

		return {
			left: triggerRect.left,
			top: triggerRect.bottom + 8,
			transformOrigin: 'top left',
			maxWidth: containerBounds.width,
			// Ensure the panel doesn't go beyond container bounds
			right: 'auto',
		};
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ backdropFilter: 'blur(0px)' }}
						animate={{ backdropFilter: 'blur(4px)' }}
						exit={{ backdropFilter: 'blur(0px)' }}
						className="fixed inset-0 z-50"
						style={{ overflow: 'hidden' }}
					/>
					<div className="relative">
						<motion.div
							ref={contentRef}
							layoutId={`floating-panel-${uniqueId}`}
							className={cn(
								'fixed z-50 overflow-hidden rounded-md p-4 outline-none',
								'border border-neutral-200/50 dark:border-neutral-700/50',
								'bg-white ring-1 ring-black/5 dark:bg-black',
								className,
							)}
							style={getPositionStyle()}
							initial="hidden"
							animate="visible"
							exit="hidden"
							variants={variants}
							aria-modal="true"
							aria-labelledby={`floating-panel-title-${uniqueId}`}
						>
							<FloatingPanelTitle>{title}</FloatingPanelTitle>
							{children}
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
};

interface FloatingPanelTitleProps {
	children: React.ReactNode;
}

const FloatingPanelTitle = ({ children }: FloatingPanelTitleProps) => {
	const { uniqueId } = useFloatingPanel();

	return (
		<motion.div layoutId={`floating-panel-label-container-${uniqueId}`}>
			<motion.div
				layoutId={`floating-panel-label-${uniqueId}`}
				className="font-semibold text-neutral-600 text-sm dark:text-neutral-300"
				id={`floating-panel-title-${uniqueId}`}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

interface FloatingPanelBodyProps {
	children: React.ReactNode;
	className?: string;
}

export const FloatingPanelBody = ({ children, className }: FloatingPanelBodyProps) => (
	<motion.div
		className={className}
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ delay: 0.2 }}
	>
		{children}
	</motion.div>
);

interface FloatingPanelFooterProps {
	children: React.ReactNode;
	className?: string;
}

export const FloatingPanelFooter = ({
	children,
	className,
}: FloatingPanelFooterProps) => (
	<motion.div
		className={className}
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ delay: 0.3 }}
	>
		{children}
	</motion.div>
);

interface FloatingPanelCloseButtonProps {
	className?: string;
}

export const FloatingPanelCloseButton = ({
	className,
}: FloatingPanelCloseButtonProps) => {
	const { closeFloatingPanel } = useFloatingPanel();

	return (
		<motion.button
			type="button"
			className={cn('flex cursor-pointer items-center', className)}
			onClick={closeFloatingPanel}
			aria-label="Fermer le panneau flottant"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			<ArrowLeftIcon className="size-5" weight="duotone" />
		</motion.button>
	);
};

interface FloatingPanelButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
}

export const FloatingPanelButton = ({
	children,
	onClick,
	className,
}: FloatingPanelButtonProps) => (
	<motion.button
		className={cn(
			'z-20 flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-background',
			'cursor-pointer',
			className,
		)}
		onClick={onClick}
		whileHover={{ scale: 1.02 }}
		whileTap={{ scale: 0.98 }}
	>
		{children}
	</motion.button>
);
