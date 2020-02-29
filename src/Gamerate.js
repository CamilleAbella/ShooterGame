

class Gamerate {

    constructor( rate ){
        this.lastRate = Date.now()
        this.rate = rate
    }

    canTrigger( trigger ){
        const can = Date.now() > this.lastRate + this.rate
        if(can) if(trigger) this.trigger()
        return can
    }

    trigger(){
        this.lastRate = Date.now()
    }

}