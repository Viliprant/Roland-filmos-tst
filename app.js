const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

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
app.configure(socketio());


// Register an in-memory messages service
// app.use('/messages', new MessageService());

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/views/home.html`)
})
// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

// Start the server
app.listen(process.env.PORT || 3030).on('listening', () =>
  console.log(`Feathers server listening ${process.env.PORT || 3030}`)
);