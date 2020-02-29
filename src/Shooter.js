
class Shooter {

    constructor(){
        this.reset()
    }

    reset(){
        this.keys = {}
        this.ennemyCount = 5
        this.player = new Player(this)
        this.gamerate = new Gamerate()
        this.ennemies = []
        this.bonus = []
        for(let i=0; i<this.ennemyCount; i++){
            this.ennemies.push(new YellowEnnemy(this))
        }
    }

    step(){
        this.bonus = this.bonus.filter( bonus => !bonus.isOutOfLimits() )
        this.ennemyCount = map(this.player.score, 0, 10, 5, 20)
        while(this.ennemies.length < this.ennemyCount)
            this.ennemies.push(new YellowEnnemy(this))
        if(this.gamerate.canTrigger(true)){
            this.ennemies.forEach( ennemy => ennemy.step() )
            this.player.step()
        }
        this.ennemies.forEach( ennemy => {
            this.ennemies.forEach( ennemy2 => {
                if(this.areOnContact( ennemy, ennemy2 ) && ennemy !== ennemy2){
                    ennemy.lif += ennemy2.life
                    ennemy2.placeOutOfLimits()
                }
            })
        })
        this.ennemies = this.ennemies.filter( ennemy => !ennemy.isOutOfLimits() )
        if(Math.random() < .001)
        this.bonus.push(new Bonus(this))
    }

    move( x, y ){
        this.ennemies.forEach( ennemy => ennemy.move(x,y) )
        this.player.shoots.forEach( shoot => shoot.move(x,y) )
        this.bonus.forEach( bonus => bonus.move(x,y) )
    }

    draw(){
        background(0)
        translate(
            width * .5, 
            height * .5
        )
        this.ennemies.forEach( ennemy => ennemy.draw() )
        this.bonus.forEach( bonus => bonus.draw() )
        this.player.draw()
    }

    keyPressed(){ this.keys[key] = true }
    keyReleased(){ this.keys[key] = false }

    moveKeysIsNotPressed(){
        for(const _key in this.keys)
            if(this.keys[_key] && (
                [
                    'ArrowUp',
                    'ArrowDown',
                    'ArrowLeft',
                    'ArrowRight'
                ].includes(_key)
            )) return false
        return true
    }

    shootKeysIsNotPressed(){
        for(const _key in this.keys)
            if(this.keys[_key] && (
                ['z','q','s','d'].includes(_key)
            )) return false
        return true
    }

    areOnContact( positionnable1, positionnable2 ){
        return (
            dist(
                positionnable1.x,
                positionnable1.y,
                positionnable2.x,
                positionnable2.y
            ) < (
                (positionnable1.currentRadius || positionnable1.radius) +
                (positionnable2.currentRadius || positionnable2.radius)
            ) / 2
        )
    }
    
}