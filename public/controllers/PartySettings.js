import {redirect} from '../utilities/routerUtilities';
import SocketIOClient from '../socketClient';

export default class PartySettings {
    constructor(param) {
        this.view = 'partySettings.html';
        this.type = param;
    }

    init() {
        this.homeButton = document.querySelector("#top-left-button");
        this.typeWrapper = document.querySelector("#type-wrapper");
        this.formParty = document.querySelector("#form-party");
        this.nbPlayerWrapper = document.querySelector("#nb-player-wrapper");
        this.waitingRoomWrapper = document.querySelector("#waiting-room");

        this.ShowWrapper();

        this.homeButton.addEventListener('click', (evt) => redirect(evt, "#"), {once : true});
    }

    ShowWrapper(){
        switch (this.type) {
            case "partytype":
                this.handlePartyType()
                break;
            case "optionsparty":
                this.handleOptionsParty()
                break;
            case "join":
                this.handleJoin();
                break;
            default:
                window.location = "#"
                break;
        }
    }

    handlePartyType(){
        this.typeWrapper.style.display = "flex";
        this.publicButton = document.querySelector("#public");
        this.privateButton = document.querySelector("#private");

        this.publicButton.addEventListener('click', (evt) => {
            // redirect(evt, "#/partySettings/optionsparty");
        }, {once : true});
        this.privateButton.addEventListener('click', async (evt) => {
            const newGame = await SocketIOClient.service('games').create({})
            console.log(newGame);
            // redirect(evt, "#/waitingroom/private")
        }, {once : true});
    }
    handleOptionsParty(){
        this.nbPlayerWrapper.style.display = "flex";
        this.nbPlayerButtons = this.nbPlayerWrapper.querySelectorAll("button")
        this.nbPlayerButtons.forEach(nblayerButton => {
            const nbPlayer = nblayerButton.querySelector("span").textContent.trim();
            nblayerButton.addEventListener('click', (evt) => redirect(evt, `#/waitingroom/public/${nbPlayer}`), {once : true});
        });

    }
    handleJoin(){
        this.formParty.style.display = "flex";

        this.formParty.addEventListener('submit', (evt) => redirect(evt, "#/waitingroom/private/0000000000"), {once : true});
    }
}