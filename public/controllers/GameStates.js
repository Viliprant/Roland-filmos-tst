export default class Game {
    constructor() {
        const path = 'gameStates'
        this.view = `${path}/typeActorName.html`;
    }

    init() {
        console.log('Game')
    }
}