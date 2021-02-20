const random = require('string-random');

module.exports = class Authorization{
    constructor(serviceName, userID, ressourceID, isAuthorized = false){
        this.id = random(10);
        this.serviceName = serviceName;
        this.userID = userID;
        this.ressourceID = ressourceID;
        this.isAuthorized = isAuthorized;
    }
}