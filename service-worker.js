// Contenido para service-worker.js

const CACHE_NAME = 'gastos-pro-cache-v1';
const urlsToCache = [
    './', // Alias para index.html
    './index.html'
];

// Evento de instalación: se abre el caché y se añaden los archivos principales
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento fetch: intercepta las peticiones de red
self.addEventListener('fetch', event => {
    // Solo interceptar peticiones GET
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Para las peticiones a la API de Google, siempre ir a la red primero.
    // Si falla la red (offline), no hacemos nada especial, la lógica de la app se encargará.
    if (event.request.url.includes('script.google.com')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                // No se pudo conectar. La app manejará el modo offline.
                // Devolvemos una respuesta de error para que el .catch() del fetch en la app se active.
                return new Response(JSON.stringify({status: 'offline'}), {
                    headers: { 'Content-Type': 'application/json' }
                });
            })
        );
        return;
    }

    // Para todos los demás recursos (HTML, CSS, JS), usar estrategia "Cache-First"
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el recurso está en caché, devolverlo
                if (response) {
                    return response;
                }
                // Si no, intentar buscarlo en la red
                return fetch(event.request).then(
                    networkResponse => {
                        // Y si se encuentra, guardarlo en caché para futuras visitas
                        return caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                    }
                );
            })
    );
});