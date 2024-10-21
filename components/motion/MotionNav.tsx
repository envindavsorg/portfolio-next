'use client';

import { motion } from 'framer-motion';
import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export const MotionNav = ({
	children,
	...props
}: ComponentPropsWithoutRef<typeof motion.nav> & {
	children: React.ReactNode;
	className?: string;
	onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
	onMouseLeave: () => void;
}): React.JSX.Element => <motion.nav {...props}>{children}</motion.nav>;
