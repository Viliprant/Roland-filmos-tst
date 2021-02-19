import Router from 'vanilla-router';
import {redirect} from '../utilities/routerUtilities';
import {getUsername, setUsername} from '../utilities/localstorageUtilities';

export default class Home {
    constructor() {
        this.view = 'home.html';
        this.username = getUsername();
    }
    
    init() {
        this.joinGameButton = document.querySelector("#join-game");
        this.startGameButton = document.querySelector("#start-game");
        this.usernameSpan = document.querySelector("#username");
        this.usernameForm = document.querySelector("#username-form");
        this.usernameInput = this.usernameForm.querySelector("input");

        this.usernameSpan.textContent = this.username;
        this.usernameInput.value = this.username;
        
        this.startGameButton.addEventListener('click', (evt) => redirect(evt, "#/partySettings/partytype"), {once : true});
        this.joinGameButton.addEventListener('click', (evt) => redirect(evt, "#/partySettings/join"), {once : true});

        this.usernameSpan.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.usernameSpan.style.display = 'none';
            this.usernameForm.style.display = 'block';
            this.usernameInput.focus();
        })
        this.usernameForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const formData = new FormData(evt.currentTarget);

            this.usernameSpan.style.display = 'block';
            this.usernameForm.style.display = 'none';
            // TODO: Changer le nom dans le localstorage
            this.username = formData.get('username').trim();
            this.usernameSpan.textContent = this.username;

            setUsername(this.username);
        })
    }
}
