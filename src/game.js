let canvas = document.getElementById("gameContainer")

const gameSettings = {
	ballColors: ["#ef476f", "#ffd166", "#06d6a0", "#118ab2"],
}

const setFrameBuffers = () => {
	canvas.style.height = Math.min(window.innerHeight, window.innerWidth) + "px"
	canvas.style.width = Math.min(window.innerHeight, window.innerWidth) + "px"
}

window.onresize = setFrameBuffers
window.onload = setFrameBuffers
