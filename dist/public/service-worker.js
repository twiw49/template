(function() {
  "use strict";

  const CACHE_NAME = "static-cache-xiD502UZZlTkdfc7VfSVTpErtsoPOi";
  const URLS_TO_CACHE = ["./","https://s3.ap-northeast-2.amazonaws.com/smallwins/bundle.39deda.js","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/favicon-96x96.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/images/background1.380889.jpg","https://s3.ap-northeast-2.amazonaws.com/smallwins/manifest.json","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/apple-touch-icon-114x114.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/apple-touch-icon-120x120.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/apple-touch-icon-144x144.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/apple-touch-icon-57x57.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/apple-touch-icon-152x152.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/apple-touch-icon-60x60.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/apple-touch-icon-72x72.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/apple-touch-icon-76x76.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/favicon-128.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/favicon-16x16.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/favicon-196x196.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/favicon-32x32.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/images/background2.c5630d.jpg","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/icon-128x128.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/favicon.ico","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/icon-144x144.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/icon-152x152.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/icon-192x192.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/icon-384x384.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/icon-512x512.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/icon-72x72.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/icon-96x96.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/mstile-144x144.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/launch.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/mstile-150x150.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/mstile-310x150.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/mstile-70x70.png","https://s3.ap-northeast-2.amazonaws.com/smallwins/icons/mstile-310x310.png"];

  self.addEventListener("install", e => {
  const onInstalled = caches
    .open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
    .then(() => {
      return self.skipWaiting();
    });

  e.waitUntil(onInstalled);
});

self.addEventListener("activate", e => {
  const onActivated = Promise.all([
    self.clients.claim(),
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) caches.delete(key);
        })
      );
    })
  ]);

  e.waitUntil(onActivated);
});

self.addEventListener("fetch", e => {
  cacheWithNetworkFallback(e);
});

// CACHE STRATEGIES
// 1. Cache only. Static assets - App Shell
const cacheOnly = e => {
  e.respondWith(caches.match(e.request));
};

// 2. Cache with Network Fallback
const cacheWithNetworkFallback = e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      if (response) return response;

      // Fallback
      return fetch(e.request).then(newResponse => {
        // Cache fetched response
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, newResponse));
        return newResponse.clone();
      });
    })
  );
};

// 3. Network with Cache fallback
const networkWithCacheFallback = e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Cache latest version
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, response));
        return response.clone();
      })
      .catch(err => caches.match(e.request))
  );
};

// 4. Cache with Network Update
const cacheWithNetworkUpdate = e => {
  e.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      // Return from cache
      return cache.match(e.request).then(response => {
        // Update
        const updateResponse = fetch(e.request).then(newResponse => {
          //Cache new response
          cache.put(e.request, newResponse.clone());
          return newResponse;
        });

        return response || updateResponse;
      });
    })
  );
};

// 5. Cache & Network Race with offline content
const cacheAndNetworkRace = e => {
  e.respondWith(
    new Promise((resolve, reject) => {
      // Track rejections
      let firstRejectionReceived = false;
      let rejectOnce = () => {
        if (firstRejectionReceived) {
          reject("No response received.");
        } else {
          firstRejectionReceived = true;
        }
      };

      // Try Network
      fetch(e.request)
        .then(response => {
          // Check res ok
          response.ok ? resolve(response) : rejectOnce();
        })
        .catch(rejectOnce);

      // Try Cache
      caches
        .match(e.request)
        .then(response => {
          // Check cache found
          response ? resolve(response) : rejectOnce();
        })
        .catch(rejectOnce);
    })
  );
};

})();