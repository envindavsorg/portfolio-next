'use client';

import { motion } from 'framer-motion';
import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export const MotionSpan = ({
	children,
	...props
}: ComponentPropsWithoutRef<typeof motion.span> & {
	children?: React.ReactNode;
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}): React.JSX.Element => <motion.span {...props}>{children}</motion.span>;
