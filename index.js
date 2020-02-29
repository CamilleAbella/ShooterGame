
let shooter

function setup(){
    createCanvas(windowWidth, windowHeight)
    shooter = new Shooter()
}

function draw(){
    shooter.step()
    shooter.draw()
}

function keyPressed(){
    shooter.keyPressed()
}

function keyReleased(){
    shooter.keyReleased()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}