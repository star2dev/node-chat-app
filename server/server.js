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
    from: 'Bruce',
    text: 'Heytza',
    createdAt: new Date().toString()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

// module.exports = {app};
