'use client';

import { ArrowUpIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { useEffect, useState } from 'react';

export const BackToTop = (): React.JSX.Element | null => {
	const [isVisible, setIsVisible] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (!isMounted) return;

		const handleScroll = () => {
			const scrollY =
				window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
			setIsVisible(scrollY > 100);
		};

		handleScroll();

		window.addEventListener('scroll', handleScroll, { passive: true });

		const lenisInstance = (window as any).__lenis;
		if (lenisInstance) {
			lenisInstance.on('scroll', ({ scroll }: { scroll: number }) => {
				setIsVisible(scroll > 100);
			});
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (lenisInstance) {
				lenisInstance.off('scroll', handleScroll);
			}
		};
	}, [isMounted]);

	const scrollToTop = () => {
		const lenisInstance = (window as any).__lenis;
		if (lenisInstance) {
			lenisInstance.scrollTo(0, { duration: 1.5, ease: 'power2.out' });
			return;
		}

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	if (!isMounted) return null;

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					className="fixed right-6 bottom-6 z-[9999] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-200/50 bg-white/20 ring-1 ring-black/5 focus:outline-none dark:border-neutral-700/50 dark:bg-white/10"
					onClick={scrollToTop}
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					exit={{
						opacity: 0,
						y: 20,
					}}
					whileHover={{
						scale: 1.05,
					}}
					whileTap={{
						scale: 0.95,
					}}
					aria-label="Remonter en haut du site !"
				>
					<ArrowUpIcon className="size-6" weight="duotone" />
				</motion.button>
			)}
		</AnimatePresence>
	);
};
