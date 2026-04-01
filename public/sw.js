const CACHE_NAME = "noval-v1";
const STATIC_ASSETS = ["/", "/signin", "/stores"];

// Install: cache app shell
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) {
            return key !== CACHE_NAME;
          })
          .map(function (key) {
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch: network-first for API/dynamic, cache-first for static assets
self.addEventListener("fetch", function (event) {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Network-first for API routes and dynamic pages
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/deals/")) {
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Cache-first for static assets
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|gif|ico|woff2?)$/)
  ) {
    event.respondWith(
      caches.match(event.request).then(function (cached) {
        return (
          cached ||
          fetch(event.request).then(function (response) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, clone);
            });
            return response;
          })
        );
      })
    );
    return;
  }

  // Network-first for everything else
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(function () {
        return caches.match(event.request);
      })
  );
});

// Push notifications
self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/icon-192x192.png",
      badge: "/icon-192x192.png",
      data: {
        url: data.url || "/",
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(url));
});
