const VERSION='mb-trek-v4';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  // App shell: cache first.
  if(url.origin===self.location.origin){
    event.respondWith(caches.match(req).then(cached=>cached || fetch(req).then(r=>{const copy=r.clone();caches.open(VERSION).then(c=>c.put(req,copy));return r;})));
    return;
  }
  // Runtime cache remote map assets (Leaflet/CDN and map tiles).
  if(req.destination==='script' || req.destination==='style' || url.hostname.includes('tile.openstreetmap.org') || url.hostname.includes('tile.opentopomap.org') || url.hostname.includes('cdnjs.cloudflare.com') || url.hostname.includes('code.jquery.com') || url.hostname.includes('cdn.jsdelivr.net') || url.hostname.includes('netdna.bootstrapcdn.com')){
    event.respondWith(caches.match(req).then(cached=>{
      const network=fetch(req,{mode:'no-cors'}).then(r=>{caches.open(VERSION).then(c=>c.put(req,r.clone())).catch(()=>{});return r;}).catch(()=>cached);
      return cached || network;
    }));
  }
});
