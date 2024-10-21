'use client';

import { motion } from 'framer-motion';
import type React from 'react';
import type { ComponentPropsWithoutRef, RefObject } from 'react';

export const MotionDiv = ({
	children,
	...props
}: ComponentPropsWithoutRef<typeof motion.div> & {
	children: React.ReactNode;
	className?: string;
	ref?: RefObject<HTMLDivElement | null>;
}): React.JSX.Element => <motion.div {...props}>{children}</motion.div>;
