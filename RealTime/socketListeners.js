const random = require('string-random');

module.exports =  (app) => {
    app.on('connection', connection => {
        // console.log(connection.username);
        // console.log(connection.connectionID);
        // console.log(connection.payload);

        if(!connection.payload){
            connection.payload = random(10);
            app.service('users').create({
                payload: connection.payload
            });
        }
        else{
            connection.payload = JSON.parse(connection.payload);
        }

        app.channel('everybody').join(connection)
    });
}