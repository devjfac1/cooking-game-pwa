// Service Worker for Cooking Game PWA
const CACHE_NAME = 'cooking-game-v1.0.0';
const STATIC_CACHE = 'cooking-game-static-v1.0.0';
const DYNAMIC_CACHE = 'cooking-game-dynamic-v1.0.0';

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') return;

  // Handle API requests differently
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Return cached API response if available
          return caches.match(request);
        })
    );
    return;
  }

  // Handle static assets and pages
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cache the response
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => cache.put(request, responseClone));

            return response;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed:', error);
            // Return offline fallback for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
            return new Response('Offline content not available', { status: 503 });
          });
      })
  );
});

// Background sync for game data
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered');
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Sync game data when back online
    const cache = await caches.open(DYNAMIC_CACHE);
    const keys = await cache.keys();

    // Process any pending game data
    for (const request of keys) {
      if (request.url.includes('/api/game-data')) {
        try {
          await fetch(request);
          await cache.delete(request);
        } catch (error) {
          console.error('Service Worker: Failed to sync game data', error);
        }
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Push notifications (for future features)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/logo192.png',
      badge: '/logo192.png',
      vibrate: [100, 50, 100],
      data: data.data
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});