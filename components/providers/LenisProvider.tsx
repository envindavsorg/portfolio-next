'use client';

import Lenis from 'lenis';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LenisProviderProps {
	children: React.ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
	const lenisRef = useRef<Lenis | null>(null);
	const reducedMotion = useReducedMotion();

	useEffect(() => {
		// Don't initialize Lenis if user prefers reduced motion or on mobile
		if (reducedMotion) {
			return;
		}

		// Initialize Lenis
		const lenis = new Lenis({
			duration: 1.0,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
			touchMultiplier: 1.5,
			infinite: false,
			autoResize: true,
			syncTouch: false, // Better performance on mobile
		});

		lenisRef.current = lenis;

		// Animation loop
		const raf = (time: number) => {
			lenis.raf(time);
			requestAnimationFrame(raf);
		};

		requestAnimationFrame(raf);

		// Cleanup
		return () => {
			lenis.destroy();
			lenisRef.current = null;
		};
	}, [reducedMotion]);

	// Expose lenis instance globally for other components to use
	useEffect(() => {
		if (lenisRef.current) {
			(window as any).__lenis = lenisRef.current;
		}

		return () => {
			if ((window as any).__lenis) {
				delete (window as any).__lenis;
			}
		};
	}, []);

	return <>{children}</>;
};
