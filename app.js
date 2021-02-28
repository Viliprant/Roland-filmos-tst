const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');

const helmet = require('helmet');
var cors = require('cors');

const socketListeners = require('./RealTime/socketListeners.js');

const SocketIOConfiguration = require('./RealTime/SocketIOConfiguration.js');
const UserService = require('./RealTime/services/UserService.js');
const GameService = require('./RealTime/services/GameService.js');
const GameStatesService = require('./RealTime/services/GameStatesService.js');
const userHook = require('./RealTime/services/hooks/userHook.js');
const gameHook = require('./RealTime/services/hooks/gameHook.js');
const gameStatesHook = require('./RealTime/services/hooks/gameStatesHook.js');

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
app.configure(SocketIOConfiguration(app));

app.use(helmet());
app.use(cors());
require('dotenv').config()

app.use('/users', new UserService());
app.use('/games', new GameService());
app.use('/gameStates', new GameStatesService());
//TODO: Create GameStatesService

socketListeners(app);

app.service('users').hooks(userHook(app));
app.service('games').hooks(gameHook(app));
app.service('gameStates').hooks(gameStatesHook(app));

// Envoie uniquement à la personne connectée
app.service('users').publish('created', (data, context) => {
  return [
    app.channel(app.channels).filter(connection =>{
      return connection.userID === context.data.payload
    }
    )
  ];
});

app.service('games').publish('updated', (data, context) => {
  return app.channel(`game/${data.id}`);
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/views/home.html`)
})
app.post('/user', async (req, res) => {
  const id = random(10);
  const username = req.body.username;
  const newUser = await app.service('users').create({
      payload: id,
      username
  });
  res.json({id: newUser.id});
})

// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

// Start the server
app.listen(process.env.PORT || 3030).on('listening', () =>
  console.log(`Feathers server listening ${process.env.PORT || 3030}`)
);