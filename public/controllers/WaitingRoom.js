import {redirect} from '../utilities/routerUtilities';

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
    
            }
            else{
                // TODO: Vérifier l'ID
                this.idPartyDOM.textContent = `#${this.idParty}`
                // TODO: Rejoindre une partie privée
                
            }
        }
        else if(this.type ===  'public'){
            // TODO: Rejoindre une partie public
        }
        else{
            window.location.replace("#")
        }
    }
}