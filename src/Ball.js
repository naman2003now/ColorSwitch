export default class Ball {
	constructor(gameSettings) {
		this.velocity = 0 //-750
		this.position = {x: 600 - 12.5, y: 1000}
		this.worldSize = gameSettings.worldSize
		this.worldToScreenCoord = gameSettings.worldToScreenCoord
		this.size = gameSettings.ballSize
		this.colors = gameSettings.ballColors
		this.gameCanvas = gameSettings.canvas
		this.currentColor = 0
		this.sprite = this.createBall()
		this.gravity = gameSettings.gravity
		this.scroll = gameSettings.scroll
		this.positionMax = 1000
		this.gameStarted = false

		this.lastFrameTime = Date.now()
		//eventloop
		document.onclick = this.jump
	}

	createBall = () => {
		let sprite = document.createElement("div")
		sprite.style.width = this.worldToScreenCoord(this.size, 0) + "px"
		sprite.style.height = this.worldToScreenCoord(this.size, 0) + "px"
		sprite.style.position = "absolute"
		sprite.style.top = this.worldToScreenCoord(this.position.y) + "px"
		sprite.style.left = this.worldToScreenCoord(this.position.x, 0) + "px"
		sprite.style.backgroundColor = this.colors[this.currentColor]
		sprite.style.borderRadius =
			this.worldToScreenCoord(this.size / 2) + "px"
		sprite.style.zIndex = "10"
		this.gameCanvas.appendChild(sprite)
		return sprite
	}

	updateFrameBuffers = () => {
		this.sprite.style.width = this.worldToScreenCoord(this.size, 0) + "px"
		this.sprite.style.height = this.worldToScreenCoord(this.size, 0) + "px"
		this.sprite.style.top = this.worldToScreenCoord(this.position.y) + "px"
		this.sprite.style.left =
			this.worldToScreenCoord(this.position.x, 0) + "px"
		this.sprite.style.borderRadius =
			this.worldToScreenCoord(this.size / 2, 0) + "px"
	}

	gameLoop = (deltaTime) => {
		this.velocity += this.gravity * deltaTime
		this.position.y += this.velocity * deltaTime

		if (
			this.worldToScreenCoord(this.position.y) <
			this.worldToScreenCoord(this.worldSize / 2, 0)
		) {
			this.scroll(
				this.worldToScreenCoord(this.worldSize / 2, 0) -
					this.worldToScreenCoord(this.position.y)
			)
		}

		// if (-this.positionMax < -this.position.y) {
		// 	this.scroll(
		// 		Math.abs(
		// 			this.worldToScreenCoord(this.positionMax) -
		// 				this.worldToScreenCoord(this.position.y)
		// 		)
		// 	)
		// 	this.positionMax = this.position.y
		// }

		// Update Ui position
		this.sprite.style.left =
			this.worldToScreenCoord(this.position.x, 0) + "px"
		this.sprite.style.top = this.worldToScreenCoord(this.position.y) + "px"
		this.lastFrameTime = Date.now()
	}

	jump = () => {
		this.velocity = -750

		//Start the gameLoop on the first jump
		if (!this.gameStarted) {
			this.lastFrameTime = Date.now()
			setInterval(() => {
				if (this.gameStarted) {
					this.gameLoop((Date.now() - this.lastFrameTime) / 1000)
				}
			}, 0)
			this.gameStarted = true
		}
	}

	gameOver = (gameSettings) => {
		this.velocity = 0 //-750
		this.position = {x: 600 - 12.5, y: 1000}
		this.worldSize = gameSettings.worldSize
		this.worldToScreenCoord = gameSettings.worldToScreenCoord
		this.size = gameSettings.ballSize
		this.colors = gameSettings.ballColors
		this.gameCanvas = gameSettings.canvas
		this.currentColor = 0
		this.sprite = this.createBall()
		this.gravity = gameSettings.gravity
		this.scroll = gameSettings.scroll
		this.positionMax = 1000
		this.gameStarted = false
		this.lastFrameTime = Date.now()
	}

	colorSwitch = (color) => {
		this.currentColor = color
		this.sprite.style.backgroundColor = this.colors[color]
	}
}
