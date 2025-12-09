// Cache version with timestamp for automatic cache busting
const CACHE_VERSION = 'v3';
const CACHE_TIMESTAMP = '20251201-1607';
const CACHE_NAME = `hsm-formulary-${CACHE_VERSION}-${CACHE_TIMESTAMP}`;

const urlsToCache = [
    '/',
    '/index.html',
    '/hsm-logo.jpg',
    '/logo-farmasi-hsm.png'
];

// Install event - cache resources and force update
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache:', CACHE_NAME);
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.log('Cache install error:', error);
            })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event - clean up old caches immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Take control of all pages immediately
    return self.clients.claim();
});

// Fetch event - Network First strategy for HTML, Cache First for assets
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Network First strategy for HTML files (prevents white screen from cached old versions)
    if (request.headers.get('accept').includes('text/html') || url.pathname.endsWith('.html') || url.pathname === '/') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone and cache the response
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache);
                    });
                    return response;
                })
                .catch(() => {
                    // If network fails, try cache
                    return caches.match(request).then((response) => {
                        return response || caches.match('/index.html');
                    });
                })
        );
    }
    // Cache First strategy for other assets (JS, CSS, images)
    else {
        event.respondWith(
            caches.match(request)
                .then((response) => {
                    if (response) {
                        return response;
                    }

                    return fetch(request).then((response) => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone and cache the response
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });

                        return response;
                    });
                })
                .catch(() => {
                    // Return offline page for navigation requests
                    if (request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                })
        );
    }
});

// Listen for messages from the client to force an update
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
