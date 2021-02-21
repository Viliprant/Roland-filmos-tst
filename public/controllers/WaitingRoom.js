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
        this.wrapperParticipants = document.querySelector("#participants");

        SocketIOClient.service('games').get(this.game.id)
            .then(game => {
                if(game && !game.UnauthorizedAccess){
                    this.game = game;
                    game.participants.forEach(participant => this.updateDOM(participant));
                    this.handleWaitingRoom();
                }
                else{
                    window.location = '#/partysettings/partytype';
                }
            })

        this.homeButton.addEventListener('click', (evt) => {
            SocketIOClient.service('games').update(this.game.id , {isLeaving : true});

            redirect(evt, "#");
        }, {once : true});
    }

    handleWaitingRoom(){
        this.idPartyDOM.textContent = `#${this.game.id}`
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