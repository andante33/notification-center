const CACHE_NAME = 'sub-center-cache-v2';
const ASSETS = [
    'index.html',
    'manifest.json',
    'icon.png'
];

//インストール時にアプリのファイルを全て保存する
self.addEventListener('install', event => {
    event.waitUntill(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

//ネットが繋がっていなくても、キャッシュから画面を出す
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});