const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

// init server
const app = express();
const server = http.Server(app);
const io = socketio(server);

// route
app.use('/', require('./router'));

// init websocket
// check for connection ON websocket
io.on('connection', socket => {
  // socket on join, emitted from client
  // client sends a 'join' param
  // data is what we are receiving
  // cb is what we can emit back once certain conditions are met
  socket.on('join', (data, cb) => {
    // addUser returns either an obj with a user, or an err
    // passing in the instance of the socket as the id
    // and spreading in the data object we receive
    const { user, error } = addUser({ id: socket.id, ...data });

    // if there is an error,
    // return the callback with the error
    // this will emit to the front end
    if (error) {
      return cb(error);
    }

    // if there isn't an error
    // call socket method join to join a user in a room
    socket.join(user.room);

    // system message directly to someone when they join a room
    // sending a payload with the user 'admin' and a message
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`
    });

    // sends message to everyone else, besides our user.
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined` });

    // add this so the callback in the front end gets called every time
    cb();
  });

  // expect an event from the front end
  // with a sendMessage param
  socket.on('sendMessage', (message, cb) => {
    // we need to get the user that sent the message
    // by passing in the socket.id (which is their uid)
    const user = getUser(socket.id);

    // target a room, by passing in our user's room
    // and emitting a message to that room
    io.to(user.room).emit('message', { user: user.name, text: message });

    // call cb so we can do something afterwards
    cb();
  });

  // socket message on disconnect
  socket.on('disconnect', () => {
    // once user disconnects, pass socket.id into removeUser helper
    // to remove user from array
    const user = removeUser(socket.id);

    // if that returns true
    if (user) {
      // emit message to room
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left`
      });
    }
  });
});

// port for server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
