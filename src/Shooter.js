
const existingBonus = [
    Heal, Drill
]

class Shooter {

    constructor(){
        this.maxEnnemyCount = 40
        this.reset()
    }

    reset(){
        this.keys = {}
        this.ennemyCount = 5
        this.player = new Player(this)
        this.rate = new Gamerate(30)
        this.background = new Background(30,0,1)
        this.foreground = new Background(10,1,2)
        this.ennemies = []
        this.bonus = []
        for(let i=0; i<this.ennemyCount; i++){
            this.ennemies.push(new Blob(this))
        }
    }

    step(){
        this.background.step()
        this.foreground.step()
        this.bonus.forEach( bonus => bonus.step() )
        this.bonus = this.bonus.filter( bonus => !bonus.isOutOfLimits() )
        this.ennemies = this.ennemies.filter( ennemy => !ennemy.isOutOfLimits() )
        this.ennemyCount = Math.min(map(this.player.score, 0, 50, 5, 20), this.maxEnnemyCount)
        while(this.ennemies.length < this.ennemyCount)
            this.ennemies.push(new Blob(this))
        if(this.rate.canTrigger(true)){
            this.ennemies.forEach( ennemy => ennemy.step() )
            this.player.step()
        }
        const blobs = this.ennemies.filter( ennemy => ennemy instanceof Blob )
        blobs.forEach( blob => {
            if(!blob.isOutOfLimits())
            blobs.forEach( blob2 => {
                if(!blob2.isOutOfLimits())
                if(this.areOnContact( blob, blob2 ) && blob !== blob2){
                    blob.life += blob2.life
                    blob.gain += blob2.gain
                    blob2.placeOutOfLimits()
                }
            })
        })
        if(Math.random() < .005)
        this.bonus.push(
            new existingBonus[Math.floor(Math.random()*existingBonus.length)](this)
        )
    }

    move( x, y ){
        this.background.move( x, y )
        this.foreground.move( x, y )
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
        this.background.draw()
        fill(255)
        textAlign(CENTER)
        textSize(25)
        text(`Score : ${this.player.score}`, 0, height * -.5 + 50)
        this.ennemies.forEach( ennemy => ennemy.draw() )
        this.bonus.forEach( bonus => bonus.draw() )
        this.player.draw()
        this.foreground.draw()
    }

    keyReleased(){ this.keys[key] = false }
    keyPressed(){ this.keys[key] = true 
        this.player.keyPressed()
    }

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