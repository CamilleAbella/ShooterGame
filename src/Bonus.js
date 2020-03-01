
const types = [
    'heal',     // [consomable] soigne completement le joueur
    'drill',    // les tirs traversent [LEVEL] ennemis
    'star',     // [consomable] tire de tous les cotés pendant 30 secondes
    'carnage',  // [consomable] tue tous les ennemis à l'écran
    'falcon',   // les tirs suivent leur cible (level 2 : visée auto)
    'imperio',  // les ennemis ayant [LEVEL] pv meurent avant de vous toucher
    'shotgun',  // double les dégat causés par les tirs
    'bazooka',  // double la taille des tirs
    'minigun',  // double la cadence de tir
]

class Bonus extends Positionnable {

    constructor( game ){
        super( 0, 0, 25 )
        this.game = game
        this.applyEffect = ()=>{}
        this.setPosition()
    }

    draw(){
        fill(0)
        stroke(255)
        strokeWeight(2)
        ellipse(
            this.x,
            this.y,
            this.radius
        )
        noStroke()
    }

    step(){
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