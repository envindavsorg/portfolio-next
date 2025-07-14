'use client';

import { ArrowUpIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import useLenis from '@/hooks/useLenis';

export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const { scrollToTop } = useLenis();

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	const handleScrollToTop = () => {
		scrollToTop({ duration: 1.5 });
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					onClick={handleScrollToTop}
					className="fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-colors hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
					aria-label="Scroll to top"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<ArrowUpIcon className="h-5 w-5" />
				</motion.button>
			)}
		</AnimatePresence>
	);
};
