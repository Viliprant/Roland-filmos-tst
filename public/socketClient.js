import {getUsername, getPayload, setPayload} from './utilities/localstorageUtilities';

const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');

async function setSocketIOClient(){
  const client = feathers();

  if(getPayload() == '')
  {
    const id = await (await fetch(`${location.origin}/user`, {method: 'POST'})).json();
    setPayload(id);
  }

  const socket = io('', {
      query: {
        username: getUsername(),
        payload: getPayload()
      }
  });

  console.log(getUsername());
  console.log(getPayload());

  client.configure(socketio(socket));

  return client;
}

export default setSocketIOClient();