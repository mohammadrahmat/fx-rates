var staticCacheName = "fx-rates-v1";

self.addEventListener('install', function(event) {
	event.waitUntil(caches.open(staticCacheName).then(function(cache) {
		return cache.addAll([
			'../css/main.css',
			'../js/currency_list.js'
		]);
	}).catch(function(err) {
		console.log(`install: ${err}`);
	}));
});

self.addEventListener('fetch', function(event) {
	event.respondWith(caches.match(event.request).then(function(response) {
		return response || fetch(event.request);
	}).catch(function(err) {
		console.log(`fetch: ${err}`);
	}));
});