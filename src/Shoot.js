

class Shoot extends Positionnable {

    constructor( player, directionX, directionY ){
        super( player.x, player.y, 20 )
        this.player = player
        this.directionX = directionX
        this.directionY = directionY
        this.speed = this.player.shootspeed
        const drillPassive = this.player.passives.find( p => p instanceof Drill )
        this.drill = drillPassive ? drillPassive.level + 1 : 1
        this.toIgnore = []
    }

    handleShoot( ennemy ){
        if(!this.toIgnore.includes(ennemy)){
            this.drill --
            this.toIgnore.push(ennemy)
            if(this.drill === 0)
            this.placeOutOfLimits()
            return true
        }
        return false
    }

    step(){
        if(this.directionX !== 0){
            this.x += this.speed * this.directionX
        }
        if(this.directionY !== 0){
            this.y += this.speed * this.directionY
        }
    }

    draw(){
        fill(255)
        ellipse(
            this.x,
            this.y,
            this.radius
        )
    }

}