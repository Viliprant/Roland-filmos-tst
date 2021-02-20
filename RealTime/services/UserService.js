const User = require('../../Models/User.js');

module.exports = class UserService{
    constructor(){
        this.users = [];
    }

    async find(params) {
        return [];
    }
    async get(id, params) {}
    async create(data, params) {
        const id = data.payload;
        
        const user = new User(id, data.username)

        this.users.push(user);

        return user;
    }
    async update(id, data, params) {}
    async patch(id, data, params) {}
    async remove(id, params) {}
    setup(app, path) {}
}