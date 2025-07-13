'use client';

import { useEffect } from 'react';

export const ServiceWorkerProvider = () => {
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			'serviceWorker' in navigator
		) {
			const registerSW = async () => {
				try {
					const registration = await navigator.serviceWorker.register('/sw.js', {
						scope: '/',
					});

					// Check for service worker updates
					registration.addEventListener('updatefound', () => {
						const newWorker = registration.installing;
						if (newWorker) {
							newWorker.addEventListener('statechange', () => {
								if (
									newWorker.state === 'installed' &&
									navigator.serviceWorker.controller
								) {
									// New content is available, notify user
									console.log('New content available! Please refresh.');

									// You could show a toast notification here
									if (window.confirm('New content available! Refresh to update?')) {
										window.location.reload();
									}
								}
							});
						}
					});

					// Listen for controlling service worker changes
					navigator.serviceWorker.addEventListener('controllerchange', () => {
						console.log('Service worker updated, reloading page');
						window.location.reload();
					});

					console.log('Service Worker registered successfully');
				} catch (error) {
					console.log('Service Worker registration failed:', error);
				}
			};

			registerSW();
		}
	}, []);

	return null;
};
