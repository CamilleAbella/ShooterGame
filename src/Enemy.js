

class Enemy extends Positionnable {

    constructor( game ){
        super( 0, 0, 40 )
        this.game = game
        this.gain = 1
        this.lifeMax = 2
        this.setPosition()
    }

    step(){
        this.game.player.shoots.forEach( shoot => {
            if(this.game.areOnContact(shoot,this)){
                if(shoot.handleShoot(this)) this.life --
            }
        })
        if(this.game.areOnContact(this,this.game.player)){
            this.game.player.life -= this.life
            this.life = 0
        }
        if(this.life <= 0){
            this.setPosition()
            this.game.player.score += this.gain
        }
    }

    draw(){
        fill(
            Math.min(map(this.gain, 1, 10, 100, 255),255),
            80,
            Math.max(map(this.gain, 1, 10, 255, 100),100)
        )
        if(!this.isOnScreen()){
            ellipse(
                this.x > width * .5 ? width * .5 : this.x < width * -.5 ? width * -.5 : this.x,
                this.y > height * .5 ? height * .5 : this.y < height * -.5 ? height * -.5 : this.y,
                (this.currentRadius + 1) / 3
            )
        }
        ellipse(
            this.x,
            this.y,
            this.currentRadius
        )
        
    }

    get currentRadius(){
        return Math.min(map(this.life, 0, this.lifeMax, 0, this.radius),150)
    }

    follow( positionnable, speed ){
        const angle = degrees(
            atan2(
                positionnable.y - this.y,
                positionnable.x - this.x
            ) + PI
        )
        const speedX = speed * cos(radians(angle))
        const speedY = speed * sin(radians(angle))
        this.move(
            speedX * -2,
            speedY * -2
        )
    }

    setPosition(){
        this.life = this.lifeMax
        while(this.isOnScreen()){
            this.x = random( width * -2, width * 2 )
            this.y = random( height * -2, height * 2 )
        }
    }

}