import Projectile from "./Projectile"
import Sprites from "./assets/css/Sprites.png"
export default class Player {
    constructor(game) {
        this.game = game
        this.width = 32
        this.height = 32
        this.x = 50
        this.y = 100

        this.speedX = 0
        this.speedY = 0
        this.maxSpeed = 4
        this.jumpSpeed = 16
        this.jumpTimer = 0
        this.jumpInterval = 600
        this.grounded = false
        this.projectiles = []
        this.shootTimer = 0.5
        this.shootDelay = 100

        //sprite image
        const image = new Image()
        image.src = Sprites
        this.image = image

        //sprite animation
        this.frameX = 0
        this.frameY = 0
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


    }

    update(deltaTime) {
        if (this.shootTimer < this.shootDelay) {
            this.shootTimer += deltaTime
        }
        if (this.grounded) {
            this.speedY = 0
        } else {
            this.speedY += this.game.gravity
        }

        if (this.game.keys.includes('ArrowLeft')) {
            this.direction = -1
            this.speedX = -this.maxSpeed
        } else if (this.game.keys.includes('ArrowRight')) {
            this.direction = 1
            this.speedX = this.maxSpeed
        } else {
            this.speedX = 0
        }

        if (this.jumpTimer <= this.jumpInterval) {
            this.jumpTimer += deltaTime
        }

        if (this.game.keys.includes('ArrowUp')) {
            this.jump()
        }

        this.y += this.speedY
        this.x += this.speedX

        // projectiles
        this.projectiles.forEach((projectile) => {
            projectile.update()
        })
        this.projectiles = this.projectiles.filter(
            (projectile) => !projectile.markedForDeletion
        )

        // play run or idle animation
        if (this.speedX !== 0) {
            this.frameY = 0
            this.maxFrame = this.runFrames
        } else {
            this.frameY = 0
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

    jump() {
        if (this.jumpTimer > this.jumpInterval && this.grounded) {
            this.speedY = -this.jumpSpeed
            this.jumpTimer = 0
            this.grounded = false
        }
    }
    draw(context) {

        this.projectiles.forEach((projectile) => {
            projectile.draw(context)
        })
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '12px Arial'
            context.fillText(this.frameX, this.x, this.y - 5)
        }
        // draw sprite image
        if (this.flip) {
            context.save()
            context.scale(-1, 1)
        }
        // sx sy sw sh dx dy dw dh
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
    }

    shoot() {
        if (this.shootTimer > this.shootDelay) {
            this.shootTimer = 0
            this.projectiles.push(
                new Projectile(this.game, this.x + this.width, this.y + this.height / 2)
            )

        }
    }

}