
class Positionnable {

    constructor( x, y, z ){
        this.z = z
        this.x = x
        this.y = y
    }

    get radius(){ return this.z }
    set radius( z ){ this.z = z }

    move( x, y ){
        this.x += x
        this.y += y
    }

    place( x, y ){
        this.x = x
        this.y = y
    }

    placeOutOfLimits(){
        this.x = width * 10
        this.y = height * 10
    }

    isOutOfLimits(){
        return (
            this.x > width * 4 ||
            this.x < width * -4 ||
            this.y > height * 4 ||
            this.y < height * -4
        )
    }

    isOnScreen( ignoreRadius ){
        const radius = ignoreRadius ? 0 : this.radius
        return (
            this.x + radius > width * -.5 && 
            this.x - radius < width * .5 &&
            this.y + radius > height * -.5 && 
            this.y - radius < height * .5
        )
    }

}