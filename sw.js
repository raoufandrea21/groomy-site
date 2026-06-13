var C='groomy-v1';
var ASSETS=['/','/index.html','/favicon.png','/icon-192.png','/icon-512.png','/apple-touch-icon.png','/manifest.webmanifest'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==C)return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  var r=e.request; if(r.method!=='GET'){return;}
  var u=new URL(r.url);
  if(u.origin!==location.origin){return;}              /* let Supabase/fonts/CDN go straight to network */
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put('/',cp);});return res;}).catch(function(){return caches.match('/');}));
    return;
  }
  e.respondWith(caches.match(r).then(function(c){return c||fetch(r);}));
});
