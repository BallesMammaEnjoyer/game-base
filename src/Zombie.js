import Enemy from './Enemy'

export default class Zombie extends Enemy {
  constructor(game) {
    super(game)
    this.frameY = 5
    this.width = 32
    this.height = 32
    this.x = this.game.width
    this.y = 363-this.height
    this.speedX = Math.random() * -0.5 - 0.3
    this.lives = 2
  }
}