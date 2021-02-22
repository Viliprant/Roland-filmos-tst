module.exports = class Game{
    constructor(id, owner, type, nbMaxPlayers = process.env.NB_PLAYER_MAX){
        this.id = id;
        this.owner = owner;
        this.type = type;
        this.nbMaxPlayers = nbMaxPlayers;
        this.participants = [];
        this.authorizedIDs = [owner];
        this.isLocked = false;
    }
}