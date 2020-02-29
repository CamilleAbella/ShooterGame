
class Positionnable {

    constructor( x, y, radius ){
        this.radius = radius
        this.x = x
        this.y = y
    }

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

    isOnScreen(){
        return (
            this.x + this.radius > width * -.5 && 
            this.x - this.radius < width * .5 &&
            this.y + this.radius > height * -.5 && 
            this.y - this.radius < height * .5
        )
    }

}