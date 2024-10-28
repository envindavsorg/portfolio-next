'use client';

import { cn } from '@/lib/utils';
import { CaretLeft, CursorClick } from '@phosphor-icons/react';
import {
	AnimatePresence,
	MotionConfig,
	type Variants,
	motion,
} from 'framer-motion';
import type React from 'react';
import {
	createContext,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';

const TRANSITION = {
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

const FloatingPanelContext = createContext<
	FloatingPanelContextType | undefined
>(undefined);

const useFloatingPanel = () => {
	const context = useContext(FloatingPanelContext);
	if (!context) {
		throw new Error(
			'useFloatingPanel must be used within a FloatingPanelProvider',
		);
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

export const FloatingPanelRoot = ({
	children,
	className,
}: FloatingPanelRootProps) => {
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
	children: React.ReactNode;
	className?: string;
	title: string;
}

export const FloatingPanelTrigger = ({
	children,
	title,
}: FloatingPanelTriggerProps) => {
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
			layoutId={`floating-panel-trigger-${uniqueId}`}
			className="h-11 rounded-md border border-neutral-200 bg-background px-8 dark:border-neutral-700"
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
					className="font-bold text-sm"
				>
					{children}
				</motion.span>
			</motion.div>
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
	const { isOpen, closeFloatingPanel, uniqueId, triggerRect, title } =
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
			if (
				contentRef.current &&
				!contentRef.current.contains(event.target as Node)
			) {
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

	const variants: Variants = {
		hidden: { opacity: 0, scale: 0.9, y: 10 },
		visible: { opacity: 1, scale: 1, y: 0 },
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
								'fixed z-50 aspect-square overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 p-4 outline-none dark:border-neutral-700 dark:bg-neutral-800',
								className,
							)}
							style={{
								left: triggerRect ? triggerRect.left : '50%',
								top: triggerRect ? triggerRect.bottom + 8 : '50%',
								transformOrigin: 'top left',
							}}
							initial="hidden"
							animate="visible"
							exit="hidden"
							variants={variants}
							aria-modal="true"
							aria-labelledby={`floating-panel-title-${uniqueId}`}
						>
							<FloatingPanelTitle>{title}</FloatingPanelTitle>
							{children}
							<CursorClick className="-bottom-8 -right-8 absolute size-28 shrink-0 text-theme opacity-10" />
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
				className="font-extrabold text-sm"
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

export const FloatingPanelBody = ({
	children,
	className,
}: FloatingPanelBodyProps) => (
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
			className={cn('flex items-center', className)}
			onClick={closeFloatingPanel}
			aria-label="Fermer le panneau flottant"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			<CaretLeft className="size-4" weight="bold" />
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
			'z-20 flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-background sm:text-base',
			className,
		)}
		onClick={onClick}
		whileHover={{ scale: 1.02 }}
		whileTap={{ scale: 0.98 }}
	>
		{children}
	</motion.button>
);
