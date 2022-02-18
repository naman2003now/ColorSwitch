export default class Circle {
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
		this.circle = temp.circle

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
		let circle = document.createElement("div")
		circle.id = "circleObstricle"
		circle.style.width = this.worldToScreenCoord(this.size, 0) + "px"
		circle.style.height = this.worldToScreenCoord(this.size, 0) + "px"
		circle.innerHTML =
			'<div id="top-left" class="circleElement"></div><div id="top-right" class="circleElement"></div><div id="bottom-left" class="circleElement"></div><div id="bottom-right" class="circleElement"></div><div class="circleCover"></div>'
		sprite.appendChild(circle)
		this.gameCanvas.appendChild(sprite)
		let elements = circle.getElementsByClassName("circleElement")
		for (let i = 0; i < 4; i++) {
			elements[i].style.backgroundColor = this.colors[i]
		}
		return {circle: circle, container: sprite}
	}

	updateFrameBuffers = () => {
		this.circle.style.width = this.worldToScreenCoord(this.size, 0) + "px"
		this.circle.style.height = this.worldToScreenCoord(this.size, 0) + "px"
		this.container.style.top = this.worldToScreenCoord(this.position) + "px"
	}

	gameLoop = (deltaTime) => {
		this.currentRotation += this.rotationSpeed * deltaTime
		this.circle.style.transform = "rotate(" + this.currentRotation + "deg)"
		this.container.style.top = this.worldToScreenCoord(this.position) + "px"
		this.lastFrameTime = Date.now()
	}

	checkCollision = (ballPosition, colorIndex) => {
		let wierdSolutionToThisProblem = {
			3: 0,
			2: 3,
			1: 1,
			0: 2,
		}
		colorIndex = wierdSolutionToThisProblem[colorIndex]
		let distance = ballPosition - this.position - this.size / 2
		let negativeMultiplier = 1
		if (distance > 0) {
			negativeMultiplier = 0
		}
		if (
			Math.abs(distance) < this.size / 2 + this.ballSize / 2 &&
			Math.abs(distance) > (this.size / 2) * 0.85 - this.ballSize
		) {
			if (
				(this.currentRotation + 180 * negativeMultiplier) % 360 >
					90 * colorIndex &&
				(this.currentRotation + 180 * negativeMultiplier) % 360 <
					90 * (colorIndex + 1)
			) {
			} else {
				return true
			}
		}
		return false
	}
}
