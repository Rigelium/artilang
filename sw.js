const CACHE_NAME = 'my-app-cache-v1';

// List all the files you want cached for offline use
const urlsToCache = [
  '/',
  '/index.html',
  // Add your specific image and font filenames below:
  '/images/artilang_gear.png',
  '/images/artilang.png',
  '/images/navbar.png',     
  '/assets/SourceSans3-VariableFont_wght.ttf' 
];

// 1. Install Event: Caches your files when the app is installed
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Fetch Event: Intercepts network requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If the file is in the cache, return it!
        if (response) {
          return response;
        }
        // Otherwise, fetch it from the internet
        return fetch(event.request);
      }
    )
  );
});

// 3. Activate Event: Cleans up old caches if you update your app
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
