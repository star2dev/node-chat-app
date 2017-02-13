const path = require('path'),
http = require('http'),
express = require('express'),
socketIO = require('socket.io'),
{generateMessage} = require('./utils/message'),
{generateLocationMessage} = require('./utils/message'),
{isRealString} = require('./utils/validation'),
{Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express(),
server = http.createServer(app),
io = socketIO(server),
users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', `Welcome ${params.name} to the chat app!`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined "${params.room}"`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
