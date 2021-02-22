import {redirect} from '../utilities/routerUtilities';
import SocketIOClient from '../socketClient';

export default class WaitingRoom {
    constructor(type, game) {
        this.view = 'waitingRoom.html';
        this.type = type;
        this.game = game
    }

    init() {
        this.homeButton = document.querySelector("#top-left-button");
        this.idPartyDOM = document.querySelector("#id-party");
        this.wrapperParticipants = document.querySelector("#participants");

        this.handleWaitingRoom();

        this.homeButton.addEventListener('click', (evt) => {
            SocketIOClient.service('games').update(this.game.id , {isLeaving : true});

            redirect(evt, "#");
        }, {once : true});
    }

    handleWaitingRoom(){
        this.idPartyDOM.textContent = `#${this.game.id}`
        this.game.participants.forEach(participant => this.updateDOM(participant));


        SocketIOClient.service('games').on('updated', (game) => {
            this.wrapperParticipants.innerHTML = '';
            game.participants.forEach(participant => this.updateDOM(participant));
        })
    }

    updateDOM(username){
        const wrapperUser = document.createElement('div');
        wrapperUser.classList.add('participant');
        
        const usernameDOM = document.createElement('div');
        usernameDOM.classList.add('username');
        usernameDOM.textContent = username;

        wrapperUser.append(usernameDOM);
        this.wrapperParticipants.append(wrapperUser);
    }
}