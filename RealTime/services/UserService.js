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
    async update(id, data, params) {}
    async patch(id, data, params) {}
    async remove(id, params) {
        const removedUser = this.users[id];
        if(removedUser){
            this.users = this.users.filter( user => user.id !== id);
        }
        return removedUser;
    }
    setup(app, path) {}
}