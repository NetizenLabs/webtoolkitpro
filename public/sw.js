/**
 * EMERGENCY SERVICE WORKER KILL-SWITCH
 * This instantly unregisters any existing corrupted Service Worker and forces a page reload.
 */
self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  self.registration.unregister()
    .then(function() {
      return self.clients.matchAll();
    })
    .then(function(clients) {
      clients.forEach(client => {
        // Force the client to reload to get rid of the broken state
        client.navigate(client.url);
      });
    });
});