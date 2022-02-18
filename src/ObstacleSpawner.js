import Circle from "./Obstacles/Circle.js"
import ColorSwitch from "./Obstacles/ColorSwitch.js"

export default class ObstacleSpawner {
	constructor(gameSettings) {
		this.worldToScreenCoord = gameSettings.worldToScreenCoord
		this.screenSize = this.worldToScreenCoord(gameSettings.worldSize, 0)
		this.obstacles = [Circle, ColorSwitch]
		this.currentlyInTheField = []
		this.gameSettings = gameSettings
		this.switchAvailable = 0
	}

	spawn = (scroll) => {
		let i = Math.floor(
			Math.random() * this.obstacles.length - this.switchAvailable
		)
		try {
			this.currentlyInTheField.push(
				new this.obstacles[i](this.gameSettings, scroll)
			)
		} catch {
			this.currentlyInTheField.push(
				new this.obstacles[i + 1](this.gameSettings, scroll)
			)
		}
		if (i == this.obstacles.length - 1) {
			this.switchAvailable = 1
		} else {
			this.switchAvailable = 0
		}
	}

	checkCollision = (position, color, playerBall) => {
		let collided = false
		if (this.worldToScreenCoord(position) > this.screenSize) {
			return true
		}
		this.currentlyInTheField.forEach((obstacle) => {
			if (obstacle.checkCollision(position, color, playerBall)) {
				collided = true
			}
		})
		return collided
	}

	updateFrameBuffers = () => {
		this.screenSize = this.worldToScreenCoord(
			this.gameSettings.worldSize,
			0
		)
		this.currentlyInTheField.forEach((obstacle) =>
			obstacle.updateFrameBuffers()
		)
	}

	gameOver = () => {
		this.currentlyInTheField = []
	}
}
