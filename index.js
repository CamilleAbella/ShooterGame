
var shooter

function setup(){
    createCanvas(windowWidth, windowHeight)
    shooter = new Shooter()
}

function draw(){
    shooter.step()
    shooter.draw()
}

function keyPressed(){
    shooter.keyPressed(key)
}

function keyReleased(){
    shooter.keyReleased(key)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}