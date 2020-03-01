
class Heal extends Bonus {

    constructor( game ){
        super( game )
        this.applyEffect = () => {
            this.game.player.consomables.push({
                name: 'heal',
                used: false,
                exec: g => g.player.life = g.player.lifeMax
            })
        }
    }

}