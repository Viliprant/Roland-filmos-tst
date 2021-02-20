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
        const newGame = new Game(data.id, data.owner, data.type, data.nbMaxPlayers);

        this.games[newGame.id] = newGame;

        return newGame;
    }
    async update(id, data, params) {
        const game = this.games[id];
        
        if(game){
            this.games[id] = {
                ...game,
                ...data,
            };
        }

        return this.games[id];
    }
    async patch(id, data, params) {}
    async remove(id, params) {}
    setup(app, path) {}
}