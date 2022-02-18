import Ball from "./Ball.js"
import ObstacleSpawner from "./ObstacleSpawner.js"

var canvas = document.getElementById("gameContainer")
var canvasSize = Math.min(window.innerHeight, window.innerWidth)
var scroll = 0

const gameSettings = {
	ballColors: ["#ef476f", "#ffd166", "#06d6a0", "#118ab2"],
	backgroundColor: "#073b4c",
	canvas: canvas,
	ballSize: 25,
	worldSize: 1200,
	gravity: 2000,
	scroll: (x) => {
		scroll += x
	},
	worldToScreenCoord: (x, xMul = 1) => {
		return ((x + xMul * scroll) * canvasSize) / 1200
	},
}
let obstacleSpawner = new ObstacleSpawner(gameSettings)
let ball = new Ball(gameSettings)
obstacleSpawner.spawn(-400)

const updateFrameBuffers = () => {
	canvasSize = Math.min(window.innerHeight, window.innerWidth)
	canvas.style.height = canvasSize + "px"
	canvas.style.width = canvasSize + "px"
	ball.updateFrameBuffers()
	obstacleSpawner.updateFrameBuffers()
}

setInterval(() => {
	if (obstacleSpawner.checkCollision(ball.position.y, ball.currentColor)) {
		canvas.innerHTML = ""
		obstacleSpawner.gameOver()
		ball.gameOver(gameSettings)
		scroll = 0
		lastSpawnPosition = 0
		obstacleSpawner.spawn(-400)
	}
}, 0)

var lastSpawnPosition = 0
setInterval(() => {
	if (Math.abs(Math.floor(scroll / 800)) > lastSpawnPosition) {
		lastSpawnPosition = Math.abs(Math.floor(scroll / 800))
		obstacleSpawner.spawn(scroll)
	}
}, 0)

window.onresize = updateFrameBuffers
window.onload = updateFrameBuffers
