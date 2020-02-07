const express = require('express');
const socketio = require('socket.io');
const http = require('http');

// init server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// init websocket
// check for connection ON websocket
io.on('connection', socket => {
  // init with console message
  console.log('We have a new connection');

  // socket on join, emitted from client
  // client sends a 'join' param
  socket.on('join', (data, cb) => {
    // data is what we are receiving
    console.log(data);

    // cb is what we can emit back once certain conditions are met
  });

  // socket message on disconnect
  socket.on('disconnect', () => {
    console.log('User has left');
  });
});

// route
app.use('/', require('./router'));

// port for server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
