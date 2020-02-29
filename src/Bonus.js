
const types = [
    'life',
    'drill',
    'double'
]

class Bonus extends Positionnable {

    constructor( game ){
        super( 0, 0, 25 )
        this.game = game
        this.type = types[Math.floor(Math.random()*types.length)]
        this.setPosition()
    }

    draw(){
        fill(0,255,0)
        ellipse(
            this.x,
            this.y,
            this.radius
        )
    }

    step(){
        if(this.game.areOnContact(this,this.game.player)){
            this.placeOutOfLimits()
        }
    }

    setPosition(){
        while(this.isOnScreen()){
            this.x = random( width * -2, width * 2 )
            this.y = random( height * -2, height * 2 )
        }
    }

}