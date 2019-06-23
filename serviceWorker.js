
var CACHE_NAME = 'jujoco-cache-v2.0';

var filesToCache = [
  '/index.html',
  '/images/jujoco192.png',
  '/images/jujocoHeadshot.jpg',
  '/images/megacart.png',
  '/images/outfitters.png',
  '/images/memodis.png',
  '/assets/css/images/overlay.png',
  '/assets/css/main.css'
];

self.addEventListener('install', (event) => {
  console.log('Installing')
  debugger;
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Activating');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', cacheName);
          return caches.delete(cacheName);
        }
      }));
    }));
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  console.log('fetching');
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          var responseToCache = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }
        );
      })
  );
});