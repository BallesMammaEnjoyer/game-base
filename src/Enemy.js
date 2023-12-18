import Sprites from "./assets/css/Sprites.png"
export default class Enemy {
  constructor(game) {
    this.game = game
    this.x = 0
    this.y = 0
    this.speedX = 0
    this.speedY = 0
    this.markedForDeletion = false

    //sprite
    const image = new Image()
    image.src = Sprites
    this.image = image

    //sprite animation
    this.frameX = 0

    this.frameY
    this.maxFrame = 4
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps

    // flip sprite direction
    this.flip = false
    this.animationFps = 20
    this.animationTimer = 0
    this.animationInterval = 1000 / this.animationFps
    this.idleFrames = 10
    this.runFrames = 4

    this.spawn = 3


  }

  update(deltaTime) {
    this.speedY += this.game.gravity

    this.y += this.speedY
    this.x += this.speedX
    if (this.x < 0) this.markedForDeletion = true

    // flip sprite direction
    if (this.speedX < 0) {
      this.flip = true
    } else if (this.speedX > 0) {
      this.flip = false
    }

    // play run or idle animation
    if (this.speedX !== 0) {
      
      this.maxFrame = this.runFrames
    } else {
    
      this.maxFrame = 1
    }

    // sprite animation update
    if (this.animationTimer > this.animationInterval) {
      this.frameX++
      this.animationTimer = 0
    } else {
      this.animationTimer += deltaTime
    }

    // reset frameX when it reaches maxFrame
    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }
  }

  draw(context) {
    // draw sprite image
    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )
    if (this.flip) {

      context.restore()
    }

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '20px Arial'
      context.fillText(this.lives, this.x, this.y - 5)
      context.font = '12px Arial'
      context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
      context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
    }
  }
}