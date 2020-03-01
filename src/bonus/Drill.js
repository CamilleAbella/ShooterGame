
class Drill extends Bonus {

    constructor( game ){
        super( game )
        this.applyEffect = () => {
            this.game.player.addPassive(this)
        }
    }

    shape(x,y,w,h){
        ellipse(
            x+w*.5,
            y+h*.5,
            w*.6,
            h*.3
        )
    }

}