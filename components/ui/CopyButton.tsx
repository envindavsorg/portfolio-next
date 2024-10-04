'use client';

import { Button, type ButtonProps } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Check, Clipboard } from '@phosphor-icons/react';
import React from 'react';
import { useEffect, useState } from 'react';

interface CopyButtonProps extends ButtonProps {
	value: string;
	src?: string;
}

const copyToClipboardWithMeta = (value: string): void => {
	navigator.clipboard.writeText(value);
};

export const CopyButton = ({
	value,
	className,
	src,
	variant = 'outline',
	...props
}: CopyButtonProps) => {
	const [hasCopied, setHasCopied] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setHasCopied(false);
		}, 2000);
	});

	return (
		<Button
			size="icon"
			variant={variant}
			className={cn(
				'size-8 text-foreground hover:bg-muted hover:text-foreground',
				className,
			)}
			onClick={() => {
				copyToClipboardWithMeta(value);
				setHasCopied(true);
			}}
			{...props}
		>
			<span className="sr-only">Copier</span>
			{hasCopied ? (
				<Check className="size-4" weight="bold" />
			) : (
				<Clipboard className="size-4" weight="bold" />
			)}
		</Button>
	);
};
