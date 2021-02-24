module.exports = class GameStates{
    constructor(id, players, firstActor){
        this.id = id;
        this.status = 'running';
        // TODO: Mélanger les joueurs
        this.players = players; // IDs array
        this.loosers = [];
        this.mentionnedActors = [firstActor];
        this.currentPlayer = 0;
    }

    init(){
        
    }
}