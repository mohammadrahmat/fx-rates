var staticCacheName = "fx-rates-v1";

self.addEventListener('install', function(event) {
	event.waitUntil(caches.open(staticCacheName).then(function(cache) {
		return cache.addAll([
			'../css/main.css',
			'../js/currency_list.js',
			'../jqm/jquery.mobile-1.5.0-alpha.1.min.js',
			'../jqm/jquery.mobile-1.5.0-alpha.1.min.css',
			'../jqm/images/ajax-loader.gif',
			'../jquery/jquery-3.2.1.min.js',
			'../jquery/jquery-migrate-1.4.1.min.js',
			'https://fonts.googleapis.com/css?family=Lobster+Two'
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
