import Circle from "./Obstacles/Circle.js"

export default class ObstacleSpawner {
	constructor(gameSettings) {
		this.worldToScreenCoord = gameSettings.worldToScreenCoord
		this.screenSize = this.worldToScreenCoord(gameSettings.worldSize, 0)
		this.obstacles = [Circle]
		this.currentlyInTheField = []
		this.gameSettings = gameSettings
	}

	spawn = (scroll) => {
		let i = Math.floor(Math.random() * this.obstacles.length)
		this.currentlyInTheField.push(
			new this.obstacles[i](this.gameSettings, scroll)
		)
	}

	checkCollision = (position, color) => {
		let collided = false
		if (this.worldToScreenCoord(position) > this.screenSize) {
			return true
		}
		this.currentlyInTheField.forEach((obstacle) => {
			if (obstacle.checkCollision(position, color)) {
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
