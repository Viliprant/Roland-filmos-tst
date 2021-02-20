import {redirect} from '../utilities/routerUtilities';
import SocketIOClient from '../socketClient';

export default class WaitingRoom {
    constructor(type, id) {
        this.view = 'waitingRoom.html';
        this.type = type;
        this.game = { id }
    }

    init() {
        this.homeButton = document.querySelector("#top-left-button");
        this.idPartyDOM = document.querySelector("#id-party");

        SocketIOClient.service('games').get(this.game.id)
            .then(game => {
                if(game){
                    this.game = game;
                    this.idPartyDOM.textContent = `#${this.game.id}`
                    console.log(this.game);
                }
                else{
                    window.location = '#/partysettings/partytype';
                }
            })


        this.homeButton.addEventListener('click', (evt) => redirect(evt, "#"), {once : true});
    }
}