// Service Worker for EcoPulse - Offline-first climate education platform

const CACHE_NAME = 'ecopulse-v1.0.0'
const STATIC_CACHE = 'ecopulse-static-v1.0.0'
const DYNAMIC_CACHE = 'ecopulse-dynamic-v1.0.0'

// Files to cache for offline functionality
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/global-datacenter-visualization/src/00_earthmap1k.jpg',
  '/global-datacenter-visualization/src/01_earthbump1k.jpg',
  '/global-datacenter-visualization/src/02_earthspec1k.jpg',
  '/global-datacenter-visualization/src/03_earthlights1k.jpg',
  '/icon-192x192.png',
  '/icon-512x512.png'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('[SW] Service worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.ok) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone)
              })
          }
          return response
        })
        .catch(() => {
          // Return cached response if network fails
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse
              }
              // Return offline fallback for API requests
              return new Response(
                JSON.stringify({
                  analysis: "You're currently offline. EcoPulse is working in offline mode with limited functionality. Connect to the internet for full AI-powered analysis.",
                  metrics: {
                    co2Level: 415,
                    toxicityLevel: 5,
                    temperature: 30,
                    humanPopulation: 9000000000,
                    animalPopulation: 100000000000,
                    plantPopulation: 1000000000000,
                    oceanAcidity: 8.1,
                    iceCapMelting: 10
                  },
                  pollutionLevel: 0,
                  specialEvent: null,
                  offline: true
                }),
                {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' }
                }
              )
            })
        })
    )
    return
  }

  // Handle static assets and pages
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }

        return fetch(request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Cache successful responses
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone)
              })

            return response
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/')
            }
            return new Response('Offline - Please check your internet connection', {
              status: 503,
              statusText: 'Service Unavailable'
            })
          })
      })
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered')
    event.waitUntil(
      // Process any queued actions when back online
      processQueuedActions()
    )
  }
})

// Push notifications for educational updates
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body || 'New climate education content available!',
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [200, 100, 200],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Explore Now',
          icon: '/icon-192x192.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icon-192x192.png'
        }
      ]
    }

    event.waitUntil(
      self.registration.showNotification(data.title || 'EcoPulse Update', options)
    )
  }
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Helper function to process queued actions
async function processQueuedActions() {
  // This would process any actions that were queued while offline
  // For now, we'll just log that sync occurred
  console.log('[SW] Processing queued actions...')
}

// Periodic background sync for educational content updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(
      updateEducationalContent()
    )
  }
})

// Helper function to update educational content
async function updateEducationalContent() {
  console.log('[SW] Updating educational content...')
  // This would fetch new educational scenarios, climate data, etc.
}
