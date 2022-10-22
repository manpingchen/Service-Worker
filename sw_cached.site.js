const cacheName = "v2";

// Call Install event
self.addEventListener("install", (e) => {
  console.log("SW Installed");
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
    fetch(e.request)
      .then((res) => {
        // Make copy/clone of response
        const resClone = res.clone();

        // Open cache
        caches.open(cacheName).then((cache) => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
