'use client';

import Lenis from 'lenis';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LenisProviderProps {
	children: React.ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps): React.JSX.Element => {
	const lenisRef = useRef<Lenis | null>(null);
	const reducedMotion = useReducedMotion();

	useEffect(() => {
		if (reducedMotion) {
			return;
		}

		const lenis = new Lenis({
			duration: 1.0,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			touchMultiplier: 1.5,
			infinite: false,
			autoResize: true,
			syncTouch: false,
		});

		lenisRef.current = lenis;

		const raf = (time: number) => {
			lenis.raf(time);
			requestAnimationFrame(raf);
		};

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
			lenisRef.current = null;
		};
	}, [reducedMotion]);

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
