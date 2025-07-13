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
						window.location.reload();
					});

					// Service Worker registered successfully
				} catch (error) {
					// Service Worker registration failed
				}
			};

			registerSW();
		}
	}, []);

	return null;
};
