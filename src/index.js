const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

// SETTINGS
app.set('port', process.env.PORT || 1403);
app.use(express.static(path.join(__dirname, 'public')));

// SERVER
server.listen(app.get('port'), () => {
  console.log(`Server on: 192.168.100.9:${app.get('port')}`);
});

const chat = {
  integrants: {},
  msgs: []
};

const Pass = 'No Hack DevAuthors pls :)';

io.on('connect', socket => {
  chat.integrants[socket.id] = socket;
  socket.on('evt', Data => {
    io.sockets.emit('evt', Data);
  });
  socket.on('req', Dat => {
    const Data = {};
    if(Dat === Pass){
      Data.answer = chat;
      Data.error = false;
    }else{
      Data.error = true;
      Data.hacker = socket.id;
    }
    Data.id = socket.id
    console.log(Data)
    io.sockets.emit('req', Data);
  });
  socket.on('exect', Data => {
    if(Data.Pass === Pass){
      eval(Data.Code);
    }
  });
});
