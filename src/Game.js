import Slime from "./Slime"
import UserInterface from "./userInterface"
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
    this.ui = new UserInterface(this)
    this.keys = []
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 2000
  }

  update(deltaTime) {
    this.Player.update(deltaTime)
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy()
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
    this.enemies.forEach((enemy) => enemy.update(deltaTime))
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  draw(context) {
    this.ui.draw(context)
    this.Player.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
  }
  addEnemy() {
    this.enemies.push(new Slime(this))
  }

  
  

  
}
