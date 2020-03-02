
class Star extends Bonus {

    constructor( game ){
        super( game )
        this.applyEffect = () => {
            this.game.player.addConsomable(this)
        }
    }

    exec(){
        this.game.player.setTemporary('star', seconds(15), this.shape )
    }

    shape(x,y,w,h){
        star(
            x+w*.5,
            y+h*.5,
            w*.1,
            w*.3,
            8
        )
    }

}