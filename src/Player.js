
class Player extends Positionnable {

    constructor( game ){
        super( 0, 0, 50 )
        this.game = game
        this.lifeMax = 10
        this.life = this.lifeMax
        this.score = 0
        this.consomables = []
        this.shoots = []
        this.shootrate = new Gamerate(500)
        this.shootspeed = 15
        this.speedX = 0
        this.speedY = 0
        this.speedMax = 10
        this.acc = 3
        this.desc = .7
    }

    step(){

        // MORT ?

        if(this.life <= 0){
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

        // on déplace le joueur
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

        this.shoots = this.shoots.filter( shoot => !shoot.isOutOfLimits() )
        this.shoots.forEach( shoot => shoot.step() )

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
        fill(200,100)
        rect(
            this.x - 40,
            this.y - 50,
            map( this.life, 0, this.lifeMax, 0, 80 ),
            14,
            5
        )
        
    }

}