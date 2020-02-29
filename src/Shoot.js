

class Shoot extends Positionnable {

    constructor( player, directionX, directionY ){
        super( player.x, player.y, 20 )
        this.player = player
        this.directionX = directionX
        this.directionY = directionY
        this.speed = this.player.shootspeed
    }

    step(){
        if(this.directionX !== 0){
            this.x += this.speed * this.directionX
        }
        if(this.directionY !== 0){
            this.y += this.speed * this.directionY
        }
    }

    draw(){
        fill(255)
        ellipse(
            this.x,
            this.y,
            this.radius
        )
    }

}