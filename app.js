const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const helmet = require('helmet');
var cors = require('cors');

const socketListeners = require('./RealTime/socketListeners.js');

const UserService = require('./RealTime/services/UserService.js')
const GameService = require('./RealTime/services/GameService.js');
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

socketListeners(app);

// Envoie uniquement à la personne connectée
app.service('users').publish('created', (data, context) => {
    return [
        app.channel(app.channels).filter(connection =>
            connection.payload === context.data.payload
        )
    ];
});

app.service('games').hooks({
    before: {
      create(context) {
        const params = context.params;
        if(Object.keys(params).length > 0){ // mean that from client
            context.data = {
                id: random(process.env.NB_STR_ID),
                owner: params.payload.payload,
                nbMaxPlayers: process.env.NB_PLAYER_MAX,
                type: 'private',
            }
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

app.service('games').create({})