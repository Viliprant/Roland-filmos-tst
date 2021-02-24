export default class Game {
    constructor(states) {
        this.states = states;
        this.view = `gameStates.html`;
    }

    init() {
        const defeatWrapper = document.querySelector('#defeat');
        const typingWrapper = document.querySelector('#typing');
        const validationWrapper = document.querySelector('#validation-step');
        const victoryWrapper = document.querySelector('#victory');
        
        console.log(this.states);

        this.handleGameStates();

        //TODO: Ecouter les évènements des updates
        //TODO: Mettre à jour le DOM en fonction du tours des joueurs
    }

    handleGameStates(){
        if(this.isDefeated()){
            console.log('defeat');
        }
        else{
            if(this.isHisTurn()){
                console.log('your turn');
            }
            else{
                console.log('waiting something');
            }
        }
    }
    isHisTurn(){
        return true;
    }
    isDefeated(){
        return true;
    }
}