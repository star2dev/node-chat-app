const path = require('path'),
http = require('http'),
express = require('express'),
socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express(),
server = http.createServer(app),
io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New connection');

  socket.emit('newMessage', {
    from: 'Server',
    text: 'Welcome new user',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Server',
    text: 'A new user has connected',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

// module.exports = {app};
