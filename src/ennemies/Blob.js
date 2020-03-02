

class Blob extends Ennemy {

    constructor( game ){
        super( game )
        this.speed = 2
    }

    step(){
        if(!this.isOutOfLimits()){
            super.step()
            this.follow(
                this.game.player,
                this.speed
            )
            this.game.ennemies.forEach( ennemy => {
                if(!ennemy.isOutOfLimits())
                    if(this.life > ennemy.life)
                        if(this.game.areOnContact( this, ennemy ) && this !== ennemy ){
                            this.life += ennemy.life
                            this.gain += ennemy.gain
                            ennemy.placeOutOfLimits()
                        }
            })
        }
    }

}