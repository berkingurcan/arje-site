/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

/**
 * ARJE service worker — makes the site installable and usable offline.
 *  - Pages (/, /en, /ru): network first, so visitors always see the latest
 *    version; the cached copy is the fallback when offline.
 *  - Hashed app files and small static files: precached, served from cache.
 *  - Product photos and fonts: cached the first time they are viewed
 *    (not precached, to keep the install light on mobile data).
 */
import { build, files, prerendered, version } from '$service-worker';

const sw = self as unknown as ServiceWorkerGlobalScope;

const SHELL = `arje-shell-${version}`;
const RUNTIME = 'arje-runtime-v1';
const RUNTIME_LIMIT = 80;

const lazy = (path: string) => path.startsWith('/images/') || path.endsWith('.woff2');
const PRECACHE = [...build, ...files, ...prerendered].filter((p) => !lazy(p));
const PRECACHED = new Set(PRECACHE);

sw.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(SHELL)
			.then((cache) => cache.addAll(PRECACHE))
			.then(() => sw.skipWaiting())
	);
});

sw.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== RUNTIME).map((k) => caches.delete(k))))
			.then(() => sw.clients.claim())
	);
});

async function trim(cache: Cache) {
	const keys = await cache.keys();
	for (let i = 0; i < keys.length - RUNTIME_LIMIT; i++) await cache.delete(keys[i]);
}

sw.addEventListener('fetch', (event) => {
	const { request } = event;
	if (request.method !== 'GET') return;

	const url = new URL(request.url);
	if (url.origin !== sw.location.origin) return; // leave third-party requests alone

	// Pages: network first, cached page when offline.
	if (request.mode === 'navigate') {
		event.respondWith(
			(async () => {
				const cache = await caches.open(SHELL);
				try {
					const res = await fetch(request);
					if (res.ok) cache.put(url.pathname, res.clone());
					return res;
				} catch {
					return (
						(await cache.match(url.pathname)) ??
						(await cache.match('/')) ??
						new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
					);
				}
			})()
		);
		return;
	}

	// App files: cache first (they are content-hashed or versioned with the build).
	if (PRECACHED.has(url.pathname)) {
		event.respondWith(caches.match(url.pathname).then((hit) => hit ?? fetch(request)));
		return;
	}

	// Photos and fonts: cache first, filled on first view.
	if (lazy(url.pathname)) {
		event.respondWith(
			(async () => {
				const cache = await caches.open(RUNTIME);
				const hit = await cache.match(request);
				if (hit) return hit;
				const res = await fetch(request);
				if (res.ok) {
					await cache.put(request, res.clone());
					trim(cache);
				}
				return res;
			})()
		);
	}
});
