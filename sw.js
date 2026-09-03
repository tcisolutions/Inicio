const CACHE_NAME = "technical-center-pay-v10";

const urlsToCache = [
  "./",
  "./index.html",
  "./admin.html",
  "./manifest.json",
  "./css/style.css",
  "./css/mobile.css",
  "./css/admin.css",
  "./js/payments.js",
  "./js/promotions.js",
  "./js/admin.js",
  "./assets/logo/logo_192.png",
  "./assets/logo/logo_512.png",
  "./assets/logo/favicon-32.png",
  "./assets/logo/apple-touch-icon.png"
];

self.addEventListener("install",e=>{

    e.waitUntil(
        caches.open(CACHE).then(cache=>cache.addAll(FILES))
    );

});

self.addEventListener("fetch",e=>{

    e.respondWith(
        caches.match(e.request).then(res=>res || fetch(e.request))
    );

});