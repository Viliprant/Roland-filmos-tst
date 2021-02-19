module.exports = class UserService{
    constructor(){
        this.users = [];
    }

    async find(params) {
        return [];
    }
    async get(id, params) {}
    async create(data, params) {
        const user = {
            username: data.username,
            payload: data.payload
        }

        this.users.push(user);

        return user;
    }
    async update(id, data, params) {}
    async patch(id, data, params) {}
    async remove(id, params) {}
    setup(app, path) {}
}