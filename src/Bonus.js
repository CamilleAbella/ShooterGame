
const types = [
    'heal',     // [consomable] soigne completement le joueur
    'drill',    // les tirs traversent [LEVEL] ennemis
    'star',     // [consomable] tire de tous les cotés pendant 30 secondes
    'carnage',  // [consomable] tue tous les ennemis à l'écran
    'falcon',   // les tirs suivent leur cible (level 2 : visée auto)
    'imperio',  // les ennemis ayant [LEVEL] pv meurent avant de vous toucher
    'shotgun',  // les tirs infligent [LEVEL] degats en plus
    'bazooka',  // les tirs ont [LEVEL] tailles de plus
    'minigun',  // les tirs ont [LEVEL] cadence de plus
]

class Bonus extends Positionnable {

    constructor( game ){
        super( 0, 0, 20 )
        this.variator = 0
        this.variatorSens = false
        this.variatorSpeed = .2
        this.game = game
        this.applyEffect = ()=>{}
        this.setPosition()
    }

    draw(){
        noFill()
        stroke(255,0,50)
        strokeWeight(3)
        ellipse(
            this.x,
            this.y,
            this.radius
        )
        noStroke()
    }

    step(){
        if(this.variatorSens){
            if(this.variator < 1)
                this.variator += this.variatorSpeed
            else this.variatorSens = false
        }else{
            if(this.variator > -1)
                this.variator -= this.variatorSpeed
            else this.variatorSens = true
        }
        this.radius += this.variator
        if(this.game.areOnContact(this,this.game.player)){
            this.placeOutOfLimits()
            this.applyEffect()
        }
    }

    setPosition(){
        while(this.isOnScreen()){
            this.x = random( width * -2, width * 2 )
            this.y = random( height * -2, height * 2 )
        }
    }

}