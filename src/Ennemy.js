

class Ennemy extends Positionnable {

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
        fill(255,0,100)
        if(!this.isOnScreen()){
            ellipse(
                this.x > width * .5 ? width * .5 : this.x < width * -.5 ? width * -.5 : this.x,
                this.y > height * .5 ? height * .5 : this.y < height * -.5 ? height * -.5 : this.y,
                (this.currentRadius + 1) / 3
            )
        }
        stroke(200,0,200)
        strokeWeight(this.gain)
        ellipse(
            this.x,
            this.y,
            this.currentRadius
        )
        noStroke()
        
    }

    get currentRadius(){
        return Math.min(map(this.life, 0, this.lifeMax, 0, this.radius),150)
    }

    setPosition(){
        this.life = this.lifeMax
        while(this.isOnScreen()){
            this.x = random( width * -2, width * 2 )
            this.y = random( height * -2, height * 2 )
        }
    }

}