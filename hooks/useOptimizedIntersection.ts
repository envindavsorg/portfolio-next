import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
	once?: boolean;
	enabled?: boolean;
}

/**
 * Optimized intersection observer hook with better performance
 */
export function useOptimizedIntersection<T extends HTMLElement = HTMLElement>(
	options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
	const { once = false, enabled = true, ...observerOptions } = options;
	const elementRef = useRef<T>(null);
	const [isIntersecting, setIsIntersecting] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		if (!enabled) return;

		const element = elementRef.current;
		if (!element) return;

		// Create observer only once
		if (!observerRef.current) {
			observerRef.current = new IntersectionObserver(
				([entry]) => {
					const isVisible = entry.isIntersecting;
					setIsIntersecting(isVisible);
					
					// Disconnect after first intersection if once is true
					if (once && isVisible && observerRef.current) {
						observerRef.current.disconnect();
					}
				},
				{
					threshold: 0.1,
					rootMargin: '50px',
					...observerOptions,
				}
			);
		}

		observerRef.current.observe(element);

		return () => {
			if (observerRef.current) {
				observerRef.current.unobserve(element);
			}
		};
	}, [enabled, once, observerOptions.threshold, observerOptions.rootMargin]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	return [elementRef, isIntersecting];
}