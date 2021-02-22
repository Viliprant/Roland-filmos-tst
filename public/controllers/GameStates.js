export default class Game {
    constructor(states) {
        const path = 'gameStates'
        this.view = `${path}/typeActorName.html`;
        this.states = states;
    }

    init() {
        console.log(this.states);

        //TODO: Ecouter les évènements des updates
        //TODO: Mettre à jour le DOM en fonction du tours des joueurs
    }
}