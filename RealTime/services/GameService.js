const Game = require('../../Models/Game.js');

module.exports = class GameService{
    constructor(){
        this.games = [];
    }

    async find(params) {
        return [];
    }
    async get(id, params) {}
    async create(data, params) {
        const newGame = new Game(data.id, data.userPayload, data.type, data.nbMaxPlayers);

        this.games.push(newGame);

        return newGame;
    }
    async update(id, data, params) {}
    async patch(id, data, params) {}
    async remove(id, params) {}
    setup(app, path) {}
}