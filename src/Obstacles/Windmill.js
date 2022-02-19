export default class WindMill {
	constructor(gameSettings, relativeSpawnPosition) {
		this.ballSize = gameSettings.ballSize
		this.worldSize = gameSettings.worldSize
		this.colors = gameSettings.ballColors
		this.size = 400
		this.gameCanvas = gameSettings.canvas
		this.worldToScreenCoord = gameSettings.worldToScreenCoord
		this.position = -relativeSpawnPosition - 400
		this.rotationSpeed = 100
		this.currentRotation = 0

		let temp = this.createSprite()
		this.container = temp.container
		this.windmill = temp.windmill

		//Start Game Loop
		this.lastFrameTime = Date.now()
		setInterval(
			() => this.gameLoop((Date.now() - this.lastFrameTime) / 1000),
			0
		)
	}

	createSprite = () => {
		let sprite = document.createElement("div")
		sprite.className = "obstricleContainer"
		sprite.style.position = "absolute"
		sprite.style.top = this.worldToScreenCoord(this.position) + "px"
		let windmill = document.createElement("div")
		windmill.className = "windMill"
		windmill.style.width = this.worldToScreenCoord(this.size, 0) + "px"
		windmill.style.height = this.worldToScreenCoord(this.size, 0) + "px"
		windmill.innerHTML =
			'<div class="wing" id="one"></div><div class="wing" id="two"></div><div class="wing" id="three"></div><div class="wing" id="four"></div><div class="wing" id="axail"><div class="axail" id="container"><div class="axail" id="two"></div><div class="axail" id="one"></div><div class="axail" id="three"></div><div class="axail" id="four"></div></div></div>'
		sprite.appendChild(windmill)
		this.gameCanvas.appendChild(sprite)
		return {windmill: windmill, container: sprite}
	}

	updateFrameBuffers = () => {
		this.windmill.style.width = this.worldToScreenCoord(this.size, 0) + "px"
		this.windmill.style.height =
			this.worldToScreenCoord(this.size, 0) + "px"
		this.container.style.top = this.worldToScreenCoord(this.position) + "px"
	}

	gameLoop = (deltaTime) => {
		this.currentRotation += this.rotationSpeed * deltaTime
		this.windmill.style.transform =
			"translate(-40%) rotate(" + this.currentRotation + "deg)"
		this.container.style.top = this.worldToScreenCoord(this.position) + "px"
		this.lastFrameTime = Date.now()
	}

	checkCollision = (ballPosition, colorIndex) => {
		let wierdSolutionToThisProblem = {
			0: [90, 180, 270],
			3: [0, 180, 270],
			2: [0, 90, 270],
			1: [0, 90, 180],
		}
		let radians = (deg) => (Math.PI * deg) / 180
		let collision = false
		colorIndex = wierdSolutionToThisProblem[colorIndex]
		colorIndex.forEach((increment) => {
			let obstaclePosition =
				this.position +
				400 * 0.4 * Math.sin(radians(this.currentRotation + increment))
			if (Math.cos(radians(this.currentRotation + increment)) > 0.777) {
				let distance = Math.abs(obstaclePosition - ballPosition + 200)
				if (distance < (this.ballSize + this.size * 0.08) / 2) {
					collision = true
				}
			}
		})
		return collision
	}
}
