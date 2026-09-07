// ==========================================================
// TECHNICAL CENTER MORELIA
// SERVICE WORKER V1.0
// ==========================================================

const CACHE_NAME = "technical-center-morelia-v1";

const ARCHIVOS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",

  "./assets/logo.png",
  "./assets/favicon.png",
  "./assets/apple-touch-icon.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/hero-bg.webp",
  "./assets/Technical Center Morelia.vcf"
];

// ----------------------------
// INSTALACIÓN
// ----------------------------

self.addEventListener("install", (event) => {

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARCHIVOS);
    })
  );

  self.skipWaiting();

});

// ----------------------------
// ACTIVACIÓN
// ----------------------------

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

  self.clients.claim();

});

// ----------------------------
// FETCH
// ----------------------------

self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request).then((response) => {

      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((networkResponse) => {

          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;

        })
        .catch(() => {

          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }

        });

    })

  );

});