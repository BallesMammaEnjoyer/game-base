export default class Projectile{
    constructor(game, x, y) {
        this.game = game
        this.width = 4
        this.height = 4
        this.x = x
        this.y = y
        this.range = 0
        this.reach = 5
        this.damage = 1
        this.speed = 10
        this.markedForDeletion = false
      }
      update() {
        this.speed = 10
        this.width += 1
        this.height +=1
        this.range += 1
        this.x += this.speed
        if (this.range>this.reach) {
          this.markedForDeletion = true
        }
      } 
      draw(context) {
        context.fillStyle = '#f00'
        context.fillRect(this.x, this.y, this.width, this.height)
      }
}