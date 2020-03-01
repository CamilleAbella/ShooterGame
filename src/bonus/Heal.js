
class Heal extends Bonus {

    constructor( game ){
        super( game )
        this.applyEffect = () => {
            this.game.player.addConsomable(this)
        }
    }

    exec(){
        this.game.player.life = this.game.player.lifeMax
    }

    shape(x,y,w,h){
        rect(
            x + w * .4,
            y + h * .2,
            w * .2,
            h * .6,
            2
        ) 
        rect(
            x + w * .2,
            y + h * .4,
            w * .6,
            h * .2,
            2
        )
    }

}