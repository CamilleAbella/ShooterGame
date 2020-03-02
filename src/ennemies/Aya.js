

class Aya extends Enemy {

    constructor( game ){
        super( game )
        this.speed = 4
    }

    step(){
        super.step()
        this.follow(
            this.game.player,
            this.speed
        )
    }

}