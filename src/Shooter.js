
const existingEnnemies = [
    Aya, Blob
]

const existingBonus = [
    Heal, Drill, Star
]

class Shooter {

    constructor(){
        this.keysImage = loadImage('img/keys.png')
        this.showKeysStepsInit = 200
        this.maxEnnemyCount = 30
        this.reset()
    }

    reset(){
        this.showKeys = true
        this.showKeysSteps = this.showKeysStepsInit
        this.keys = {}
        this.ennemyCount = 5
        this.player = new Player(this)
        this.rate = new Gamerate(30)
        this.background = new Background(30,0,1)
        this.foreground = new Background(10,1,2)
        this.ennemies = []
        this.bonus = []
        for(let i=0; i<this.ennemyCount; i++){
            this.ennemies.push(
                new existingEnnemies[Math.floor(Math.random()*existingEnnemies.length)](this)
            )
        }
    }

    step(){
        if(this.showKeys){
            if (
                !this.moveKeysIsNotPressed() ||
                !this.shootKeysIsNotPressed()
            ){
                this.showKeys = false
            }
        }else if(this.showKeysSteps > 0){
            this.showKeysSteps --
        }else{
            this.background.step()
            this.foreground.step()
            this.bonus.forEach( bonus => bonus.step() )
            this.bonus = this.bonus.filter( bonus => !bonus.isOutOfLimits() )
            this.ennemies = this.ennemies.filter( ennemy => !ennemy.isOutOfLimits() )
            this.ennemyCount = Math.floor(Math.min(map(this.player.score, 0, 100, 4, 20), this.maxEnnemyCount))
            while(this.ennemies.length < this.ennemyCount)
                this.ennemies.push(
                    new existingEnnemies[Math.floor(Math.random()*existingEnnemies.length)](this)
                )
            if(this.rate.canTrigger(true)) {
                this.ennemies.forEach( ennemy => ennemy.step() )
                this.player.step()
            }
            if(Math.random() < .05)
                this.bonus.push(
                    new existingBonus[Math.floor(Math.random()*existingBonus.length)](this)
                )
        }
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
        this.ennemies.forEach( ennemy => ennemy.draw() )
        this.bonus.forEach( bonus => bonus.draw() )
        this.player.draw()
        this.foreground.draw()
        fill(255)
        textAlign(CENTER)
        textSize(25)
        text(`Score : ${this.player.score}`, 0, height * -.5 + 50)
        if(this.showKeys){
            tint(255, map(this.showKeysSteps,this.showKeysStepsInit,0,255,0))
            image(this.keysImage,-400,-300)
        }
    }

    keyReleased(_key){ this.keys[_key] = false }
    keyPressed(_key){ this.keys[_key] = true
        this.player.keyPressed(_key)
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