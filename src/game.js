import Ball from "./Ball.js"

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
	worldToScreenCoord: (x) => {
		return ((x - scroll) * canvasSize) / 1200
	},
}

let ball = new Ball(gameSettings)
console.log("Ball created")

const setFrameBuffers = () => {
	canvasSize = Math.min(window.innerHeight, window.innerWidth)
	canvas.style.height = canvasSize + "px"
	canvas.style.width = canvasSize + "px"
	ball.updateFrameBuffers()
}

window.onresize = setFrameBuffers
window.onload = setFrameBuffers
