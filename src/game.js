import Ball from "./Ball.js"
import Circle from "./Circle.js"

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
		return ((x - xMul * scroll) * canvasSize) / 1200
	},
}
let circle = new Circle(gameSettings)
let ball = new Ball(gameSettings)

const updateFrameBuffers = () => {
	canvasSize = Math.min(window.innerHeight, window.innerWidth)
	canvas.style.height = canvasSize + "px"
	canvas.style.width = canvasSize + "px"
	ball.updateFrameBuffers()
	circle.updateFrameBuffers()
}

window.onresize = updateFrameBuffers
window.onload = updateFrameBuffers
