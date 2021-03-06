
class Player extends Positionnable {

    constructor( game ){
        super( 0, 0, 50 )
        this.game = game
        this.lifeMax = 10
        this.life = this.lifeMax
        this.score = 0
        this.highscore = JSON.parse(localStorage.getItem('shooter')).highscore
        this.powaKeys = ['&','é','"',"'",'(','-','è']
        this.consomables = []
        this.passives = []
        this.shoots = []
        this.temporary = {}
        this.shootrate = new Gamerate(500)
        this.shootspeed = 15
        this.speedX = 0
        this.speedY = 0
        this.speedMax = 10
        this.acc = 3
        this.desc = .7
    }

    setTemporary( flag, duration, shape ){
        if(
            !this.temporary[flag] ||
            this.temporary[flag].timeout < Date.now()
        )
            this.temporary[flag] = { shape,
                triggerTime: Date.now(),
                timeout: Date.now() + duration
            }
        else this.temporary[flag].timeout += duration
    }

    getTemporary( flag ){
        if(!this.temporary[flag]) return false
        return this.temporary[flag].timeout > Date.now()
    }

    addPassive( passive ){
        const exists = this.passives.find( p => {
            return p.constructor.name === passive.constructor.name 
        })
        if(exists){
            exists.level ++
        }else{
            if(!passive.level)
            passive.level = 1
            this.passives.push(passive)
        }
    }

    addConsomable( consomable ){
        const exists = this.consomables.find( c => {
            return c.constructor.name === consomable.constructor.name
        })
        if(exists){
            exists.quantity ++
        }else{
            if(!consomable.quantity)
            consomable.quantity = 1
            this.consomables.push(consomable)
        }
    }

    step(){

        // MORT ?

        if(this.life <= 0){
            if(this.score > this.highscore){
                const storage = JSON.parse(localStorage.getItem('shooter'))
                storage.highscore = this.score
                localStorage.setItem('shooter',JSON.stringify(storage))
            }
            this.game.reset()
        }

        // DEPLACEMENTS

        const keys = this.game.keys

        if(this.game.moveKeysIsNotPressed()){

            this.speedX *= this.desc
            this.speedY *= this.desc

        }else{

            if(!keys.ArrowLeft && !keys.ArrowRight)
            this.speedX *= this.desc

            if(!keys.ArrowUp && !keys.ArrowDown)
            this.speedY *= this.desc

            if(keys.ArrowLeft) this.speedX -= this.acc
            if(keys.ArrowRight) this.speedX += this.acc 
            if(keys.ArrowUp) this.speedY -= this.acc
            if(keys.ArrowDown) this.speedY += this.acc

            if(this.speedX < this.speedMax * -1) this.speedX = this.speedMax * -1
            if(this.speedY < this.speedMax * -1) this.speedY = this.speedMax * -1
            if(this.speedX > this.speedMax) this.speedX = this.speedMax
            if(this.speedY > this.speedMax) this.speedY = this.speedMax

        }

        if(this.speedX < .1 && this.speedX > -.1)
        this.speedX = 0

        if(this.speedY < .1 && this.speedY > -.1)
        this.speedY = 0

        this.place(
            this.speedX * .5,
            this.speedY * .5
        )
        this.game.move(
            this.speedX * -1,
            this.speedY * -1
        )

        // SHOOTS

        if(this.shootrate.canTrigger()){
            const direction = {
                x: map(this.speedX * .5, this.speedMax * -.5, this.speedMax * .5, -.5, .5),
                y: map(this.speedY * .5, this.speedMax * -.5, this.speedMax * .5, -.5, .5)
            }
            if(this.getTemporary('star')){
                if(!this.game.shootKeysIsNotPressed()){
                    this.shootrate.trigger()
                    this.shoots.push(
                        new Shoot( this,
                            1 + direction.x,
                            direction.y
                        ),
                        new Shoot( this,
                            -1 + direction.x,
                            direction.y
                        ),
                        new Shoot( this,
                            direction.x,
                            1 + direction.y
                        ),
                        new Shoot( this,
                            direction.x,
                            -1 + direction.y
                        ),
                        new Shoot( this,
                            1 + direction.x,
                            1 + direction.y
                        ),
                        new Shoot( this,
                            -1 + direction.x,
                            1 + direction.y
                        ),
                        new Shoot( this,
                            1 + direction.x,
                            -1 + direction.y
                        ),
                        new Shoot( this,
                            -1 + direction.x,
                            -1 + direction.y
                        )
                    )
                }
            }else{
                if(keys.z) direction.y -= 1
                if(keys.q) direction.x -= 1
                if(keys.s) direction.y += 1
                if(keys.d) direction.x += 1
                if(!this.game.shootKeysIsNotPressed()){
                    this.shootrate.trigger()
                    this.shoots.push( new Shoot( this,
                        direction.x,
                        direction.y
                    ))
                }
            }

        }

        this.shoots = this.shoots.filter( shoot => !shoot.isOutOfLimits() )
        this.shoots.forEach( shoot => shoot.step() )

    }

