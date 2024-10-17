'use client';

import { useTheme } from 'next-themes';
import type React from 'react';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						'group toast group-[.toaster]:p-4 group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-neutral-200 dark:border-neutral-700 group-[.toaster]:shadow-lg',
					title: 'group-[.toast]:text-sm group-[.toast]:font-bold',
					description:
						'group-[.toast]:text-muted-foreground text-xs font-normal',
					actionButton:
						'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
					cancelButton:
						'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
