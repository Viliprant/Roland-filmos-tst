import {redirect} from '../utilities/routerUtilities';
import random from 'string-random';

export default class WaitingRoom {
    constructor(type, param) {
        this.view = 'waitingRoom.html';
        this.type = type;
        this.idParty = param;
    }

    init() {
        this.homeButton = document.querySelector("#top-left-button");
        this.idPartyDOM = document.querySelector("#id-party");

        this.homeButton.addEventListener('click', (evt) => redirect(evt, "#"), {once : true});

        if(this.type === 'private'){
            if(!this.idParty){
                // TODO: Créer une partie
                this.idParty = random(6).toLowerCase();
            }
            else{
                // TODO: Vérifier l'ID
                // TODO: Rejoindre une partie privée
            }
            this.idPartyDOM.textContent = `#${this.idParty}`
        }
        else if(this.type ===  'public'){
            // TODO: Rejoindre une partie public
        }
        else{
            window.location.replace("#")
        }
    }
}