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
            const id = random(process.env.NB_STR_ID).toLowerCase();
            context.data = {
                id,
                owner: params.payload.id,
                nbMaxPlayers: process.env.NB_PLAYER_MAX,
                type: 'private',
            }
        }

        return context;
      }
    },
    after: {
      async get(context){
        const params = context.params;
        const data = context.result;
        const userID = params.payload.id;

        if(data){
          const isAlreadyInGame = data.participants.find( participant => participant === userID);
          const isFull = data.authorizedIDs.length >= data.nbMaxPlayers;

          if(isAlreadyInGame || isFull)
          {
            context.result = {UnauthorizedAccess: true};
          }
          else{

            context.result = await context.app.service('games').update(data.id, {
              ...data,
              participants: [...data.participants, userID],
            })

            const participants = context.result.participants;
            console.log('participants', participants);
            const usernames = [];
            for (const userID of participants) {
                const user = await context.app.service('users').get(userID);
                if(user){
                  usernames.push(user.username);
                }
            }

            const {authorizedIDs, ...safeData} = data;

            context.dispatch = {
              ...safeData,
              participants: usernames,
            };

            context.app.channel(`game/${data.id}`).join(params.connection);  
          }
        }
      },
      async update(context){
        const data = context.result;
        const participants = context.result.participants;
        const usernames = [];

        const {authorizedIDs, ...safeData} = data;


        for (const userID of participants) {
            const user = await context.app.service('users').get(userID);
            if(user){
              usernames.push(user.username);
            }
        }

        context.dispatch = {
          ...safeData,
          participants: usernames,
        };
      }
    }
});


app.service('games').publish('updated', (data, context) => {
  return app.channel(`game/${data.id}`);
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/views/home.html`)
})
app.post('/user', async (req, res) => {
  const id = random(10);
  const newUser = await app.service('users').create({
      payload: id
  });
  res.json({id: newUser.id});
})

// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

// Start the server
app.listen(process.env.PORT || 3030).on('listening', () =>
  console.log(`Feathers server listening ${process.env.PORT || 3030}`)
);