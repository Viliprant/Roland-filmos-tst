const GameStates = require('../../Models/GameStates.js');

module.exports = class GameStatesService{
    constructor(){
        this.gameStatesList = [];
    }

    async find(params) {
        return [];
    }
    async get(id, params) {
        return this.gameStatesList[id];
    }
    async create(data, params) {
        const newGameStates = new GameStates(data.id, data.players, data.firstActor);

        this.gameStatesList[newGameStates.id] = newGameStates;

        return newGameStates;
    }
    async update(id, data, params) {
        const gameStates = this.gameStatesList[id];
        const userID = params.userID;
        
        return this.games[id];
    }
    async patch(id, data, params) {
        return this.games[id];
    }
    async remove(id, params) {}
    setup(app, path) {}
}