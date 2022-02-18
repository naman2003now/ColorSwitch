export default class ColorSwitch {
	constructor(gameSettings, relativeSpawnPosition) {
		this.worldSize = gameSettings.worldSize
		this.worldToScreenCoord = gameSettings.worldToScreenCoord
		this.size = gameSettings.ballSize
		this.colors = gameSettings.ballColors
		this.gameCanvas = gameSettings.canvas
		this.position = -relativeSpawnPosition - 400
		this.currentColor = Math.floor(Math.random() * 4.1)
		this.scroll = gameSettings.scroll
		let temp = this.createBall()
		this.container = temp.container
		this.ball = temp.ball
		setInterval(this.gameLoop, 0)
	}

	createBall = () => {
		let sprite = document.createElement("div")
		sprite.className = "obstricleContainer"
		sprite.style.position = "absolute"
		sprite.style.top = this.worldToScreenCoord(this.position) + "px"
		let ball = document.createElement("div")
		ball.style.width = this.worldToScreenCoord(this.size, 0) + "px"
		ball.style.height = this.worldToScreenCoord(this.size, 0) + "px"
		ball.style.backgroundColor = this.colors[this.currentColor]
		ball.style.borderRadius = this.worldToScreenCoord(this.size / 2) + "px"
		ball.style.zIndex = "10"
		sprite.appendChild(ball)
		this.gameCanvas.appendChild(sprite)
		return {ball: ball, container: sprite}
	}

	updateFrameBuffers = () => {
		this.ball.style.width = this.worldToScreenCoord(this.size, 0) + "px"
		this.ball.style.height = this.worldToScreenCoord(this.size, 0) + "px"
		this.container.style.top = this.worldToScreenCoord(this.position) + "px"
	}

	gameLoop = () => {
		this.container.style.top = this.worldToScreenCoord(this.position) + "px"
	}

	checkCollision = (ballPosition, currentColor, playerBall) => {
		if (ballPosition < this.position) {
			this.ball.style.opacity = 0
			playerBall.colorSwitch(this.currentColor)
		}
		return false
	}
}
