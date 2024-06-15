
async function loadFromNetwork(request: Request): Promise<Response> {
  try {
    const reponse = await fetch(request)
    const cache = await caches.open("v1")
    await cache.put(request, reponse.clone())
    return reponse
  } catch (error) {
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    })
  }
}

async function cacheFirst(request: Request): Promise<Response> {
  const responseFromCache = await caches.match(request)
  if (!responseFromCache)
    return await loadFromNetwork(request)
  loadFromNetwork(request)
  return responseFromCache
}

self.addEventListener("fetch", (event: any) => {
  (event).respondWith(cacheFirst(event.request))
})
