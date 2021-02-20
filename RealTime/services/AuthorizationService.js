const Authorization = require('../../Models/Authorization.js');

module.exports = class AuthorizationService{
    constructor(){
        this.Authorization = []
    }

    async find(params) {
        return 'not implemented';
    }
    async get(id, params) {
        return 'not implemented';
    }
    async create(data, params) {
        console.log(data);
        const newAuthorization = new Authorization(data.serviceName, data.userID, data.ressourceID, data.isAuthorized);

        this.Authorization[newAuthorization.id] = newAuthorization;

        return newAuthorization;
    }
    async update(id, data, params) {
        return 'not implemented';
    }
    async patch(id, data, params) {
        return 'not implemented';
    }
    async remove(id, params) {
        return 'not implemented';
    }
    setup(app, path) {}
}