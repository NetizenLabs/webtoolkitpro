/**
 * SERVICE WORKER KILL-SWITCH
 * Unregisters any hijacked/malicious SW, clears all caches, and reloads clients.
 * Deploy this at /sw.js to evict any previously registered bad service worker.
 */
self.addEventListener('install', function(e) {
  // Skip waiting so this SW activates immediately, beating any existing one
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    // 1. Wipe every cache this origin owns
    caches.keys()
      .then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(name) {
          return caches.delete(name);
        }));
      })
      .then(function() {
        // 2. Unregister this SW itself so no SW runs at all
        return self.registration.unregister();
      })
      .then(function() {
        // 3. Force all open tabs to reload with a clean slate
        return self.clients.matchAll({ type: 'window' });
      })
      .then(function(clients) {
        clients.forEach(function(client) {
          client.navigate(client.url);
        });
      })
  );
});
