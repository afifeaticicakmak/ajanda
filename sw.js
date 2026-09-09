/* Çevrimdışı çalışması için: her açılan sayfa ve görsel önbelleğe alınır,
   sonraki açılışlarda internet olmasa da gelir. */
const KOVA = "ajanda-v4";

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(KOVA).then((c) => c.addAll([
    "./",
    "./Ajanda-dijital.dc.html",
    "./support.js",
    "./ajanda-bulut.js",
    "./manifest.webmanifest",
    "./ikon2-192.png",
    "./ikon2-512.png"
  ]).catch(() => {})));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) =>
    Promise.all(ks.filter((k) => k !== KOVA).map((k) => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // Supabase istekleri hep ağdan gitsin
  if (u.hostname.indexOf("supabase") >= 0) return;

  e.respondWith(
    fetch(e.request)
      .then((y) => {
        if (y && y.status === 200 && u.origin === self.location.origin) {
          const kopya = y.clone();
          caches.open(KOVA).then((c) => c.put(e.request, kopya));
        }
        return y;
      })
      .catch(() => caches.match(e.request).then((v) => v || caches.match("./Ajanda-dijital.dc.html")))
  );
});
