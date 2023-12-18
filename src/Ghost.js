import Enemy from './Enemy'

export default class Ghost extends Enemy {
  constructor(game) {
    super(game)
    this.frameY = 7
    this.width = 32
    this.height = 32
    this.x = this.game.width
    this.y = 363-this.height
    this.speedX = Math.random() * -1 - 0.5
    this.lives = 2
  }
}