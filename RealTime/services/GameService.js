const Game = require('../../Models/Game.js');

module.exports = class GameService{
    constructor(){
        this.games = [];
    }

    async find(params) {
        return [];
    }
    async get(id, params) {
        return this.games[id];
    }
    async create(data, params) {
        const newGame = new Game(data.id, data.userPayload, data.type, data.nbMaxPlayers);

        this.games[newGame.id] = newGame;

        return newGame;
    }
    async update(id, data, params) {}
    async patch(id, data, params) {}
    async remove(id, params) {}
    setup(app, path) {}
}