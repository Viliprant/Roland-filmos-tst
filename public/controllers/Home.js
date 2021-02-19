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
        this.rulesButton = document.querySelector("#top-left-button");
        this.rulesWrapper = document.querySelector("#rules");

        this.usernameSpan.textContent = this.username;
        this.usernameInput.value = this.username;

        this.rulesButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.rulesWrapper.classList.add('show');

            this.rulesWrapper.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.rulesWrapper.classList.remove('show');
            }, {once: true})
        })
        this.startGameButton.addEventListener('click', (evt) => redirect(evt, "#/partySettings/partytype"), {once : true});
        this.joinGameButton.addEventListener('click', (evt) => redirect(evt, "#/partySettings/join"), {once : true});

        this.usernameSpan.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.usernameSpan.style.display = 'none';
            this.usernameForm.style.display = 'flex';
            this.usernameInput.focus();
        })
        this.usernameForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const formData = new FormData(evt.currentTarget);

            this.usernameSpan.style.display = 'block';
            this.usernameForm.style.display = 'none';

            this.username = formData.get('username').trim();
            this.usernameSpan.textContent = this.username;

            setUsername(this.username);
        })
    }
}
