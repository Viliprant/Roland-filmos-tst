module.exports = class User{
    constructor(id, username, connectionID){
        this.id = id;
        this.username = username || 'username';
        this.connectionID = connectionID;
    }
}