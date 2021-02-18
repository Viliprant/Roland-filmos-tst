import {redirect} from '../utilities/routerUtilities';

export default class Lobby {
    constructor(param) {
        this.view = 'lobby.html';
        this.type = param;
    }

    init() {
        this.homeButton = document.querySelector("#top-left-button");
        this.typeWrapper = document.querySelector("#type-wrapper");
        this.formParty = document.querySelector("#form-party");
        this.nbPlayerWrapper = document.querySelector("#nb-player-wrapper");

        this.homeButton.addEventListener('click', (evt) => redirect(evt, "#"));

        switch (this.type) {
            case "partytype":
                this.typeWrapper.style.display = "flex";
                break;
            case "optionsparty":
                this.nbPlayerWrapper.style.display = "flex";
                break;
            case "join":
                this.formParty.style.display = "flex";
                break;
            case "lobby":
                this.nbPlayerWrapper.style.display = "flex";
            
                break;
        
            default:

                break;
        }
    }
}