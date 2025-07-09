import { type RefObject, useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
	once?: boolean;
	enabled?: boolean;
}

export const useOptimizedIntersection = <T extends HTMLElement = HTMLElement>(
	options: UseIntersectionObserverOptions = {},
): [RefObject<T | null>, boolean] => {
	const { once = false, enabled = true, ...observerOptions } = options;
	const elementRef = useRef<T>(null);
	const [isIntersecting, setIsIntersecting] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		if (!enabled) {
			return;
		}

		const element = elementRef.current;
		if (!element) {
			return;
		}

		if (!observerRef.current) {
			observerRef.current = new IntersectionObserver(
				([entry]) => {
					const isVisible = entry.isIntersecting;
					setIsIntersecting(isVisible);

					if (once && isVisible && observerRef.current) {
						observerRef.current.disconnect();
					}
				},
				{
					threshold: 0.1,
					rootMargin: '50px',
					...observerOptions,
				},
			);
		}

		observerRef.current.observe(element);

		return () => {
			if (observerRef.current) {
				observerRef.current.unobserve(element);
			}
		};
	}, [enabled, once, observerOptions.threshold, observerOptions.rootMargin]);

	useEffect(() => {
		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	return [elementRef, isIntersecting];
};
