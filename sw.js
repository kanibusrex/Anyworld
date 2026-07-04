/* Anyworld service worker — makes the installed app launch offline.
   Strategy:
   - App navigations: network-first (so updates land when online), fall back to
     the cached shell when offline.
   - App shell + known runtime deps (fonts, the WebLLM library): stale-while-revalidate.
   - Everything else (e.g. multi-GB model weights from HuggingFace): passed straight
     through to the network + WebLLM's own Cache storage — never intercepted here. */
const CACHE = "anyworld-v1";
const SHELL = [
  "./", "./index.html", "./manifest.json",
  "./icon-32.png", "./icon-180.png", "./icon-192.png", "./icon-512.png"
];
const RUNTIME_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com", "esm.run", "cdn.jsdelivr.net"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // App launch / navigation: network-first with offline fallback to cached shell.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  const sameOrigin = url.origin === self.location.origin;
  const runtimeHost = RUNTIME_HOSTS.includes(url.hostname);
  if (!sameOrigin && !runtimeHost) return; // let model weights & anything else pass through

  // stale-while-revalidate for shell + runtime deps
  e.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()).catch(() => {});
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});
