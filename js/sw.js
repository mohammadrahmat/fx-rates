const staticCacheName = "fx-rates-v1";
const expectedCaches = [
	staticCacheName
];
const thingsToCache = [
	'../index.html',
	'../css/main.css',
	'../js/currency_list.js',
	'../jqm/jquery.mobile-1.5.0-alpha.1.min.js',
	'../jqm/jquery.mobile-1.5.0-alpha.1.min.css',
	'../jqm/images/ajax-loader.gif',
	'../jquery/jquery-3.2.1.min.js',
	'../jquery/jquery-migrate-1.4.1.min.js',
	'https://fonts.googleapis.com/css?family=Lobster+Two'
];

self.addEventListener('install', event => {
	self.skipWaiting();
	event.waitUntil(caches.open(staticCacheName).then(cache => cache.addAll(thingsToCache));
});
	
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(keys => Promise.all(
			keys.map(key => {
				if(!expectedCaches.includes(key)) return caches.delete(key);
			})
		))
	);
});

self.addEventListener('fetch', event => {
	const requestUrl = new URL(event.request.url);
	if (requestUrl.origin === location.origin && requestUrl.pathname === '\\') {
		event.respondWith(caches.match('index.html'));
		return;
	}
	event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
});
