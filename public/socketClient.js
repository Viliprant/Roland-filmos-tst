import {getUsername, getPayload} from './utilities/localstorageUtilities';

const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');

const socket = io('', {
    query: {
      username: getUsername(),
      payload: getPayload()
    }
});

const client = feathers();
client.configure(socketio(socket));

export default client;