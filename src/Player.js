    export default class Player {
    constructor(game) {
      this.game = game
      this.width = 32
      this.height = 64
      this.x = 50
      this.y = 300
  
      this.speedX = 0
      this.speedY = 0
      this.maxSpeed = 10
      this.grounded = false
      this.jumpSpeed = -14
    }
  
    update(deltaTime) {
        
        if(this.y<300){
            this.speedY = 5
        }
        else{
            this.speedY = 0
            
        }
        
        if(this.game.keys.includes('ArrowRight')){
            this.speedX = this.maxSpeed
        }
        if(this.game.keys.includes('ArrowLeft')){
            this.speedX = -this.maxSpeed
        }
        if(this.game.keys.includes(' ')){
            this.speedY = this.jumpSpeed
            
        }
        

        this.x += this.speedX
        this.y += this.speedY
        console.log(this.y)
        this.speedX = 0
    }
  
    draw(context) {
      context.fillStyle = '#f00'
      context.fillRect(this.x, this.y, this.width, this.height)
    }
  }