const CACHE = "technical-center-pay-v1";

const FILES = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/mobile.css",
  "./css/animations.css",
  "./js/app.js",
  "./js/payments.js",
  "./js/promotions.js",
  "./js/particles.js",
  "./js/pwa.js",
  "./assets/logo.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install",(event)=>{

  event.waitUntil(
    caches.open(CACHE).then(cache=>{
      return cache.addAll(FILES);
    })
  );

});

self.addEventListener("fetch",(event)=>{

  event.respondWith(

    caches.match(event.request).then(response=>{

      return response || fetch(event.request);

    })

  );

});