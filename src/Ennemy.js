

class Ennemy extends Positionnable {

    constructor( game ){
        super( 0, 0, 40 )
        this.game = game
        this.speed = 2
        this.lifeMax = 2
        this.setPosition()
    }

    step(){
        this.game.player.shoots.forEach( shoot => {
            if(this.game.areOnContact(shoot,this)){
                shoot.placeOutOfLimits()
                this.life --
            }
        })
        if(this.game.areOnContact(this,this.game.player)){
            this.game.player.life -= this.life
            this.life = 0
        }
        if(this.life <= 0){
            this.setPosition()
            this.game.player.score ++
        }
    }

    get currentRadius(){
        return map(this.life, 0, this.lifeMax, 0, this.radius)
    }

    setPosition(){
        this.life = this.lifeMax
        while(this.isOnScreen()){
            this.x = random( width * -2, width * 2 )
            this.y = random( height * -2, height * 2 )
        }
    }

}