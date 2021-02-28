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
        const userID = params.userID;
        
        if(game){
            if(data.isLeaving){
                const updatedParticipants = game.participants.filter( participant => participant !== userID );
                this.games[id] = {
                    ...game,
                    participants: updatedParticipants,
                };
            }
            else if(data.isLocked && game.participants.length > 1){
                this.games[id] = {
                    ...game,
                    isLocked: true,
                };
            }
            else{
                if(!game.isLocked){
                    this.games[id] = {
                        ...game,
                        participants: data.participants || game.participants,
                    };
                }
            }
        }

        return this.games[id];
    }
    async patch(id, data, params) {
        return this.games[id];
    }
    async remove(id, params) {}
    setup(app, path) {}

    async RemoveParticipant(userID)
    {
        const impactedGames = [];
        for (const key in this.games) {
            const game = this.games[key];
            const participantToRemove = game.participants.find( participant => participant === userID );
            if(participantToRemove){
                const updatedParticipants = game.participants.filter( participant => participant !== userID );
                const updatedGame = {
                    ...game,
                    participants: updatedParticipants,
                };

                impactedGames.push(updatedGame);
            }
        }

        return impactedGames;
    }
}