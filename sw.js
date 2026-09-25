
// ==========================================================
// TECHNICAL CENTER MORELIA
// SERVICE WORKER V2.0 (GitHub Pages Fix)
// ==========================================================

const CACHE_NAME = "technical-center-morelia-v2.0.0";

// Archivos que sí queremos guardar en caché
const STATIC_ASSETS = [
  "./",
  "./manifest.json",

  "./assets/logo.png",
  "./assets/favicon.png",
  "./assets/apple-touch-icon.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/hero-bg.webp",
  "./assets/Technical Center Morelia.vcf",

  "./assets/icons/apple.png",
  "./assets/icons/android.png",
  "./assets/icons/microsoldadura.png",

  "./assets/banners/bateria.png",
  "./assets/banners/pantalla.png",
  "./assets/banners/microsoldadura.png",
  "./assets/banners/resena-google.png",
  "./assets/banners/promo-agosto.png"
];

// ============================
// INSTALACIÓN
// ============================

self.addEventListener("install", (event) => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );

});

// ============================
// ACTIVACIÓN
// ============================

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

// ============================
// FETCH
// ============================

self.addEventListener("fetch", (event) => {

  const request = event.request;

  // HTML, CSS y JS SIEMPRE desde internet primero
  if (
    request.destination === "document" ||
    request.destination === "script" ||
    request.destination === "style"
  ) {

    event.respondWith(

      fetch(request)
        .then((response) => {

          const clone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });

          return response;

        })
        .catch(() => caches.match(request))

    );

    return;

  }

  // Imágenes y recursos estáticos: caché primero
  event.respondWith(

    caches.match(request).then((cached) => {

      if (cached) return cached;

      return fetch(request).then((response) => {

        const clone = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, clone);
        });

        return response;

      });

    })

  );

});