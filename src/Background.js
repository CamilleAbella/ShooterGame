
class Background extends Positionnable {

    constructor( particleCount ){
        super( 0, 0 )
        this.particleCount = particleCount
        this.particles = []
        while(this.particles.length < this.particleCount){
            this.particles.push(new Particle(this))
        }
    }

    move( x, y ){
        this.particles.forEach( particle => particle.move( x, y ) )
    }

    step(){
        this.particles.forEach( particle => particle.step() )
    }

    draw(){
        this.particles.forEach( particle => particle.draw() )
    }

}

class Particle extends Positionnable {

    constructor( background ){
        super(0,0,0)
        this.background = background
        this.reset()
    }

    get color(){
        return map( this.z, 0, 1, 5, 50 ) * this.intensity
    }

    reset(){
        this.intensity = 0
        this.z = Math.random()
        this.x = random( -width, width )
        this.y = random( -height, height )
    }

    move( x, y ){
        super.move(
            x * this.z,
            y * this.z
        )
    }

    step(){
        if(this.intensity < 1)
        this.intensity += .02
        if(!this.isOnScreen())
        this.reset()
    }

    draw(){
        fill(this.color)
        ellipse(
            this.x,
            this.y,
            5 + this.z * 5
        )
    }

}