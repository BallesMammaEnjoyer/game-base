import Zombie from "./Zombie"
import Vampire from "./Vampire"
import Ghost from "./Ghost"
import UserInterface from "./userInterface"
import Player from "./Player"
import InputHandler from "./InputHandler"
import Platform from "./Platform"
import Camera from "./Camera"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.player = new Player(this)
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.ground = this.height - 100
    this.platforms = [
      new Platform(this, 0, this.ground, this.width, 100),
      new Platform(this, this.width - 200, 280, 200, 20),
      new Platform(this, 200, 200, 300, 20),
    ]
    this.camera = new Camera(this.player.x, this.player.y)
    //this.level = new First(this)
  }

  update(deltaTime) {
    this.player.update(deltaTime)
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

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      if (this.checkCollision(this.player, enemy)) {
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.markedForDeletion = true
        }
      })
    })
    this.platforms.forEach((platform) => {
      if (this.checkPlatformCollision(this.player, platform)) {
        this.player.speedY = 0
        this.player.y = platform.y - this.player.height
        this.player.grounded = true
      }
      this.enemies.forEach((enemy) => {
        if (this.checkPlatformCollision(enemy, platform)) {
          enemy.speedY = 0
          enemy.y = platform.y - enemy.height
        }
      })
    })

  }
  draw(context) {
    this.platforms.forEach((platform) => platform.draw(context))
    this.ui.draw(context)
    this.camera.apply(context)
    // this.level.draw(context)
    this.player.draw(context, this.camera.x, this.camera.y)
    this.enemies.forEach((enemy) =>
      enemy.draw(context, this.camera.x, this.camera.y)
    )
    this.camera.reset(context)
  }

  addEnemy() {
    this.spawn = Math.floor(Math.random() * 3);
    console.log(this.spawn)
    if (this.spawn == 0) {
      this.enemies.push(new Zombie(this))
    }
    else{
      if (this.spawn == 1){
        this.enemies.push(new Ghost(this))
      }
      else{
        this.enemies.push(new Vampire(this))
      }

    }
    
  }

  checkCollision(object1, object2) {

    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
  checkPlatformCollision(object, platform) {
    if (
      object.y + object.height >= platform.y &&
      object.y < platform.y &&
      object.x + object.width >= platform.x &&
      object.x <= platform.x + platform.width
    ) {
      if (object.grounded && object.y + object.height > platform.y) {
        object.speedY = 0
        object.y = platform.y - object.height
        object.grounded = true
      }
      return true
    } else {
      if (object.grounded && object.y + object.height < platform.y) {
        object.grounded = false
      }
      return false
    }
  }





}
