const CACHE_NAME = 'portfolio-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Resources to cache immediately
const STATIC_ASSETS = [
	'/',
	'/blog',
	'/manifest.json',
	'/og.png',
	'/og-author.png',
	'/favicon.ico',
	'/android-chrome-192x192.png',
	'/android-chrome-512x512.png',
	'/apple-touch-icon.png',
];

// Cache strategies
const CACHE_STRATEGIES = {
	// Cache first for static assets
	CACHE_FIRST: 'cache-first',
	// Network first for dynamic content
	NETWORK_FIRST: 'network-first',
	// Stale while revalidate for images
	STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
	console.log('SW: Installing service worker');
	
	event.waitUntil(
		caches.open(STATIC_CACHE)
			.then((cache) => {
				console.log('SW: Caching static assets');
				return cache.addAll(STATIC_ASSETS);
			})
			.then(() => {
				console.log('SW: Static assets cached');
				return self.skipWaiting();
			})
			.catch((error) => {
				console.error('SW: Error caching static assets:', error);
			})
	);
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
	console.log('SW: Activating service worker');
	
	event.waitUntil(
		caches.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames
						.filter((cacheName) => {
							return cacheName !== STATIC_CACHE && 
								   cacheName !== DYNAMIC_CACHE;
						})
						.map((cacheName) => {
							console.log('SW: Deleting old cache:', cacheName);
							return caches.delete(cacheName);
						})
				);
			})
			.then(() => {
				console.log('SW: Service worker activated');
				return self.clients.claim();
			})
			.catch((error) => {
				console.error('SW: Error during activation:', error);
			})
	);
});

// Fetch event - handle requests with appropriate strategies
self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Skip non-GET requests
	if (request.method !== 'GET') return;

	// Skip external requests
	if (url.origin !== self.location.origin) return;

	// Handle different types of requests
	if (url.pathname.startsWith('/api/')) {
		// API requests - network first
		event.respondWith(handleNetworkFirst(request));
	} else if (url.pathname.match(/\.(png|jpg|jpeg|webp|svg|gif|ico)$/)) {
		// Images - stale while revalidate
		event.respondWith(handleStaleWhileRevalidate(request));
	} else if (url.pathname.startsWith('/_next/static/')) {
		// Next.js static assets - cache first
		event.respondWith(handleCacheFirst(request));
	} else {
		// Pages and other content - network first with fallback
		event.respondWith(handleNetworkFirstWithFallback(request));
	}
});

// Cache first strategy
async function handleCacheFirst(request) {
	try {
		const cachedResponse = await caches.match(request);
		if (cachedResponse) {
			return cachedResponse;
		}

		const networkResponse = await fetch(request);
		if (networkResponse.ok) {
			const cache = await caches.open(STATIC_CACHE);
			cache.put(request, networkResponse.clone());
		}
		return networkResponse;
	} catch (error) {
		console.error('SW: Cache first strategy failed:', error);
		return new Response('Offline', { status: 503 });
	}
}

// Network first strategy
async function handleNetworkFirst(request) {
	try {
		const networkResponse = await fetch(request);
		if (networkResponse.ok) {
			const cache = await caches.open(DYNAMIC_CACHE);
			cache.put(request, networkResponse.clone());
		}
		return networkResponse;
	} catch (error) {
		console.log('SW: Network failed, trying cache:', request.url);
		const cachedResponse = await caches.match(request);
		if (cachedResponse) {
			return cachedResponse;
		}
		return new Response('Offline', { status: 503 });
	}
}

// Network first with fallback for pages
async function handleNetworkFirstWithFallback(request) {
	try {
		const networkResponse = await fetch(request);
		if (networkResponse.ok) {
			const cache = await caches.open(DYNAMIC_CACHE);
			cache.put(request, networkResponse.clone());
		}
		return networkResponse;
	} catch (error) {
		console.log('SW: Network failed, trying cache:', request.url);
		const cachedResponse = await caches.match(request);
		if (cachedResponse) {
			return cachedResponse;
		}

		// Fallback to cached homepage for navigation requests
		if (request.mode === 'navigate') {
			const homepageResponse = await caches.match('/');
			if (homepageResponse) {
				return homepageResponse;
			}
		}

		return new Response('Offline', { 
			status: 503,
			headers: { 'Content-Type': 'text/html' },
			body: `
				<!DOCTYPE html>
				<html>
				<head>
					<title>Offline - Portfolio</title>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1">
				</head>
				<body style="font-family: system-ui; text-align: center; padding: 2rem;">
					<h1>You're offline</h1>
					<p>Please check your internet connection and try again.</p>
				</body>
				</html>
			`
		});
	}
}

// Stale while revalidate strategy
async function handleStaleWhileRevalidate(request) {
	const cache = await caches.open(DYNAMIC_CACHE);
	const cachedResponse = await cache.match(request);

	// Fetch in background to update cache
	const fetchPromise = fetch(request)
		.then((networkResponse) => {
			if (networkResponse.ok) {
				cache.put(request, networkResponse.clone());
			}
			return networkResponse;
		})
		.catch((error) => {
			console.log('SW: Background fetch failed:', error);
		});

	// Return cached version immediately if available
	if (cachedResponse) {
		return cachedResponse;
	}

	// If no cache, wait for network
	return fetchPromise;
}

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
	console.log('SW: Background sync triggered:', event.tag);
	
	if (event.tag === 'background-analytics') {
		event.waitUntil(sendPendingAnalytics());
	}
});

// Handle push notifications (future enhancement)
self.addEventListener('push', (event) => {
	console.log('SW: Push notification received');
	
	const options = {
		body: event.data ? event.data.text() : 'New update available!',
		icon: '/android-chrome-192x192.png',
		badge: '/android-chrome-192x192.png',
		vibrate: [200, 100, 200],
		tag: 'portfolio-notification',
		actions: [
			{
				action: 'view',
				title: 'View',
				icon: '/android-chrome-192x192.png'
			},
			{
				action: 'close',
				title: 'Close'
			}
		]
	};

	event.waitUntil(
		self.registration.showNotification('Portfolio Update', options)
	);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
	console.log('SW: Notification clicked:', event.action);
	
	event.notification.close();

	if (event.action === 'view') {
		event.waitUntil(
			clients.openWindow('/')
		);
	}
});

// Utility function for background analytics (placeholder)
async function sendPendingAnalytics() {
	// This would send any pending analytics data when back online
	console.log('SW: Sending pending analytics data');
}