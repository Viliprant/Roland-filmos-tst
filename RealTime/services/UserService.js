const User = require('../../Models/User.js');

module.exports = class UserService{
    constructor(){
        this.users = [];
    }

    async find(params) {
        return this.users;
    }
    async get(id, params) {
        return this.users[id];
    }
    async create(data, params) {
        const id = data.payload;

        const newUser = new User(id, data.username, data.connectionID)

        this.users[id] = newUser;

        return newUser;
    }
    async update(id, data, params) {
        if(this.users[id]){
            this.users[id].username = data.username;
        }

        return this.users[id];
    }
    async patch(id, data, params) {}
    async remove(id, connectionID) {
        const removedUser = this.users[id];

        if(removedUser && removedUser.connectionID === connectionID){
            delete this.users[id];
        }

        return removedUser;
    }
    setup(app, path) {}
}