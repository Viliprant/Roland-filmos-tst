import Router from 'vanilla-router';
import {redirect} from '../utilities/routerUtilities';

export default class Home {
    constructor() {
        this.view = 'home.html';
    }
    
    init() {
        this.joinGameButton = document.querySelector("#join-game");
        this.startGameButton = document.querySelector("#start-game");
        
        this.startGameButton.addEventListener('click', (evt) => redirect(evt, "#/lobby/partytype"));
        this.joinGameButton.addEventListener('click', (evt) => redirect(evt, "#/lobby/join"));
    }
}
