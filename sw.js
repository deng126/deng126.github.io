const V="so-tay-v1";
const CORE=["./","index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const put=res=>{if(res&&res.ok){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res};
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(put).catch(()=>caches.match("index.html")));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(put)))
});