    keyPressed(_key){
        this.powaKeys.forEach( (pk,i) => {
            if(_key === pk && this.consomables[i]){
                this.consomables[i].exec(this.game)
                this.consomables[i].quantity --
                if(this.consomables[i].quantity <= 0)
                this.consomables = this.consomables.filter( c => {
                    return c.constructor.name !== this.consomables[i].constructor.name
                })
            }
        })
    }

    draw(){
        this.shoots.forEach( shoot => shoot.draw() )
        fill(255)
        ellipse(
            this.x,
            this.y,
            this.radius
        )
        fill(0,100)
        stroke(255)
        strokeWeight(1)
        rect(
            this.x - 40,
            this.y - 50,
            80,
            14,
            5
        )
        noStroke()
        fill(
            map( this.life, 0, this.lifeMax, 255, 50 ),
            map( this.life, 0, this.lifeMax, 50, 255 ),
            50,
            200
        )
        rect(
            this.x - 40,
            this.y - 50,
            map( this.life, 0, this.lifeMax, 0, 80 ),
            14,
            5
        )
        let flagIndex = 0
        for(const flag in this.temporary){
            if(this.getTemporary(flag)){
                const temp = this.temporary[flag]
                fill(0,100)
                stroke(255)
                strokeWeight(1)
                rect(
                    this.x - 40,
                    this.y - (64 + 14 * flagIndex),
                    80,
                    14,
                    5
                )
                noStroke()
                fill(255,0,190)
                rect(
                    (this.x - 40) + map( Date.now(), temp.triggerTime, temp.timeout, 0, 66 ),
                    this.y - (64 + 14 * flagIndex),
                    map( Date.now(), temp.triggerTime, temp.timeout, 66, 0 ),
                    14,
                    5
                )
                fill(200,100)
                rect(
                    this.x + 26,
                    this.y - (64 + 14 * flagIndex),
                    14,
                    14,
                    5
                )
                fill(255,0,190)
                temp.shape(
                    this.x + 26,
                    this.y - (64 + 14 * flagIndex),
                    14,
                    14,
                    5
                )
                flagIndex ++
            }
        }
        const bonusLength = this.consomables.length + this.passives.length
        if(bonusLength > 0){
            fill(0,100)
            stroke(255)
            strokeWeight(1)
            const _width = bonusLength * 14
            rect(
                this.x - _width * .5,
                this.y + 36,
                _width,
                14,
                5
            )
            noStroke()
            this.bonus = [ ...this.consomables, ...this.passives ]
            this.bonus.forEach( (bonus, index) => {
                fill(200,100)
                rect(
                    this.x - _width * .5 + index * 14,
                    this.y + 36,
                    14,
                    14,
                    5
                )
                bonus.quantity ? fill(255,0,190) : fill(190,0,255)
                bonus.shape(
                    this.x - _width * .5 + index * 14,
                    this.y + 36,
                    14,
                    14
                )
                for(let i=0; i<(bonus.quantity||bonus.level); i++){
                    ellipse(
                        this.x - _width * .5 + 7 + index * 14,
                        this.y + 57 + i * 14,
                        5
                    )
                }
            })
        }
        
    }

}