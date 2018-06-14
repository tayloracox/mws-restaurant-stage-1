let cacheName = 'v5';
let cacheFiles = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/main.js',
  './img/1.jpg',
  './img/1-480w.jpg',
  './img/2.jpg',
  './img/2-480w.jpg',
  './img/3.jpg',
  './img/3-480w.jpg',
  './img/4.jpg',
  './img/4-480w.jpg',
  './img/5.jpg',
  './img/5-480w.jpg',
  './img/6.jpg',
  './img/6-480w.jpg',
  './img/7.jpg',
  './img/7-480w.jpg',
  './img/8.jpg',
  './img/8-480w.jpg',
  './img/9.jpg',
  './img/9-480w.jpg',
  './img/10.jpg',
  './img/10-480w.jpg',
  `http://localhost:${port}/restaurants`
]

let offlineResponse = new Response('<h1>You are offline.</h1>', {headers: {'Content-Type': 'text/html'}});

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
self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(e.request).then(function(response) {
          let clonedResponse = response.clone();
          caches.open(cacheName).then(function(cache) {
            cache.put(e.request, clonedResponse);
          });
          return response;
        }).catch(function() {
          return offlineResponse;
        })
      }
    })
  )
});
