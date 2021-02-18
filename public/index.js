import Router from 'vanilla-router';
import Home from './controllers/Home';
import Lobby from './controllers/Lobby';
import Game from './controllers/Game';

let myRouter = new Router({
    mode: 'hash'
});

/* Accueil */
myRouter.add('/', function (name) {
    dispatchRoute(new Home());
});
/* Lobby */
myRouter.add('/lobby/(:any)', function (param) {
    dispatchRoute(new Lobby(param));
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