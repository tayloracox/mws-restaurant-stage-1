let cacheName = 'v2';
let cacheFiles = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/main.js'
]

// Installs Service Worker
self.addEventListener('install', function(e) {
  console.log("[ServiceWorker] Installed");

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
    })
  )
})

// Activates Service Worker
self.addEventListener('activate', function(e) {
  console.log("[ServiceWorker] Activated");

  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName) {
        if (thisCacheName !== cacheName) {
          console.log(`[ServiceWorker] Removing Cached Files from ${thisCacheName}`);
          return caches.delete(thisCacheName);
        }
      }))
    })
  )
})

// Fetches Service Worker
self.addEventListener('fetch', function(e) {
  console.log("[ServiceWorker] Fetching", e.request.url);
})
