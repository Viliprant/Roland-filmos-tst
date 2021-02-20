const random = require('string-random');

module.exports =  (app) => {
    app.on('connection', connection => {
        app.channel('everybody').join(connection);

        if(!connection.payload){
            connection.payload = random(10);
            app.service('users').create({
                payload: connection.payload
            });
        }
        else{
            connection.payload = JSON.parse(connection.payload);
        }
    });
}