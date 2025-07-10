'use client';

import { CheckIcon, ClipboardIcon } from '@phosphor-icons/react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/Button';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface CopyButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
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
	variant = 'ghost',
	...props
}: CopyButtonProps): React.JSX.Element => {
	const [hasCopied, setHasCopied] = useState(false);

	useEffect((): void => {
		setTimeout((): void => {
			setHasCopied(false);
		}, 2000);
	});

	return (
		<Button
			size="icon"
			variant={variant}
			className={cn('size-8 bg-muted', className)}
			onClick={(): void => {
				copyToClipboardWithMeta(value);
				setHasCopied(true);
			}}
			{...props}
		>
			<span className="sr-only">Copier</span>
			{hasCopied ? (
				<CheckIcon className="size-4" weight="bold" />
			) : (
				<ClipboardIcon className="size-4" weight="bold" />
			)}
		</Button>
	);
};
