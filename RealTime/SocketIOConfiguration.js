const socketio = require('@feathersjs/socketio');

const SocketIOConfiguration = (app) => socketio( (io) => {
    io.use(function (socket, next) {
      const userID = JSON.parse(socket.handshake.query.payload).id;
  
      socket.feathers.connectionID = socket.client.id;
      socket.feathers.userID = userID;
      socket.feathers.username = socket.handshake.query.username;
      next();
    });
  
    io.on('connection', (socket) => {
      socket.on('disconnect', async () => {
        const impactedGames = await app.service('games').RemoveParticipant(socket.feathers.userID);
        
        for (const key in impactedGames) {
            const gameToUpdate = impactedGames[key];
            const game = await app.service('games').update(gameToUpdate.id, gameToUpdate);
        } 
        
        await app.service('users').remove(socket.feathers.userID, socket.id);
      })
    })
});

module.exports = SocketIOConfiguration;