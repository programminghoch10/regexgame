async function cacheFirst(request: Request) {
  const responseFromCache = await caches.match(request)
  if (responseFromCache) return responseFromCache
  try {
    const responseFromNetwork = await fetch(request)
    const cache = await caches.open("v1")
    await cache.put(request, responseFromNetwork.clone())
    return responseFromNetwork
  } catch (error) {
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    })
  }
}

self.addEventListener("fetch", (event: any) => {
  (event).respondWith(cacheFirst(event.request))
})
