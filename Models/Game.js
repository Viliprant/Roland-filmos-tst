module.exports = class Game{
    constructor(id, owner, type, nbMaxPlayers = 10){
        this.id = id;
        this.owner = owner;
        this.type = type;
        this.nbMaxPlayers = nbMaxPlayers;
        this.mentionnedActors = [];
        this.participants = [];
    }
}