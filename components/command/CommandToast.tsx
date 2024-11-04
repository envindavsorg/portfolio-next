import { cn } from '@/lib/utils';
import type React from 'react';

export type ToastProps = React.HTMLProps<HTMLDivElement> & {
	children?: React.ReactNode;
	onClick?: () => void;
	className?: string;
};

export const CommandToast: React.FC<ToastProps> = ({
	children,
	onClick,
	className,
}) => (
	<div
		className={cn(
			'fixed bottom-4 left-4 z-40 max-w-[420px] cursor-pointer shadow-[0_16px_32px_rgba(0,0,0,0.25)]',
			'size-8 overflow-hidden rounded-3xl border border-neutral-700 bg-black text-white opacity-100 shadow-[inset_0_0_0_1px_#000024,0_11px_40px_0_rgba(0,0,0,0.25),0_2px_10px_0_rgba(0,0,0,0.12)] transition-all duration-[0.3s] ease-[ease-in-out] hover:w-[215px]',
			className,
		)}
		onClick={onClick}
	>
		<div data-nextjs-toast-wrapper>{children}</div>
	</div>
);
