const CACHE_NAME = 'my-pwa-cache-v1';
const staticUrlsToCache = [
  '/',
  '/PetFeed',
  '/register',
  '/PetRegister',
  '/index.html',
  '/logo1.png',
  // Agrega aquí más URLs de archivos a precachear estáticamente
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(staticUrlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activado con éxito:', event);
  event.waitUntil(
    // ... rest of the activation logic
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Manejo estático para ciertos recursos
  if (staticUrlsToCache.includes(requestUrl.pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then((responseFromCache) => {
          if (responseFromCache) {
            return responseFromCache;
          }

          // Si no está en caché, haz una solicitud a la red y almacena la respuesta en caché
          return fetch(event.request)
            .then((responseFromNetwork) => {
              const responseToCache = responseFromNetwork.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return responseFromNetwork;
            });
        })
    );
  } else {
    // Manejo dinámico para otras solicitudes
    event.respondWith(
      fetch(event.request)
        .then((responseFromNetwork) => {
          // Almacena la respuesta en caché para futuros accesos
          const responseToCache = responseFromNetwork.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return responseFromNetwork;
        })
        .catch((error) => {
          // Manejo de errores en caso de fallo de la red
          console.error('Error fetching from network:', error);
          // Puedes proporcionar una respuesta predeterminada si la solicitud falla
          // return new Response('Offline fallback response');
        })
    );
  }
});

