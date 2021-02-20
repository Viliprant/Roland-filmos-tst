const random = require('string-random');

module.exports =  (app) => {
    app.on('connection', async connection => {
        app.channel('everybody').join(connection);

        connection.payload = JSON.parse(connection.payload);

        const isExisting = await app.service('users').get(connection.payload.id);
        
        if(!isExisting){
            app.service('users').create({
                payload: connection.payload.id
            });
        }
    });
}