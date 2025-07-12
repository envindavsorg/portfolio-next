'use client';

import { useEffect } from 'react';

interface ResourceHint {
	href: string;
	as?: string;
	type?: string;
	crossOrigin?: 'anonymous' | 'use-credentials';
}

// Critical resources to preload
const PRELOAD_RESOURCES: ResourceHint[] = [
	// Critical images
	{
		href: '/og-author.png',
		as: 'image',
		type: 'image/png',
	},
	{
		href: '/og.png',
		as: 'image',
		type: 'image/png',
	},
];

// Resources to prefetch for future navigation
const PREFETCH_RESOURCES: string[] = [
	'/blog',
	'/api/github/stats',
	'/api/github/contributions',
];

// DNS prefetch domains
const DNS_PREFETCH_DOMAINS: string[] = [
	'//api.github.com',
	'//avatars.githubusercontent.com',
	'//vercel.live',
	'//vitals.vercel-insights.com',
];

// Preconnect domains (for resources we're confident we'll use)
const PRECONNECT_DOMAINS: string[] = ['//fonts.googleapis.com', '//fonts.gstatic.com'];

export const ResourceHintsProvider = () => {
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const head = document.head;
		const addedElements: HTMLElement[] = [];

		// Helper function to create and add link elements
		const addLinkElement = (
			rel: string,
			href: string,
			as?: string,
			type?: string,
			crossOrigin?: string,
		) => {
			// Check if already exists
			const existing = head.querySelector(`link[rel="${rel}"][href="${href}"]`);
			if (existing) return;

			const link = document.createElement('link');
			link.rel = rel;
			link.href = href;

			if (as) link.setAttribute('as', as);
			if (type) link.type = type;
			if (crossOrigin) link.crossOrigin = crossOrigin;

			// Add an importance hint for critical resources
			if (rel === 'preload') {
				link.setAttribute('importance', 'high');
			}

			head.appendChild(link);
			addedElements.push(link);
		};

		// Add DNS prefetch hints
		DNS_PREFETCH_DOMAINS.forEach((domain) => {
			addLinkElement('dns-prefetch', domain);
		});

		// Add preconnect hints
		PRECONNECT_DOMAINS.forEach((domain) => {
			addLinkElement('preconnect', domain);
		});

		// Add preload hints for critical resources
		PRELOAD_RESOURCES.forEach(({ href, as, type, crossOrigin }) => {
			addLinkElement('preload', href, as, type, crossOrigin);
		});

		// Add prefetch hints for likely next navigation
		// Use requestIdleCallback for non-critical prefetching
		const prefetchResources = () => {
			PREFETCH_RESOURCES.forEach((href) => {
				addLinkElement('prefetch', href);
			});
		};

		if ('requestIdleCallback' in window) {
			(window as any).requestIdleCallback(prefetchResources, { timeout: 5000 });
		} else {
			// Fallback for browsers without requestIdleCallback
			setTimeout(prefetchResources, 2000);
		}

		// Preload critical images when they're likely to be needed
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target as HTMLImageElement;
						if (img.dataset.src && !img.src) {
							img.src = img.dataset.src;
							img.removeAttribute('data-src');
						}
						observer.unobserve(img);
					}
				});
			},
			{
				rootMargin: '50px',
				threshold: 0.1,
			},
		);

		// Observer for lazy loading images
		const lazyImages = document.querySelectorAll('img[data-src]');
		lazyImages.forEach((img) => observer.observe(img));

		// Cleanup function
		return () => {
			// Remove added elements (optional, usually not needed for performance hints)
			addedElements.forEach((element) => {
				if (element.parentNode) {
					element.parentNode.removeChild(element);
				}
			});
			observer.disconnect();
		};
	}, []);

	return null;
};

// Hook for dynamically adding resource hints
export const useResourceHint = (
	rel: 'preload' | 'prefetch' | 'dns-prefetch' | 'preconnect',
	href: string,
	options?: {
		as?: string;
		type?: string;
		crossOrigin?: 'anonymous' | 'use-credentials';
		condition?: boolean;
	},
) => {
	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (options?.condition === false) return;

		const head = document.head;
		const existing = head.querySelector(`link[rel="${rel}"][href="${href}"]`);

		if (existing) return;

		const link = document.createElement('link');
		link.rel = rel;
		link.href = href;

		if (options?.as) link.setAttribute('as', options.as);
		if (options?.type) link.type = options.type;
		if (options?.crossOrigin) link.crossOrigin = options.crossOrigin;

		head.appendChild(link);

		return () => {
			if (link.parentNode) {
				link.parentNode.removeChild(link);
			}
		};
	}, [rel, href, options]);
};
