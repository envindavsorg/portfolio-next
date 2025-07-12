'use client';

import { useEffect, useState } from 'react';

interface OfflineStatus {
	isOnline: boolean;
	isOffline: boolean;
	wasOffline: boolean;
}

export function useOfflineStatus(): OfflineStatus {
	const [isOnline, setIsOnline] = useState(true);
	const [wasOffline, setWasOffline] = useState(false);

	useEffect(() => {
		// Initial status
		setIsOnline(navigator.onLine);

		const handleOnline = () => {
			setIsOnline(true);
			console.log('Connection restored');
		};

		const handleOffline = () => {
			setIsOnline(false);
			setWasOffline(true);
			console.log('Connection lost');
		};

		// Listen for online/offline events
		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		// Additional connection monitoring
		const checkConnection = async () => {
			try {
				// Try to fetch a small resource to verify connectivity
				const response = await fetch('/favicon.ico', {
					method: 'HEAD',
					cache: 'no-cache',
				});
				setIsOnline(response.ok);
			} catch {
				setIsOnline(false);
				setWasOffline(true);
			}
		};

		// Check connection every 30 seconds when offline
		let intervalId: NodeJS.Timeout;
		if (!isOnline) {
			intervalId = setInterval(checkConnection, 30000);
		}

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [isOnline]);

	return {
		isOnline,
		isOffline: !isOnline,
		wasOffline,
	};
}