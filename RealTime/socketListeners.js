module.exports =  (app) => {
    app.on('connection', async connection => {
        app.channel('everybody').join(connection);

        const userID = connection.userID;
        const username = connection.username;
        const connectionID = connection.connectionID;

        const isExisting = await app.service('users').get(userID);
        
        if(!isExisting){
            await app.service('users').create({
                payload: userID,
                username,
                connectionID
            });
        }
        else{
            await app.service('users').update(userID, {
                payload: userID,
                username,
                connectionID
            });
        }
        console.log(connectionID);
        console.log( await app.service('users').get(userID));
    });
}