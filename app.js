const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const helmet = require('helmet');
var cors = require('cors');

const socketListeners = require('./RealTime/socketListeners.js');

const UserService = require('./RealTime/services/UserService.js')
const GameService = require('./RealTime/services/GameService.js');
const AuthorizationService = require('./RealTime/services/AuthorizationService');
const random  = require('string-random');

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Host static files from the current folder
app.use(express.static(`${__dirname}/public`));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio((io) => {
  io.use(function (socket, next) {
    socket.feathers.connectionID = socket.client.id;
    socket.feathers.payload = socket.handshake.query.payload;
    socket.feathers.username = socket.handshake.query.username;
    next();
  });
}));

app.use(helmet());
app.use(cors());
require('dotenv').config()

app.use('/users', new UserService());
app.use('/games', new GameService());
app.use('/authorizations', new AuthorizationService());

socketListeners(app);

// Envoie uniquement à la personne connectée
app.service('users').publish('created', (data, context) => {
    return [
        app.channel(app.channels).filter(connection =>
            connection.payload === context.data.payload
        )
    ];
});

app.service('authorizations').hooks({
    before: {
      async create(context) {
        const data = context.data;
        const userID = JSON.parse(data.userID).payload;

        const ressource = await context.app.service(data.serviceName).get(data.ressourceID);
        if(ressource){
          const isAlreadyInGame = ressource.participants.find( participant => participant === userID);
          const isFull = ressource.authorizedIDs.length >= ressource.nbMaxPlayers;

          if(!isAlreadyInGame || !isFull)
          {
            context.data.isAuthorized = true;
          }
        }
        
        return context;
      }
    }
})

app.service('games').hooks({
    before: {
      create(context) {
        const params = context.params;
        if(Object.keys(params).length > 0){ // mean that from client
            const id = random(process.env.NB_STR_ID).toLowerCase();
            context.data = {
                id,
                owner: params.payload.payload,
                nbMaxPlayers: process.env.NB_PLAYER_MAX,
                type: 'private',
            }
        }

        return context;
      }
    },
    after: {
      create(context) {
        const params = context.params;
        if(Object.keys(params).length > 0){
          context.app.channel(context.data.id).join(params.connection);  
        }

        return context;
      }
    }
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/views/home.html`)
})
// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

// Start the server
app.listen(process.env.PORT || 3030).on('listening', () =>
  console.log(`Feathers server listening ${process.env.PORT || 3030}`)
);