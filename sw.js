self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open("static").then((cache) => {
			return cache.addAll([
				"./",
				"./src/Ball.js",
				"./src/ObstacleSpawner.js",
				"./src/Obstacles/Circle.js",
				"./src/Obstacles/ColorSwitch.js",
				"./src/Obstacles/Windmill.js",
				"./Images/192x192.png",
				"./Images/700x700.png",
				"./src/game.js",
				"./styles/main.css",
			])
		})
	)
})

self.addEventListener("fetch", (e) => {
	e.respondWith(
		caches.match(e.request).then((response) => {
			return response || fetch(e.request)
		})
	)
})
