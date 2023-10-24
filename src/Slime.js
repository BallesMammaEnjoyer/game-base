import Enemy from './Enemy'

export default class Slime extends Enemy {
  constructor(game) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = this.game.width
    this.y = 363-this.height
    this.speedX = Math.random() * -1.5 - 0.5
    this.lives = 2
  }
}