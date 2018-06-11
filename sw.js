let cacheName = 'v3';
let cacheFiles = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/main.js',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg'
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
self.addEventListener('fetch', event => {
  console.log("[ServiceWorker] Fetching"
  event.respondWith(caches.match(event.request).then(response => {
    console.log('used cashes')
    return response || fetch(event.request);
  })
  )
})
