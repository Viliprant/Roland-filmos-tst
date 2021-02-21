import {getUsername, getPayload, setPayload} from './utilities/localstorageUtilities';

const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');

async function setSocketIOClient(){
  const client = feathers();

  if(getPayload() == '')
  {
    const id = await (await fetch(`${location.origin}/user`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: getUsername(),
      }),
    })).json();
    setPayload(id);
  }

  const socket = io('', {
      query: {
        username: getUsername(),
        payload: getPayload()
      }
  });

  client.configure(socketio(socket));

  return client;
}

export default await setSocketIOClient();