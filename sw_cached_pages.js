const cacheName = "v2";

const cacheAssets = [
  "index.html",
  "life-cycle.html",
  "/css/style.css",
  "/js/main.js",
];

// Call Install event
self.addEventListener("install", (e) => {
  console.log("SW Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("SW Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate event
self.addEventListener("activate", (e) => {
  console.log("SW Activated");

  //Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // Can use .filter as well
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("SW Clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch event
self.addEventListener("fetch", (e) => {
  console.log("SW Fetching");

  e.respondWith(
    // if there isnt a connection, fetch will fail
    fetch(e.request).catch(() => {
      cache.match(e.request);
    })
  );
});
