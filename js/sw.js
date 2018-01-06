var staticCacheName = "fx-rates-v1";

self.addEventListener('install', function(event) {
	event.waitUntil(caches.open(staticCacheName).then(function(cache) {
		return cache.addAll([
			'js/currency_list.js',
			'jquery/jquery-3.2.1.min.js',
			'jquery-migrate-1.4.1.min.js',
			'jqm/jquery.mobile-1.5.0-alpha.1.min.css',
			'jqm/jquery.mobile-1.5.0.alpha.1.min.js',
			'css/main.css'
		]);
	}).catch(function(err) {
		console.log(`install: 
						${err}`);
	}));
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('fx-');
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(caches.match(event.request).then(function(response) {
		return response || fetch(event.request);
	}).catch(function(err) {
		console.log(`install: 
						${err}`);
	}));
});