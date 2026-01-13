const CACHE_NAME = "khmer-app-cache-v1";
const urlsToCache = [
  "/",
  "/login.html",
  "/home.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  // Add CSS or JS files here if external, for example:
  // '/styles.css',
  // '/script.js',
];

// Install service worker and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate service worker and clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Intercept fetch requests and serve cached files if offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
