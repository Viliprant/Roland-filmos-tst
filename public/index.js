import Router from 'vanilla-router';
import Home from './controllers/Home';
import PartySettings from './controllers/PartySettings';
import Game from './controllers/Game';
import WaitingRoom from './controllers/WaitingRoom';
import SocketIOClient from './socketClient';

// MOBILE HEIGHT (URL BAR)
const appli = document.querySelector("#app");
appli.style.height = `${window.innerHeight}px`;

let myRouter = new Router({
    mode: 'hash'
});

/* Accueil */
myRouter.add('/', function (name) {
    dispatchRoute(new Home());
});
/* Party Setting */
myRouter.add('/partysettings/(:any)', function (param) {
    dispatchRoute(new PartySettings(param));
});
/* Waiting Room */
myRouter.add('/waitingroom/(:any)/(:any)', function (type, id) {
    SocketIOClient.service('games').get(id)
        .then(game => {
            if(game && !game.UnauthorizedAccess){
                dispatchRoute(new WaitingRoom(type, game));
            }
            else{
                window.location = '#/partysettings/partytype';
            }
        })
});
/* Lobby */
myRouter.add('/game', function () {
    dispatchRoute(new Game());
});

myRouter.addUriListener();
myRouter.check();

const app = document.getElementById('app');

function dispatchRoute(controller) {
    return fetch(`views/${controller.view}`)
        .then(res => res.text())
        .then(async htmlContent => {
            app.innerHTML = htmlContent;
            await controller.init();
        });
}