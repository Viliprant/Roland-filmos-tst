import {redirect} from '../utilities/routerUtilities';
import {getPayload} from '../utilities/localstorageUtilities';
import SocketIOClient from '../socketClient';

export default class WaitingRoom {
    constructor(type, game) {
        this.view = 'waitingRoom.html';
        this.type = type;
        this.game = game
    }

    init() {
        const localUserID = JSON.parse(getPayload()).id;

        this.homeButton = document.querySelector("#top-left-button");
        this.idPartyDOM = document.querySelector("#id-party");
        this.wrapperParticipants = document.querySelector("#participants");
        this.startGameButton = document.querySelector("#start-game");

        this.handleWaitingRoom();

        this.homeButton.addEventListener('click', (evt) => {
            SocketIOClient.service('games').update(this.game.id , {isLeaving : true});
            redirect(evt, "#");
        }, {once : true});

        if(this.game.owner === localUserID)
        {
            this.startGameButton.classList.add('has-permission');
            this.startGameButton.addEventListener('click', (evt) => {
                evt.preventDefault();
                if (this.game.participants.length > 1) {
                    SocketIOClient.service('games').update(this.game.id, {
                        isLocked: true,
                    })
                }
            });
        }

        
    }

    handleWaitingRoom(){
        this.idPartyDOM.textContent = `#${this.game.id}`
        this.game.participants.forEach(participant => this.updateDOM(participant));


        SocketIOClient.service('games').on('updated', (game) => {
            if (game.isLocked) {
                window.location = `#/game/${game.id}`;
            }
            this.game = game;
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