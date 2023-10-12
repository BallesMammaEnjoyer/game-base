import Player from "./Player"
import InputHandler from "./InputHandler"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.Player = new Player(this)
    this.input = new InputHandler(this)
    this.keys = []
  }

  update(deltaTime) {
    this.Player.update(deltaTime)
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }
  }

  draw(context) {
    this.Player.draw(context)
  }

  
  

  
}
