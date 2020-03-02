
class Background extends Positionnable {

    constructor( particleCount, min, max ){
        super( 0, 0 )
        this.min = min
        this.max = max
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

    get opacity(){
        return map( this.z, 0, 1, 20, 80 ) * this.intensity
    }

    reset(){
        this.color = [random(100,255),0,random(100,255)]
        this.intensity = 0
        this.z = random( this.background.min, this.background.max )
        this.x = random( -width, width )
        this.y = random( -height, height )
    }

    move( x, y ){
        super.move(
            x * (this.z / 2),
            y * (this.z / 2)
        )
    }

    step(){
        if(this.intensity < 1)
        this.intensity += .023
        if(!this.isOnScreen())
        this.reset()
    }

    draw(){
        fill(
            ...this.color,
            this.opacity
        )
        ellipse(
            this.x,
            this.y,
            5 + this.z * 5
        )
    }

}